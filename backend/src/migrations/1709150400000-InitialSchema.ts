import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1709150400000 implements MigrationInterface {
  name = 'InitialSchema1709150400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable pgvector extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);

    // Create enum types
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM ('elderly', 'family')
    `);

    await queryRunner.query(`
      CREATE TYPE "conversation_status_enum" AS ENUM ('active', 'ended', 'processing', 'processed', 'failed')
    `);

    await queryRunner.query(`
      CREATE TYPE "voice_quality_tier_enum" AS ENUM ('none', 'basic', 'good', 'excellent')
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "email" character varying NOT NULL,
        "display_name" character varying NOT NULL,
        "photo_url" character varying,
        "firebase_uid" character varying NOT NULL,
        "role" "user_role_enum" NOT NULL DEFAULT 'elderly',
        "refresh_token_hash" character varying,
        "family_group_id" uuid,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_users_firebase_uid" UNIQUE ("firebase_uid"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Create family_groups table
    await queryRunner.query(`
      CREATE TABLE "family_groups" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "name" character varying NOT NULL,
        "invite_code" character varying,
        "elderly_user_id" uuid NOT NULL,
        CONSTRAINT "UQ_family_groups_invite_code" UNIQUE ("invite_code"),
        CONSTRAINT "PK_family_groups" PRIMARY KEY ("id")
      )
    `);

    // Create conversations table
    await queryRunner.query(`
      CREATE TABLE "conversations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id" uuid NOT NULL,
        "elevenlabs_session_id" character varying,
        "status" "conversation_status_enum" NOT NULL DEFAULT 'active',
        "transcript" text,
        "audio_url" character varying,
        "metadata" jsonb,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_conversations" PRIMARY KEY ("id")
      )
    `);

    // Create stories table with pgvector embedding
    await queryRunner.query(`
      CREATE TABLE "stories" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "title" character varying NOT NULL,
        "content" text NOT NULL,
        "audio_url" character varying,
        "time_period" character varying,
        "emotional_tone" character varying,
        "embedding" vector(1024),
        "metadata" jsonb,
        "deleted_at" TIMESTAMP,
        "conversation_id" uuid,
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_stories" PRIMARY KEY ("id")
      )
    `);

    // Create people table
    await queryRunner.query(`
      CREATE TABLE "people" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "name" character varying NOT NULL,
        "relationship" character varying,
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_people" PRIMARY KEY ("id")
      )
    `);

    // Create places table
    await queryRunner.query(`
      CREATE TABLE "places" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "name" character varying NOT NULL,
        "description" character varying,
        "latitude" float,
        "longitude" float,
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_places" PRIMARY KEY ("id")
      )
    `);

    // Create themes table
    await queryRunner.query(`
      CREATE TABLE "themes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "name" character varying NOT NULL,
        "slug" character varying NOT NULL,
        CONSTRAINT "UQ_themes_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_themes" PRIMARY KEY ("id")
      )
    `);

    // Create voice_profiles table
    await queryRunner.query(`
      CREATE TABLE "voice_profiles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id" uuid NOT NULL,
        "elevenlabs_voice_id" character varying,
        "samples_count" integer NOT NULL DEFAULT 0,
        "total_audio_seconds" float NOT NULL DEFAULT 0,
        "quality_tier" "voice_quality_tier_enum" NOT NULL DEFAULT 'none',
        "last_updated_at" TIMESTAMP,
        CONSTRAINT "REL_voice_profiles_user_id" UNIQUE ("user_id"),
        CONSTRAINT "PK_voice_profiles" PRIMARY KEY ("id")
      )
    `);

    // Create persona_messages table
    await queryRunner.query(`
      CREATE TABLE "persona_messages" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "family_user_id" uuid NOT NULL,
        "elderly_user_id" uuid NOT NULL,
        "question" text NOT NULL,
        "response" text NOT NULL,
        "response_audio_url" character varying,
        "source_story_ids" uuid[] NOT NULL DEFAULT '{}',
        CONSTRAINT "PK_persona_messages" PRIMARY KEY ("id")
      )
    `);

    // Create junction tables
    await queryRunner.query(`
      CREATE TABLE "story_people" (
        "story_id" uuid NOT NULL,
        "person_id" uuid NOT NULL,
        CONSTRAINT "PK_story_people" PRIMARY KEY ("story_id", "person_id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "story_places" (
        "story_id" uuid NOT NULL,
        "place_id" uuid NOT NULL,
        CONSTRAINT "PK_story_places" PRIMARY KEY ("story_id", "place_id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "story_themes" (
        "story_id" uuid NOT NULL,
        "theme_id" uuid NOT NULL,
        CONSTRAINT "PK_story_themes" PRIMARY KEY ("story_id", "theme_id")
      )
    `);

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "users" ADD CONSTRAINT "FK_users_family_group" 
      FOREIGN KEY ("family_group_id") REFERENCES "family_groups"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "family_groups" ADD CONSTRAINT "FK_family_groups_elderly_user" 
      FOREIGN KEY ("elderly_user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "conversations" ADD CONSTRAINT "FK_conversations_user" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "stories" ADD CONSTRAINT "FK_stories_conversation" 
      FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "stories" ADD CONSTRAINT "FK_stories_user" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "voice_profiles" ADD CONSTRAINT "FK_voice_profiles_user" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "persona_messages" ADD CONSTRAINT "FK_persona_messages_family_user" 
      FOREIGN KEY ("family_user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "persona_messages" ADD CONSTRAINT "FK_persona_messages_elderly_user" 
      FOREIGN KEY ("elderly_user_id") REFERENCES "users"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "story_people" ADD CONSTRAINT "FK_story_people_story" 
      FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "story_people" ADD CONSTRAINT "FK_story_people_person" 
      FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "story_places" ADD CONSTRAINT "FK_story_places_story" 
      FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "story_places" ADD CONSTRAINT "FK_story_places_place" 
      FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "story_themes" ADD CONSTRAINT "FK_story_themes_story" 
      FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "story_themes" ADD CONSTRAINT "FK_story_themes_theme" 
      FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE CASCADE
    `);

    // Create HNSW index on story embeddings for fast similarity search
    await queryRunner.query(`
      CREATE INDEX "IDX_stories_embedding_hnsw" ON "stories" 
      USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64)
    `);

    // Create indexes for common queries
    await queryRunner.query(`CREATE INDEX "IDX_users_firebase_uid" ON "users" ("firebase_uid")`);
    await queryRunner.query(`CREATE INDEX "IDX_conversations_user_id" ON "conversations" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_stories_user_id" ON "stories" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_stories_conversation_id" ON "stories" ("conversation_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_people_user_id" ON "people" ("user_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_places_user_id" ON "places" ("user_id")`);

    // Seed default themes
    await queryRunner.query(`
      INSERT INTO "themes" ("name", "slug") VALUES
      ('Love', 'love'),
      ('Family', 'family'),
      ('Work', 'work'),
      ('Travel', 'travel'),
      ('Childhood', 'childhood'),
      ('War', 'war'),
      ('Achievement', 'achievement'),
      ('Loss', 'loss'),
      ('Friendship', 'friendship'),
      ('Adventure', 'adventure'),
      ('Education', 'education'),
      ('Health', 'health')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_places_user_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_people_user_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_stories_conversation_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_stories_user_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_conversations_user_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_users_firebase_uid"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_stories_embedding_hnsw"`);

    // Drop junction tables
    await queryRunner.query(`DROP TABLE IF EXISTS "story_themes"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "story_places"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "story_people"`);

    // Drop tables
    await queryRunner.query(`DROP TABLE IF EXISTS "persona_messages"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "voice_profiles"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "themes"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "places"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "people"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "stories"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "conversations"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "family_groups"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE IF EXISTS "voice_quality_tier_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "conversation_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_role_enum"`);

    // Note: We don't drop the vector extension as it might be used by other databases
  }
}
