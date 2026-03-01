/**
 * Extract user audio segments from a conversation and save to project root
 * 
 * Usage: npx ts-node scripts/extract-user-audio.ts
 */

import 'dotenv/config';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const CONVERSATION_ID = 'conv_1301kjk7zaxsfvas92xz92cb0767';

interface TranscriptEntry {
  role: 'user' | 'agent';
  message: string;
  time_in_call_secs: number;
}

interface AudioSegment {
  startSecs: number;
  endSecs: number;
  duration: number;
  message: string;
}

async function fetchConversation(conversationId: string) {
  console.log(`📞 Fetching conversation: ${conversationId}`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
    {
      headers: { 'xi-api-key': ELEVENLABS_API_KEY! },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch conversation: ${response.status}`);
  }

  return response.json();
}

async function fetchConversationAudio(conversationId: string): Promise<Buffer> {
  console.log(`🎵 Fetching audio...`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}/audio`,
    {
      headers: { 'xi-api-key': ELEVENLABS_API_KEY! },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch audio: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function getUserSegments(transcript: TranscriptEntry[], totalDuration: number): AudioSegment[] {
  const segments: AudioSegment[] = [];

  for (let i = 0; i < transcript.length; i++) {
    const current = transcript[i];
    if (current.role !== 'user') continue;

    const startSecs = current.time_in_call_secs || 0;
    const endSecs = i < transcript.length - 1
      ? transcript[i + 1].time_in_call_secs
      : totalDuration;

    const duration = endSecs - startSecs;

    // Only include segments with meaningful duration (> 0.5s)
    if (duration > 0.5) {
      segments.push({
        startSecs,
        endSecs,
        duration,
        message: current.message.substring(0, 50) + '...',
      });
    }
  }

  return segments;
}

function extractSegment(inputPath: string, outputPath: string, startSecs: number, duration: number): Promise<void> {
  return new Promise((resolve, reject) => {
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

function concatenateSegments(concatListPath: string, outputPath: string): Promise<void> {
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

async function main() {
  console.log('🎤 User Audio Extraction Tool');
  console.log('==============================\n');

  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    process.exit(1);
  }

  try {
    // Step 1: Fetch conversation
    const conversation = await fetchConversation(CONVERSATION_ID);
    const totalDuration = conversation.metadata?.call_duration_secs || 343;
    console.log(`✅ Conversation fetched (${totalDuration}s total)\n`);

    // Step 2: Get user segments
    const userSegments = getUserSegments(conversation.transcript, totalDuration);
    console.log(`📊 Found ${userSegments.length} user segments:\n`);
    
    let totalUserDuration = 0;
    userSegments.forEach((seg, i) => {
      console.log(`   [${i + 1}] ${seg.startSecs}s - ${seg.endSecs}s (${seg.duration.toFixed(1)}s): "${seg.message}"`);
      totalUserDuration += seg.duration;
    });
    console.log(`\n   Total user audio: ${totalUserDuration.toFixed(1)}s\n`);

    // Step 3: Fetch full audio
    const audioBuffer = await fetchConversationAudio(CONVERSATION_ID);
    console.log(`✅ Audio fetched: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB\n`);

    // Step 4: Create temp directory and save input audio
    const tempDir = path.join(os.tmpdir(), `audio-extract-${uuidv4()}`);
    fs.mkdirSync(tempDir, { recursive: true });
    
    const inputPath = path.join(tempDir, 'full-audio.mp3');
    fs.writeFileSync(inputPath, audioBuffer);
    console.log(`📁 Temp dir: ${tempDir}`);

    // Step 5: Extract each user segment
    console.log(`\n🔧 Extracting user segments...`);
    const segmentFiles: string[] = [];

    for (let i = 0; i < userSegments.length; i++) {
      const seg = userSegments[i];
      const segmentPath = path.join(tempDir, `segment-${i.toString().padStart(2, '0')}.mp3`);
      segmentFiles.push(segmentPath);
      
      await extractSegment(inputPath, segmentPath, seg.startSecs, seg.duration);
      console.log(`   ✅ Segment ${i + 1}/${userSegments.length}: ${seg.startSecs}s - ${seg.endSecs}s`);
    }

    // Step 6: Create concat list and merge
    console.log(`\n🔗 Concatenating segments...`);
    const concatListPath = path.join(tempDir, 'concat-list.txt');
    const concatContent = segmentFiles.map(f => `file '${f}'`).join('\n');
    fs.writeFileSync(concatListPath, concatContent);

    const outputPath = path.join(tempDir, 'user-audio-combined.mp3');
    await concatenateSegments(concatListPath, outputPath);

    // Step 7: Copy to project root
    const projectRoot = path.resolve(__dirname, '..');
    const finalOutputPath = path.join(projectRoot, 'extracted-user-audio.mp3');
    const userAudioBuffer = fs.readFileSync(outputPath);
    fs.writeFileSync(finalOutputPath, userAudioBuffer);

    // Also save full audio for comparison
    const fullAudioPath = path.join(projectRoot, 'full-conversation-audio.mp3');
    fs.writeFileSync(fullAudioPath, audioBuffer);

    console.log(`\n==============================`);
    console.log(`✅ Audio extraction complete!\n`);
    console.log(`📁 Files saved to project root:`);
    console.log(`   - full-conversation-audio.mp3 (${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`   - extracted-user-audio.mp3 (${(userAudioBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`\n🎧 Listen to extracted-user-audio.mp3 to hear only the user's voice!`);

    // Cleanup temp dir
    try {
      const files = fs.readdirSync(tempDir);
      for (const file of files) {
        fs.unlinkSync(path.join(tempDir, file));
      }
      fs.rmdirSync(tempDir);
    } catch (e) {
      // Ignore cleanup errors
    }

  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
