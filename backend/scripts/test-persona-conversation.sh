#!/bin/bash

# Test Persona conversation with voice override
# This simulates how the mobile app will start a Persona conversation

echo "🎭 Testing Persona Agent Conversation..."
echo ""

# Get JWT token (replace with your actual token)
JWT_TOKEN="your-jwt-token-here"

# Start Persona conversation
echo "📞 Starting Persona conversation..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/conversations \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "persona",
    "elderlyUserId": "test-elderly-user-123"
  }')

echo "Response: $RESPONSE"
echo ""

# Extract conversation token
CONVERSATION_TOKEN=$(echo $RESPONSE | grep -o '"conversationToken":"[^"]*' | cut -d'"' -f4)

if [ -z "$CONVERSATION_TOKEN" ]; then
  echo "❌ Failed to get conversation token"
  exit 1
fi

echo "✅ Conversation started!"
echo "📱 Conversation Token: $CONVERSATION_TOKEN"
echo ""
echo "🎤 Next steps:"
echo "   1. Use this token in the ElevenLabs Flutter SDK"
echo "   2. The Persona agent will use the cloned voice automatically"
echo "   3. Talk to the persona and verify the voice sounds correct"
echo ""
echo "💡 The voice is overridden in the backend code at:"
echo "   src/conversations/conversations.service.ts:63"
