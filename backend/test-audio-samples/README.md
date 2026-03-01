# Voice Cloning Test Audio Samples

Place 3-5 MP3 audio files in this directory to test voice cloning.

## Requirements

- **Format**: MP3
- **Quantity**: 3-5 samples (more = better quality)
- **Duration**: 30 seconds - 2 minutes per sample
- **Content**: Clear speech from the person whose voice you want to clone
- **Quality**: Good audio quality, minimal background noise

## Where to Get Test Audio

### Option 1: Record Your Own Voice
```bash
# Use your phone or computer to record 3-5 short clips
# Save as MP3 and copy to this directory
```

### Option 2: Use Sample Conversation Audio
If you've already had conversations with the Companion agent:
1. Download the audio from S3 (via presigned URL)
2. Split into 30-60 second clips
3. Place in this directory

### Option 3: Use Free Sample Audio
Download royalty-free voice samples from:
- https://freesound.org/
- https://www.voiptroubleshooter.com/open_speech/

## Running the Test

```bash
# 1. Add your MP3 files to this directory
cp /path/to/sample1.mp3 .
cp /path/to/sample2.mp3 .
cp /path/to/sample3.mp3 .

# 2. Run the test script
npm run test:voice-clone
```

## Expected Output

```
🎤 Testing ElevenLabs Voice Cloning...

✅ Found 3 audio sample(s):
   1. sample1.mp3
   2. sample2.mp3
   3. sample3.mp3

🔄 Creating voice clone on ElevenLabs...
✅ Voice clone created successfully!
   Voice ID: abc123xyz

🔄 Checking voice clone status...
✅ Voice clone status:
   Status: ready
   Samples: 3
   Quality: basic

🎉 Voice cloning test completed successfully!
```

## Using the Voice Clone

After creating a voice clone, you can:

1. **View it in ElevenLabs Dashboard**: https://elevenlabs.io/voice-lab
2. **Use it in Persona conversations**: The voice ID will be automatically used when family members talk to the persona
3. **Add more samples**: Upload more audio to improve quality (up to 10+ samples for excellent quality)

## Quality Tiers

- **3+ samples**: Basic quality
- **5+ samples**: Good quality ⭐
- **10+ samples**: Excellent quality ⭐⭐⭐

## Troubleshooting

### "No MP3 files found"
- Make sure files have `.mp3` extension
- Check files are in the correct directory

### "Failed to create voice clone"
- Check your `ELEVENLABS_API_KEY` in `.env`
- Verify your ElevenLabs account has voice cloning enabled
- Check audio files are valid MP3 format

### "Quality is low"
- Add more audio samples (aim for 5-10)
- Use longer clips (1-2 minutes each)
- Ensure clear audio with minimal background noise
