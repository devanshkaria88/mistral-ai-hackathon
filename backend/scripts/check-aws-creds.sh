#!/bin/bash

# Check AWS Credentials Status
# Tests if your current AWS credentials are valid

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

echo "🔍 Checking AWS Credentials Status"
echo "===================================="
echo ""

# Source the .env file
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | grep 'AWS_' | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

# Check if credentials are set
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "❌ AWS credentials not configured in .env"
    exit 1
fi

echo "📋 Current credentials:"
echo "   Access Key: ${AWS_ACCESS_KEY_ID:0:20}..."
echo "   Region: ${AWS_REGION:-us-west-2}"
echo "   Session Token: ${AWS_SESSION_TOKEN:+Set (${#AWS_SESSION_TOKEN} chars)}"
echo ""

# Try to call AWS STS to verify credentials
echo "🔐 Testing credentials with AWS STS..."
echo ""

if command -v aws &> /dev/null; then
    if aws sts get-caller-identity --region ${AWS_REGION:-us-west-2} 2>/dev/null; then
        echo ""
        echo "✅ Credentials are VALID!"
        
        # Try to get session expiration if using temporary credentials
        if [ -n "$AWS_SESSION_TOKEN" ]; then
            echo ""
            echo "⏰ Note: These are temporary credentials and will expire."
            echo "   Run ./scripts/refresh-aws-creds-interactive.sh when they expire."
        fi
    else
        echo ""
        echo "❌ Credentials are INVALID or EXPIRED!"
        echo ""
        echo "To refresh your credentials:"
        echo "  1. Go to your AWS Workshop Studio"
        echo "  2. Get new credentials"
        echo "  3. Run: ./scripts/refresh-aws-creds-interactive.sh"
    fi
else
    echo "⚠️  AWS CLI not installed - cannot verify credentials"
    echo "   Install with: brew install awscli (macOS) or apt install awscli (Linux)"
    echo ""
    echo "   Your credentials are configured in .env, but verification requires AWS CLI."
fi

echo ""
