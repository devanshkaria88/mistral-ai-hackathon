#!/bin/bash

# AWS Credentials Refresh Script for Workshop Studio
# This script helps you quickly update your temporary AWS credentials in .env

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

echo "🔑 AWS Credentials Refresh Helper"
echo "=================================="
echo ""
echo "Go to your AWS Workshop Studio and copy the credentials."
echo "They should look like:"
echo "  export AWS_ACCESS_KEY_ID=\"ASIA...\""
echo "  export AWS_SECRET_ACCESS_KEY=\"...\""
echo "  export AWS_SESSION_TOKEN=\"...\""
echo "  export AWS_DEFAULT_REGION=\"us-west-2\""
echo ""
echo "Paste them below and press Enter, then Ctrl+D when done:"
echo ""

# Read the export commands from user input
TEMP_FILE=$(mktemp)
cat > "$TEMP_FILE"

# Extract values from the export commands
ACCESS_KEY=$(grep "AWS_ACCESS_KEY_ID" "$TEMP_FILE" | sed -E 's/.*"(.*)".*/\1/')
SECRET_KEY=$(grep "AWS_SECRET_ACCESS_KEY" "$TEMP_FILE" | sed -E 's/.*"(.*)".*/\1/')
SESSION_TOKEN=$(grep "AWS_SESSION_TOKEN" "$TEMP_FILE" | sed -E 's/.*"(.*)".*/\1/')
REGION=$(grep "AWS_DEFAULT_REGION" "$TEMP_FILE" | sed -E 's/.*"(.*)".*/\1/')

rm "$TEMP_FILE"

# Validate that we got all the values
if [ -z "$ACCESS_KEY" ] || [ -z "$SECRET_KEY" ] || [ -z "$SESSION_TOKEN" ]; then
    echo "❌ Error: Could not parse credentials. Make sure you pasted the export commands."
    exit 1
fi

# Default region if not provided
if [ -z "$REGION" ]; then
    REGION="us-west-2"
fi

echo ""
echo "✅ Credentials parsed successfully!"
echo "   Access Key: ${ACCESS_KEY:0:20}..."
echo "   Region: $REGION"
echo ""

# Backup the current .env file
cp "$ENV_FILE" "$ENV_FILE.backup"
echo "📦 Backed up current .env to .env.backup"

# Update the .env file
sed -i.tmp "s|^AWS_ACCESS_KEY_ID=.*|AWS_ACCESS_KEY_ID=$ACCESS_KEY|" "$ENV_FILE"
sed -i.tmp "s|^AWS_SECRET_ACCESS_KEY=.*|AWS_SECRET_ACCESS_KEY=$SECRET_KEY|" "$ENV_FILE"
sed -i.tmp "s|^AWS_SESSION_TOKEN=.*|AWS_SESSION_TOKEN=$SESSION_TOKEN|" "$ENV_FILE"
sed -i.tmp "s|^AWS_REGION=.*|AWS_REGION=$REGION|" "$ENV_FILE"

rm "$ENV_FILE.tmp"

echo "✅ Updated .env file with new credentials!"
echo ""
echo "🚀 You can now restart your backend server."
echo "   The credentials will expire in a few hours - run this script again when needed."
echo ""
