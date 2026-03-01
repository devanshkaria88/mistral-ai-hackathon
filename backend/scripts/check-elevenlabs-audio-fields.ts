/**
 * Check what audio fields ElevenLabs provides for user vs agent separation
 */

import 'dotenv/config';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const CONVERSATION_ID = 'conv_1301kjk7zaxsfvas92xz92cb0767';

async function checkConversationFields() {
  console.log('📋 Checking ElevenLabs conversation API response...\n');

  // Get conversation details
  const convResponse = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${CONVERSATION_ID}`,
    {
      headers: { 'xi-api-key': ELEVENLABS_API_KEY! },
    }
  );
  const conversation = await convResponse.json();

  console.log('=== Conversation Response ===');
  console.log('Keys:', Object.keys(conversation));
  console.log('\nAudio-related fields:');
  console.log('  has_audio:', conversation.has_audio);
  console.log('  has_user_audio:', conversation.has_user_audio);
  console.log('  has_response_audio:', conversation.has_response_audio);
  
  // Check transcript structure for timing info
  console.log('\n=== Transcript Structure ===');
  if (conversation.transcript && conversation.transcript.length > 0) {
    console.log('First transcript entry keys:', Object.keys(conversation.transcript[0]));
    console.log('\nSample entries:');
    conversation.transcript.slice(0, 5).forEach((entry: any, i: number) => {
      console.log(`  [${i}] role: ${entry.role}, time_in_call_secs: ${entry.time_in_call_secs}, message: "${entry.message?.substring(0, 50)}..."`);
    });
  }

  // Check if there's a separate user audio endpoint
  console.log('\n=== Checking Audio Endpoints ===');
  
  // Try main audio endpoint
  const audioResponse = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${CONVERSATION_ID}/audio`,
    {
      headers: { 'xi-api-key': ELEVENLABS_API_KEY! },
    }
  );
  console.log('Main audio endpoint status:', audioResponse.status);
  if (audioResponse.ok) {
    const audioBuffer = await audioResponse.arrayBuffer();
    console.log('  Audio size:', (audioBuffer.byteLength / 1024 / 1024).toFixed(2), 'MB');
  }

  // Check response headers for any hints
  console.log('  Response headers:', Object.fromEntries(audioResponse.headers.entries()));

  // Check analysis field for any audio insights
  console.log('\n=== Analysis Field ===');
  if (conversation.analysis) {
    console.log('Analysis keys:', Object.keys(conversation.analysis));
    console.log('Analysis:', JSON.stringify(conversation.analysis, null, 2));
  } else {
    console.log('No analysis field');
  }

  // Check metadata
  console.log('\n=== Metadata ===');
  if (conversation.metadata) {
    console.log('Metadata:', JSON.stringify(conversation.metadata, null, 2));
  } else {
    console.log('No metadata');
  }
}

checkConversationFields().catch(console.error);
