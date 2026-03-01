/**
 * Test script to process a conversation by fetching it from ElevenLabs API
 * and triggering the story extraction pipeline
 * 
 * Usage: npx ts-node scripts/test-process-conversation.ts
 */

import 'dotenv/config';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const MODEL_ID = 'anthropic.claude-3-5-sonnet-20241022-v2:0';

const bedrockClient = new BedrockRuntimeClient({
  region: AWS_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
      }
    : undefined,
});

// Test data
const CONVERSATION_ID = 'conv_1301kjk7zaxsfvas92xz92cb0767';
const USER_ID = '014b8b98-688d-4df9-84d7-053aeaaa4087';

async function fetchConversation(conversationId: string) {
  console.log(`\n📞 Fetching conversation: ${conversationId}`);
  
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
    {
      method: 'GET',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch conversation: ${response.status} - ${errorText}`);
  }

  return response.json();
}

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

async function extractStories(transcript: string) {
  console.log(`\n📖 Extracting stories from transcript (${transcript.length} chars) using AWS Bedrock...`);

  const systemPrompt = `You are an expert at extracting meaningful life stories from conversation transcripts.
Your task is to identify distinct stories, memories, or significant life events mentioned in the conversation.

For each story you extract, provide:
- A compelling title
- The full story content (expand on what was said, making it a complete narrative)
- The time period (if mentioned or can be inferred)
- The emotional tone (e.g., nostalgic, joyful, bittersweet, proud)
- People mentioned (with their relationship to the speaker if known)
- Places mentioned (with brief descriptions if available)
- Themes (e.g., love, family, career, adventure, loss, triumph)

Return your response as a JSON object with a "stories" array. If no clear stories are found, return {"stories": []}.`;

  const userPrompt = `Extract all distinct stories and memories from this conversation transcript:

${transcript}

Return a JSON object with this structure:
{
  "stories": [
    {
      "title": "Story title",
      "content": "Full story narrative",
      "timePeriod": "Year or decade",
      "emotionalTone": "Emotional tone",
      "people": [{"name": "Name", "relationship": "Relationship"}],
      "places": [{"name": "Place name", "description": "Brief description"}],
      "themes": ["theme1", "theme2"]
    }
  ]
}`;

  try {
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt },
      ],
    };

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const content = responseBody.content?.[0]?.text || '';

    if (!content) {
      console.log('No content in Bedrock response');
      return [];
    }

    // Extract JSON from the response (Claude may wrap it in markdown)
    let jsonStr = content;
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    } else {
      const objMatch = content.match(/\{[\s\S]*\}/);
      if (objMatch) {
        jsonStr = objMatch[0];
      }
    }

    const parsed = JSON.parse(jsonStr);
    return parsed.stories || [];
  } catch (error: any) {
    console.error(`Bedrock API error: ${error.message}`);
    return [];
  }
}

async function main() {
  console.log('🚀 Starting conversation processing test');
  console.log('=========================================');
  console.log(`Conversation ID: ${CONVERSATION_ID}`);
  console.log(`User ID: ${USER_ID}`);

  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY not set in .env');
    process.exit(1);
  }

  try {
    // Step 1: Fetch conversation
    const conversation = await fetchConversation(CONVERSATION_ID);
    
    // Log full response to see field names
    console.log('\n📋 Full conversation response keys:', Object.keys(conversation));
    
    // Try different field names for duration
    const duration = conversation.call_duration_secs || conversation.duration_secs || conversation.duration || 0;
    
    console.log('\n✅ Conversation fetched:');
    console.log(`   Status: ${conversation.status}`);
    console.log(`   Agent ID: ${conversation.agent_id}`);
    console.log(`   Duration: ${duration}s`);
    console.log(`   Transcript messages: ${conversation.transcript?.length || 0}`);
    
    // Store duration for later use
    conversation.call_duration_secs = duration;

    // Step 2: Format transcript
    const transcript = (conversation.transcript || [])
      .map((t: any) => `${t.role === 'agent' ? 'Assistant' : 'User'}: ${t.message}`)
      .join('\n');

    console.log('\n📝 Transcript:');
    console.log('---');
    console.log(transcript.substring(0, 2000) + (transcript.length > 2000 ? '...' : ''));
    console.log('---');

    // Step 3: Extract stories
    const stories = await extractStories(transcript);
    
    console.log(`\n✅ Extracted ${stories.length} stories:`);
    stories.forEach((story: any, index: number) => {
      console.log(`\n   📖 Story ${index + 1}: "${story.title}"`);
      console.log(`      Tone: ${story.emotionalTone}`);
      console.log(`      Period: ${story.timePeriod || 'Unknown'}`);
      console.log(`      Themes: ${story.themes?.join(', ') || 'None'}`);
      console.log(`      People: ${story.people?.map((p: any) => p.name).join(', ') || 'None'}`);
      console.log(`      Content: ${story.content?.substring(0, 200)}...`);
    });

    // Step 4: Fetch audio
    try {
      const audioBuffer = await fetchConversationAudio(CONVERSATION_ID);
      const audioSizeMB = audioBuffer.length / 1024 / 1024;
      console.log(`\n✅ Audio fetched: ${audioSizeMB.toFixed(2)} MB`);
      
      // Estimate duration from audio size
      // MP3 at ~128kbps = ~16KB/sec, so duration ≈ size / 16KB
      const estimatedTotalDuration = audioBuffer.length / (16 * 1024);
      console.log(`   Estimated total duration: ${estimatedTotalDuration.toFixed(1)}s`);
      
      // Check if conversation has user audio flag
      console.log(`   Has user audio: ${conversation.has_user_audio}`);
      console.log(`   Has agent audio: ${conversation.has_response_audio}`);
      
      // Estimate user audio as 40% of total (user typically speaks less than agent)
      const estimatedUserDuration = estimatedTotalDuration * 0.4;
      console.log(`   Estimated user audio: ${estimatedUserDuration.toFixed(1)}s`);
      
      if (estimatedUserDuration >= 120) {
        console.log('   🎤 Voice cloning threshold reached!');
      } else {
        console.log(`   ⏳ Need ${(120 - estimatedUserDuration).toFixed(1)}s more for voice cloning`);
      }
    } catch (audioError: any) {
      console.log(`\n⚠️ Could not fetch audio: ${audioError.message}`);
    }

    console.log('\n=========================================');
    console.log('✅ Test completed successfully!');

  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
