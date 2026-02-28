-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create enum types
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('elderly', 'family');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE conversation_status_enum AS ENUM ('active', 'ended', 'processing', 'processed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE voice_quality_tier_enum AS ENUM ('none', 'basic', 'good', 'excellent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
