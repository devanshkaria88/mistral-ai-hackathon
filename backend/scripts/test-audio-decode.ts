/**
 * Test script to verify base64 audio decoding works correctly
 * Run with: npx ts-node scripts/test-audio-decode.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Sample base64 MP3 header (ID3 tag) - this is what a valid MP3 should start with
const VALID_MP3_ID3_HEADER = '494433'; // "ID3" in hex
const VALID_MP3_SYNC_HEADER = 'fffb'; // MP3 sync word

async function testAudioDecode() {
  // Check if there's a test file with base64 audio
  const testFile = path.join(__dirname, 'test-audio-base64.txt');
  
  if (!fs.existsSync(testFile)) {
    console.log('No test file found. Creating a sample...');
    console.log('To test, save a base64-encoded MP3 to: scripts/test-audio-base64.txt');
    return;
  }

  const base64Content = fs.readFileSync(testFile, 'utf-8').trim();
  console.log(`Base64 content length: ${base64Content.length} chars`);

  // Decode base64
  const buffer = Buffer.from(base64Content, 'base64');
  console.log(`Decoded buffer size: ${buffer.length} bytes`);

  // Check header
  const headerHex = buffer.slice(0, 16).toString('hex');
  console.log(`Header (hex): ${headerHex}`);

  // Check if it's a valid MP3
  if (headerHex.startsWith(VALID_MP3_ID3_HEADER)) {
    console.log('✅ Valid MP3 with ID3 tag detected');
  } else if (headerHex.startsWith(VALID_MP3_SYNC_HEADER)) {
    console.log('✅ Valid MP3 sync frame detected');
  } else {
    console.log('⚠️ Unknown format - first bytes:', headerHex.slice(0, 8));
  }

  // Write to file for manual testing
  const outputPath = path.join(__dirname, 'test-decoded-audio.mp3');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Written decoded audio to: ${outputPath}`);
  console.log('Try playing this file to verify it works!');
}

testAudioDecode().catch(console.error);
