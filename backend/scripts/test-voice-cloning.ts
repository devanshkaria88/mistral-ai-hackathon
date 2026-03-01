/**
 * Test script to trigger voice cloning using audio from a conversation
 * 
 * Usage: npx ts-node scripts/test-voice-cloning.ts
 */

import 'dotenv/config';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Test data
const CONVERSATION_ID = 'conv_1301kjk7zaxsfvas92xz92cb0767';
const USER_ID = '014b8b98-688d-4df9-84d7-053aeaaa4087';

async function fetchConversationAudio(conversationId: string): Promise<Buffer> {
  console.log(`\n🎵 Fetching audio for conversation: ${conversationId}`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}/audio`,
    {
      method: 'GET',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch audio: ${response.status} - ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function createVoiceClone(audioBuffer: Buffer, name: string, description: string): Promise<string> {
  console.log(`\n🎤 Creating voice clone: "${name}"`);
  console.log(`   Audio size: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB`);
  
  // Use native FormData with Blob for fetch API
  const formData = new FormData();
  
  formData.append('name', name);
  formData.append('description', description);
  
  // Convert Buffer to Uint8Array for Blob compatibility
  const uint8Array = new Uint8Array(audioBuffer);
  const audioBlob = new Blob([uint8Array], { type: 'audio/mpeg' });
  formData.append('files', audioBlob, 'conversation_audio.mp3');

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

async function getVoiceDetails(voiceId: string): Promise<any> {
  console.log(`\n📋 Fetching voice details for: ${voiceId}`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/voices/${voiceId}`,
    {
      method: 'GET',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get voice: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function generateSpeech(voiceId: string, text: string): Promise<Buffer> {
  console.log(`\n🔊 Generating speech with cloned voice...`);
  console.log(`   Text: "${text.substring(0, 50)}..."`);
  
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
          similarity_boost: 0.75,
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
  console.log('🚀 Voice Cloning Test');
  console.log('=====================');
  console.log(`Conversation ID: ${CONVERSATION_ID}`);
  console.log(`User ID: ${USER_ID}`);

  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set in .env');
    process.exit(1);
  }

  try {
    // Step 1: Fetch conversation audio
    const audioBuffer = await fetchConversationAudio(CONVERSATION_ID);
    console.log(`✅ Audio fetched: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    // Step 2: Create voice clone
    const voiceName = `User_${USER_ID.substring(0, 8)}_Voice`;
    const voiceDescription = `Voice clone for user ${USER_ID} from conversation ${CONVERSATION_ID}`;
    
    const voiceId = await createVoiceClone(audioBuffer, voiceName, voiceDescription);
    console.log(`\n✅ Voice clone created!`);
    console.log(`   Voice ID: ${voiceId}`);

    // Step 3: Get voice details
    const voiceDetails = await getVoiceDetails(voiceId);
    console.log(`\n📋 Voice Details:`);
    console.log(`   Name: ${voiceDetails.name}`);
    console.log(`   Category: ${voiceDetails.category}`);
    console.log(`   Labels: ${JSON.stringify(voiceDetails.labels)}`);

    // Step 4: Test the cloned voice by generating speech
    const testText = "Hello! This is a test of the voice cloning feature. I'm speaking with the cloned voice from the conversation.";
    const speechBuffer = await generateSpeech(voiceId, testText);
    
    // Save the generated speech to a file
    const fs = require('fs');
    const outputPath = `./test-output/cloned-voice-${voiceId}.mp3`;
    fs.mkdirSync('./test-output', { recursive: true });
    fs.writeFileSync(outputPath, speechBuffer);
    
    console.log(`\n✅ Test speech generated!`);
    console.log(`   Output: ${outputPath}`);
    console.log(`   Size: ${(speechBuffer.length / 1024).toFixed(2)} KB`);

    console.log('\n=====================');
    console.log('🎉 Voice cloning test completed successfully!');
    console.log(`\nYou can now use voice ID: ${voiceId}`);
    console.log('Listen to the generated speech at:', outputPath);

  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
