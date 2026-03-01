import { Injectable, Logger } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

export interface AudioSegment {
  startSecs: number;
  endSecs: number;
  role: 'user' | 'agent';
}

@Injectable()
export class AudioProcessorService {
  private readonly logger = new Logger(AudioProcessorService.name);

  /**
   * Extract user audio segments from transcript timing and stitch them together
   */
  async extractUserAudio(
    fullAudioBuffer: Buffer,
    transcript: Array<{ role: string; time_in_call_secs?: number }>,
    totalCallDuration: number,
  ): Promise<Buffer> {
    this.logger.log('Extracting user audio segments from conversation...');

    // Calculate user segments from transcript
    const userSegments = this.getUserSegments(transcript, totalCallDuration);
    this.logger.log(`Found ${userSegments.length} user segments totaling ${userSegments.reduce((sum, s) => sum + (s.endSecs - s.startSecs), 0).toFixed(1)}s`);

    if (userSegments.length === 0) {
      throw new Error('No user audio segments found in transcript');
    }

    // Create temp directory for processing
    const tempDir = path.join(os.tmpdir(), `audio-process-${uuidv4()}`);
    fs.mkdirSync(tempDir, { recursive: true });

    const inputPath = path.join(tempDir, 'input.mp3');
    const outputPath = path.join(tempDir, 'user-audio.mp3');

    try {
      // Write input audio to temp file
      fs.writeFileSync(inputPath, fullAudioBuffer);

      // Extract and concatenate user segments
      await this.extractAndConcatenateSegments(inputPath, outputPath, userSegments);

      // Read the output file
      const userAudioBuffer = fs.readFileSync(outputPath);
      this.logger.log(`User audio extracted: ${(userAudioBuffer.length / 1024 / 1024).toFixed(2)} MB`);

      return userAudioBuffer;
    } finally {
      // Cleanup temp files
      this.cleanupTempDir(tempDir);
    }
  }

  /**
   * Get user speaking segments from transcript
   */
  private getUserSegments(
    transcript: Array<{ role: string; time_in_call_secs?: number }>,
    totalCallDuration: number,
  ): AudioSegment[] {
    const segments: AudioSegment[] = [];

    for (let i = 0; i < transcript.length; i++) {
      const current = transcript[i];
      if (current.role !== 'user') continue;

      const startSecs = current.time_in_call_secs || 0;
      const endSecs = i < transcript.length - 1
        ? (transcript[i + 1].time_in_call_secs || 0)
        : totalCallDuration;

      // Only include segments with meaningful duration (> 0.5s)
      if (endSecs - startSecs > 0.5) {
        segments.push({
          startSecs,
          endSecs,
          role: 'user',
        });
      }
    }

    return segments;
  }

  /**
   * Extract segments and concatenate them using FFmpeg
   */
  private async extractAndConcatenateSegments(
    inputPath: string,
    outputPath: string,
    segments: AudioSegment[],
  ): Promise<void> {
    const tempDir = path.dirname(outputPath);
    const segmentFiles: string[] = [];

    // Extract each segment
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const segmentPath = path.join(tempDir, `segment-${i}.mp3`);
      segmentFiles.push(segmentPath);

      await this.extractSegment(inputPath, segmentPath, segment.startSecs, segment.endSecs);
    }

    // Create concat file list
    const concatListPath = path.join(tempDir, 'concat-list.txt');
    const concatContent = segmentFiles.map(f => `file '${f}'`).join('\n');
    fs.writeFileSync(concatListPath, concatContent);

    // Concatenate all segments
    await this.concatenateSegments(concatListPath, outputPath);
  }

  /**
   * Extract a single segment from audio file
   */
  private extractSegment(
    inputPath: string,
    outputPath: string,
    startSecs: number,
    endSecs: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const duration = endSecs - startSecs;

      ffmpeg(inputPath)
        .setStartTime(startSecs)
        .setDuration(duration)
        .output(outputPath)
        .audioCodec('libmp3lame')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });
  }

  /**
   * Concatenate multiple audio segments
   */
  private concatenateSegments(concatListPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(concatListPath)
        .inputOptions(['-f', 'concat', '-safe', '0'])
        .output(outputPath)
        .audioCodec('libmp3lame')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });
  }

  /**
   * Cleanup temporary directory
   */
  private cleanupTempDir(tempDir: string): void {
    try {
      const files = fs.readdirSync(tempDir);
      for (const file of files) {
        fs.unlinkSync(path.join(tempDir, file));
      }
      fs.rmdirSync(tempDir);
    } catch (error) {
      this.logger.warn(`Failed to cleanup temp dir: ${error.message}`);
    }
  }
}
