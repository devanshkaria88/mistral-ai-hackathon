/**
 * Create voice clone using ONLY the extracted user audio (not full conversation)
 * 
 * Usage: npx ts-node scripts/clone-voice-from-extracted-audio.ts
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const USER_ID = '014b8b98-688d-4df9-84d7-053aeaaa4087';

async function createVoiceClone(audioBuffer: Buffer, name: string, description: string): Promise<string> {
  console.log(`\n🎤 Creating voice clone: "${name}"`);
  console.log(`   Audio size: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB`);
  
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  
  const uint8Array = new Uint8Array(audioBuffer);
  const audioBlob = new Blob([uint8Array], { type: 'audio/mpeg' });
  formData.append('files', audioBlob, 'user_audio_only.mp3');

  console.log('   Sending to ElevenLabs API...');
  
  const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY!,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create voice clone: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.voice_id;
}

async function generateSpeech(voiceId: string, text: string): Promise<Buffer> {
  console.log(`\n🔊 Generating speech with cloned voice...`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to generate speech: ${response.status} - ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  console.log('🎤 Voice Cloning from EXTRACTED USER AUDIO');
  console.log('==========================================\n');

  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set');
    process.exit(1);
  }

  // Read the extracted user audio (NOT the full conversation)
  const projectRoot = path.resolve(__dirname, '..');
  const extractedAudioPath = path.join(projectRoot, 'extracted-user-audio.mp3');
  
  if (!fs.existsSync(extractedAudioPath)) {
    console.error('❌ extracted-user-audio.mp3 not found! Run extract-user-audio.ts first.');
    process.exit(1);
  }

  const userAudioBuffer = fs.readFileSync(extractedAudioPath);
  console.log(`📁 Using extracted user audio: ${extractedAudioPath}`);
  console.log(`   Size: ${(userAudioBuffer.length / 1024 / 1024).toFixed(2)} MB (user voice ONLY)`);

  try {
    // Create voice clone from USER-ONLY audio
    const voiceName = `User_${USER_ID.substring(0, 8)}_UserOnly`;
    const voiceDescription = `Voice clone from EXTRACTED USER AUDIO ONLY (no agent voice)`;
    
    const voiceId = await createVoiceClone(userAudioBuffer, voiceName, voiceDescription);
    console.log(`\n✅ Voice clone created!`);
    console.log(`   Voice ID: ${voiceId}`);

    // Generate test speech
    const testText = "Hello! This is a test of the voice cloning feature using only my extracted audio segments. This should sound much more like me now!";
    const speechBuffer = await generateSpeech(voiceId, testText);
    
    // Save the generated speech
    const outputPath = path.join(projectRoot, 'cloned-voice-user-only.mp3');
    fs.writeFileSync(outputPath, speechBuffer);
    
    console.log(`\n✅ Test speech generated!`);
    console.log(`   Output: ${outputPath}`);
    console.log(`   Size: ${(speechBuffer.length / 1024).toFixed(2)} KB`);

    console.log('\n==========================================');
    console.log('🎉 Voice cloning complete!');
    console.log(`\nVoice ID: ${voiceId}`);
    console.log('\n📁 Files in project root:');
    console.log('   - extracted-user-audio.mp3 (source - user voice only)');
    console.log('   - cloned-voice-user-only.mp3 (generated speech with cloned voice)');
    console.log('\n🎧 Compare cloned-voice-user-only.mp3 with the previous clone!');

  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
