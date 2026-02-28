# AWS Credentials Management Scripts

These scripts help you manage your temporary AWS Workshop Studio credentials during local development.

## 📋 Available Scripts

### 1. **Interactive Refresh** (Recommended)
```bash
./scripts/refresh-aws-creds-interactive.sh
```
Prompts you for each credential individually. Best for first-time setup or if you prefer typing each value.

**Usage:**
1. Go to your AWS Workshop Studio
2. Click "Get AWS CLI credentials"
3. Run the script
4. Enter each credential when prompted

---

### 2. **Paste Refresh**
```bash
./scripts/refresh-aws-creds.sh
```
Paste all export commands at once. Faster if you're comfortable with terminal.

**Usage:**
1. Go to your AWS Workshop Studio
2. Copy the export commands (all 4 lines)
3. Run the script
4. Paste the commands and press Ctrl+D

---

### 3. **Check Credentials Status**
```bash
./scripts/check-aws-creds.sh
```
Verifies if your current credentials are valid and shows expiration info.

**Usage:**
- Run anytime to check if credentials are still valid
- Requires AWS CLI installed (`brew install awscli`)

---

## 🔄 Typical Workflow

### Initial Setup
```bash
cd backend
./scripts/refresh-aws-creds-interactive.sh
npm run start:dev
```

### When Credentials Expire
You'll see errors like:
```
Error: The security token included in the request is expired
```

**Fix it:**
```bash
# Check if expired
./scripts/check-aws-creds.sh

# Refresh credentials
./scripts/refresh-aws-creds-interactive.sh

# Restart your server
npm run start:dev
```

---

## ⏰ Credential Expiration

- Workshop Studio credentials typically expire after **1-12 hours**
- The scripts automatically backup your `.env` to `.env.backup` before updating
- You can restore from backup if needed: `cp .env.backup .env`

---

## 🔐 Security Notes

- Never commit `.env` to git (already in `.gitignore`)
- These are temporary credentials - they expire automatically
- The session token is required for temporary credentials
- Scripts validate credentials before updating `.env`

---

## 🐛 Troubleshooting

**Script won't run:**
```bash
chmod +x scripts/*.sh
```

**Credentials not working:**
1. Check you copied all 4 values (ACCESS_KEY, SECRET_KEY, SESSION_TOKEN, REGION)
2. Verify the ACCESS_KEY starts with `ASIA` (temporary credentials)
3. Make sure there are no extra spaces or quotes
4. Try getting fresh credentials from Workshop Studio

**AWS CLI not installed:**
```bash
# macOS
brew install awscli

# Linux
sudo apt install awscli
```

---

## 📝 Manual Update

If scripts don't work, manually edit `.env`:

```env
AWS_ACCESS_KEY_ID=ASIA...
AWS_SECRET_ACCESS_KEY=...
AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjEJH...
AWS_REGION=us-west-2
```

All three (ACCESS_KEY, SECRET_KEY, SESSION_TOKEN) are required for temporary credentials.
