import { Injectable, Logger } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

export interface TranscriptEntry {
  role: string;
  message: string;
  time_in_call_secs?: number;
}

export interface AudioSegment {
  startSecs: number;
  endSecs: number;
  durationSecs: number;
}

@Injectable()
export class AudioExtractionService {
  private readonly logger = new Logger(AudioExtractionService.name);

  /**
   * Detect audio format from buffer magic bytes
   */
  private detectAudioFormat(buffer: Buffer): string {
    // Check magic bytes for common audio formats
    if (buffer.length < 12) return 'unknown';
    
    // MP3: starts with ID3 or 0xFF 0xFB
    if (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) return 'mp3'; // ID3
    if (buffer[0] === 0xFF && (buffer[1] & 0xE0) === 0xE0) return 'mp3'; // MPEG sync
    
    // WebM/Matroska: starts with 0x1A 0x45 0xDF 0xA3
    if (buffer[0] === 0x1A && buffer[1] === 0x45 && buffer[2] === 0xDF && buffer[3] === 0xA3) return 'webm';
    
    // OGG: starts with OggS
    if (buffer[0] === 0x4F && buffer[1] === 0x67 && buffer[2] === 0x67 && buffer[3] === 0x53) return 'ogg';
    
    // WAV: starts with RIFF
    if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) return 'wav';
    
    // FLAC: starts with fLaC
    if (buffer[0] === 0x66 && buffer[1] === 0x4C && buffer[2] === 0x61 && buffer[3] === 0x43) return 'flac';
    
