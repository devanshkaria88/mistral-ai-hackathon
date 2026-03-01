import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ElevenLabsService } from '../src/integrations/elevenlabs/elevenlabs.service';
import { S3Service } from '../src/integrations/s3/s3.service';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test script for voice cloning
 * 
 * Usage:
 * 1. Place 3-5 audio samples (MP3 files) in backend/test-audio-samples/
 * 2. Run: npm run test:voice-clone
 * 
 * The script will:
 * - Upload audio samples to ElevenLabs
 * - Create a voice clone
 * - Check the clone status
 * - Print the voice ID for use in Persona conversations
 */
async function testVoiceClone() {
  console.log('🎤 Testing ElevenLabs Voice Cloning...\n');

  const app = await NestFactory.createApplicationContext(AppModule);
  const elevenLabsService = app.get(ElevenLabsService);

  // Path to test audio samples
  const samplesDir = path.join(__dirname, '../../test-audio-samples');
  
  if (!fs.existsSync(samplesDir)) {
    console.error(`❌ Directory not found: ${samplesDir}`);
    console.log('\n📁 Please create the directory and add 3-5 MP3 audio samples:');
    console.log(`   mkdir -p ${samplesDir}`);
    console.log('   # Add your MP3 files to this directory\n');
    await app.close();
    return;
  }

  // Read audio samples
  const files = fs.readdirSync(samplesDir).filter(f => f.endsWith('.mp3'));
  
  if (files.length === 0) {
    console.error('❌ No MP3 files found in test-audio-samples/');
    console.log('\n📁 Please add 3-5 MP3 audio samples to:');
    console.log(`   ${samplesDir}\n`);
    await app.close();
    return;
  }

  console.log(`✅ Found ${files.length} audio sample(s):`);
  files.forEach((f, i) => console.log(`   ${i + 1}. ${f}`));
  console.log();

  // Load audio buffers
  const audioSamples: Buffer[] = files.map(file => {
    const filePath = path.join(samplesDir, file);
    return fs.readFileSync(filePath);
  });

  try {
    // Create voice clone
    console.log('🔄 Creating voice clone on ElevenLabs...');
    const voiceId = await elevenLabsService.createInstantVoiceClone(
      audioSamples,
      'Test Voice Clone',
      'Test voice clone created via Resurrect AI backend'
    );

    console.log(`✅ Voice clone created successfully!`);
    console.log(`   Voice ID: ${voiceId}\n`);

    // Check status
    console.log('🔄 Checking voice clone status...');
    const status = await elevenLabsService.getVoiceCloneStatus(voiceId);

    console.log(`✅ Voice clone status:`);
    console.log(`   Status: ${status.status}`);
    console.log(`   Samples: ${status.samplesCount}`);
    console.log(`   Quality: ${status.qualityTier}\n`);

    console.log('🎉 Voice cloning test completed successfully!');
    console.log('\n📝 Next steps:');
    console.log(`   1. Save this voice ID to your .env file:`);
    console.log(`      ELEVENLABS_TEST_VOICE_ID=${voiceId}`);
    console.log(`   2. Use this voice ID in Persona conversations`);
    console.log(`   3. View the voice in ElevenLabs dashboard: https://elevenlabs.io/voice-lab\n`);

  } catch (error) {
    console.error('❌ Error during voice cloning:', error.message);
    if (error.response) {
      console.error('   Response:', await error.response.text());
    }
  }

  await app.close();
}

testVoiceClone().catch(console.error);
