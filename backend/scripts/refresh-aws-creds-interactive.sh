#!/bin/bash

# Interactive AWS Credentials Refresh Script
# This version prompts for each credential individually

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

echo "🔑 AWS Credentials Refresh Helper (Interactive)"
echo "================================================"
echo ""
echo "Get your credentials from AWS Workshop Studio and enter them below."
echo ""

# Prompt for each credential
read -p "AWS_ACCESS_KEY_ID (starts with ASIA...): " ACCESS_KEY
read -p "AWS_SECRET_ACCESS_KEY: " SECRET_KEY
read -p "AWS_SESSION_TOKEN (long string): " SESSION_TOKEN
read -p "AWS_REGION [us-west-2]: " REGION

# Default region if not provided
if [ -z "$REGION" ]; then
    REGION="us-west-2"
fi

# Validate that we got all the required values
if [ -z "$ACCESS_KEY" ] || [ -z "$SECRET_KEY" ] || [ -z "$SESSION_TOKEN" ]; then
    echo ""
    echo "❌ Error: All credentials are required!"
    exit 1
fi

echo ""
echo "✅ Credentials received!"
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
