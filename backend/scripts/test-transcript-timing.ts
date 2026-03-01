/**
 * Test script to calculate user speaking duration from transcript timing
 */

import 'dotenv/config';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const CONVERSATION_ID = 'conv_1301kjk7zaxsfvas92xz92cb0767';

interface TranscriptEntry {
  role: 'user' | 'agent';
  message: string;
  time_in_call_secs: number;
}

function calculateUserSpeakingDuration(transcript: TranscriptEntry[], totalCallDuration: number): {
  userDurationSecs: number;
  agentDurationSecs: number;
  userMessageCount: number;
  agentMessageCount: number;
} {
  let userDurationSecs = 0;
  let agentDurationSecs = 0;
  let userMessageCount = 0;
  let agentMessageCount = 0;

  for (let i = 0; i < transcript.length; i++) {
    const current = transcript[i];
    const nextStartTime = i < transcript.length - 1 
      ? transcript[i + 1].time_in_call_secs 
      : totalCallDuration;
    
    const duration = nextStartTime - current.time_in_call_secs;

    if (current.role === 'user') {
      userDurationSecs += duration;
      userMessageCount++;
    } else {
      agentDurationSecs += duration;
      agentMessageCount++;
    }
  }

  return {
    userDurationSecs,
    agentDurationSecs,
    userMessageCount,
    agentMessageCount,
  };
}

async function main() {
  console.log('📊 Calculating User Speaking Duration from Transcript Timing\n');

  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${CONVERSATION_ID}`,
    {
      headers: { 'xi-api-key': ELEVENLABS_API_KEY! },
    }
  );
  const conversation = await response.json();

  const totalCallDuration = conversation.metadata?.call_duration_secs || 0;
  console.log(`Total call duration: ${totalCallDuration}s`);
  console.log(`Transcript entries: ${conversation.transcript?.length || 0}\n`);

  // Show transcript with timing
  console.log('=== Transcript with Timing ===');
  conversation.transcript.forEach((entry: TranscriptEntry, i: number) => {
    const nextTime = i < conversation.transcript.length - 1 
      ? conversation.transcript[i + 1].time_in_call_secs 
      : totalCallDuration;
    const duration = nextTime - entry.time_in_call_secs;
    const icon = entry.role === 'user' ? '👤' : '🤖';
    console.log(`${icon} [${entry.time_in_call_secs}s - ${nextTime}s] (${duration.toFixed(1)}s) ${entry.role}: "${entry.message.substring(0, 60)}..."`);
  });

  // Calculate durations
  const stats = calculateUserSpeakingDuration(conversation.transcript, totalCallDuration);

  console.log('\n=== Duration Statistics ===');
  console.log(`👤 User speaking time: ${stats.userDurationSecs.toFixed(1)}s (${stats.userMessageCount} messages)`);
  console.log(`🤖 Agent speaking time: ${stats.agentDurationSecs.toFixed(1)}s (${stats.agentMessageCount} messages)`);
  console.log(`📊 User percentage: ${((stats.userDurationSecs / totalCallDuration) * 100).toFixed(1)}%`);
  
  console.log('\n=== Voice Cloning Threshold ===');
  const threshold = 120;
  if (stats.userDurationSecs >= threshold) {
    console.log(`✅ User has ${stats.userDurationSecs.toFixed(1)}s of audio - THRESHOLD REACHED (${threshold}s)`);
  } else {
    console.log(`⏳ User has ${stats.userDurationSecs.toFixed(1)}s of audio - need ${(threshold - stats.userDurationSecs).toFixed(1)}s more`);
  }
}

main().catch(console.error);
