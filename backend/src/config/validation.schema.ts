import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.string().default('15m'),
  REFRESH_TOKEN_EXPIRY: Joi.string().default('7d'),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  AWS_REGION: Joi.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  ELEVENLABS_API_KEY: Joi.string().required(),
  ELEVENLABS_COMPANION_AGENT_ID: Joi.string().required(),
  ELEVENLABS_PERSONA_AGENT_ID: Joi.string().required(),
  ELEVENLABS_COMPANION_VOICE_ID: Joi.string().default('Rachel'),
  WANDB_API_KEY: Joi.string().optional(),
  WANDB_PROJECT: Joi.string().optional(),
  MISTRAL_API_KEY: Joi.string().optional(),
  AWS_SESSION_TOKEN: Joi.string().optional(),
});