    return 'unknown';
  }

  /**
   * Convert audio to MP3 format using ffmpeg
   */
  private async convertToMp3(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .output(outputPath)
        .audioCodec('libmp3lame')
        .audioFrequency(44100)
        .audioBitrate('128k')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .run();
    });
  }

  /**
   * Extract user audio segments from full conversation audio based on transcript timing
   */
  async extractUserAudio(
    fullAudioBuffer: Buffer,
    transcript: TranscriptEntry[],
    totalDurationSecs: number,
  ): Promise<Buffer | null> {
    // Get user segments from transcript
    const userSegments = this.getUserSegments(transcript, totalDurationSecs);
    
    if (userSegments.length === 0) {
      this.logger.warn('No user segments found in transcript');
      return null;
    }

    const totalUserDuration = userSegments.reduce((sum, seg) => sum + seg.durationSecs, 0);
    this.logger.log(`Found ${userSegments.length} user segments, total duration: ${totalUserDuration.toFixed(1)}s`);

    try {
      // Create temp directory
      const tempDir = path.join(os.tmpdir(), `audio-extract-${uuidv4()}`);
      fs.mkdirSync(tempDir, { recursive: true });
      this.logger.log(`Created temp directory: ${tempDir}`);

      // Log buffer info for debugging
      this.logger.log(`Input buffer size: ${fullAudioBuffer.length} bytes`);
      const headerHex = fullAudioBuffer.slice(0, 16).toString('hex');
      this.logger.log(`Buffer header (hex): ${headerHex}`);

      // Detect audio format
      const detectedFormat = this.detectAudioFormat(fullAudioBuffer);
      this.logger.log(`Detected audio format: ${detectedFormat}`);

      // Save full audio to temp file - always use .mp3 since ElevenLabs sends MP3
      const inputPath = path.join(tempDir, 'full-audio.mp3');
      fs.writeFileSync(inputPath, fullAudioBuffer);
      
      // Verify file was written correctly
      const writtenStats = fs.statSync(inputPath);
      this.logger.log(`Written file size: ${writtenStats.size} bytes at ${inputPath}`);
      
      // Verify file content matches buffer
      const verifyBuffer = fs.readFileSync(inputPath);
      if (verifyBuffer.length !== fullAudioBuffer.length) {
        this.logger.error(`File size mismatch! Buffer: ${fullAudioBuffer.length}, File: ${verifyBuffer.length}`);
      }

      // Extract each user segment
      const segmentFiles: string[] = [];
      for (let i = 0; i < userSegments.length; i++) {
        const seg = userSegments[i];
        const segmentPath = path.join(tempDir, `segment-${i.toString().padStart(3, '0')}.mp3`);
        
        await this.extractSegment(inputPath, segmentPath, seg.startSecs, seg.durationSecs);
        segmentFiles.push(segmentPath);
        
        this.logger.debug(`Extracted segment ${i + 1}/${userSegments.length}: ${seg.startSecs.toFixed(1)}s - ${seg.endSecs.toFixed(1)}s`);
      }

      // Concatenate all segments
      const concatListPath = path.join(tempDir, 'concat-list.txt');
      const concatContent = segmentFiles.map(f => `file '${f}'`).join('\n');
      fs.writeFileSync(concatListPath, concatContent);

      const outputPath = path.join(tempDir, 'user-audio-combined.mp3');
      await this.concatenateSegments(concatListPath, outputPath);

      // Read the combined user audio
      const userAudioBuffer = fs.readFileSync(outputPath);
      
      this.logger.log(`User audio extracted: ${(userAudioBuffer.length / 1024).toFixed(1)} KB`);

      // Cleanup temp directory
      this.cleanupTempDir(tempDir);

      return userAudioBuffer;
    } catch (error) {
      this.logger.error(`Failed to extract user audio: ${error.message}`, error.stack);
      return null;
    }
  }

  /**
   * Parse transcript to get user speaking segments with timing
   */
  private getUserSegments(transcript: TranscriptEntry[], totalDurationSecs: number): AudioSegment[] {
    const segments: AudioSegment[] = [];

    this.logger.log(`Parsing transcript with ${transcript.length} entries, total duration: ${totalDurationSecs}s`);
    
    // Log first few transcript entries for debugging
    transcript.slice(0, 5).forEach((entry, i) => {
      this.logger.debug(`Transcript[${i}]: role=${entry.role}, time=${entry.time_in_call_secs}s, msg="${entry.message?.substring(0, 50)}..."`);
    });

    for (let i = 0; i < transcript.length; i++) {
      const current = transcript[i];
      if (current.role !== 'user') continue;

      const startSecs = current.time_in_call_secs || 0;
      
      // End time is when the next message starts, or total duration if last message
      const endSecs = i < transcript.length - 1 && transcript[i + 1].time_in_call_secs !== undefined
        ? transcript[i + 1].time_in_call_secs!
        : totalDurationSecs;

      const durationSecs = endSecs - startSecs;

      this.logger.debug(`User segment candidate: ${startSecs}s - ${endSecs}s (${durationSecs}s)`);

      // Only include segments with meaningful duration (> 0.5s)
      if (durationSecs > 0.5) {
        segments.push({
          startSecs,
          endSecs,
          durationSecs,
        });
        this.logger.log(`Added user segment: ${startSecs.toFixed(1)}s - ${endSecs.toFixed(1)}s (${durationSecs.toFixed(1)}s)`);
      }
    }

    return segments;
  }

  /**
   * Extract a single segment from audio file using ffmpeg
   */
  private extractSegment(inputPath: string, outputPath: string, startSecs: number, durationSecs: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.debug(`Extracting segment: start=${startSecs}s, duration=${durationSecs}s`);
      ffmpeg(inputPath)
        .setStartTime(startSecs)
        .setDuration(durationSecs)
        .output(outputPath)
        .audioCodec('libmp3lame')
        .on('start', (cmd) => this.logger.debug(`FFmpeg command: ${cmd}`))
        .on('stderr', (line) => this.logger.debug(`FFmpeg: ${line}`))
        .on('end', () => {
          // Verify output file exists and has content
          if (fs.existsSync(outputPath)) {
            const stats = fs.statSync(outputPath);
            this.logger.debug(`Segment output: ${stats.size} bytes`);
          }
          resolve();
        })
        .on('error', (err) => {
          this.logger.error(`FFmpeg error: ${err.message}`);
          reject(err);
        })
        .run();
    });
  }

  /**
   * Concatenate multiple audio segments into one file
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
   * Clean up temporary directory
   */
  private cleanupTempDir(tempDir: string): void {
    try {
      const files = fs.readdirSync(tempDir);
      for (const file of files) {
        fs.unlinkSync(path.join(tempDir, file));
      }
      fs.rmdirSync(tempDir);
    } catch (e) {
      // Ignore cleanup errors
      this.logger.debug(`Cleanup warning: ${e.message}`);
    }
  }
}
