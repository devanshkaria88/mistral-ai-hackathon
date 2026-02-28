export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'ressurect',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY || '15m',
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  elevenlabs: {
    apiKey: process.env.ELEVENLABS_API_KEY,
    companionAgentId: process.env.ELEVENLABS_COMPANION_AGENT_ID,
    personaAgentId: process.env.ELEVENLABS_PERSONA_AGENT_ID,
    companionVoiceId: process.env.ELEVENLABS_COMPANION_VOICE_ID || 'Rachel',
  },
  wandb: {
    apiKey: process.env.WANDB_API_KEY,
    project: process.env.WANDB_PROJECT,
  },
  mistral: {
    apiKey: process.env.MISTRAL_API_KEY,
  },
});
