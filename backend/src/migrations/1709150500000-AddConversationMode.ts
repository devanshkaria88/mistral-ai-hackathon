import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConversationMode1709150500000 implements MigrationInterface {
  name = 'AddConversationMode1709150500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add mode column with default value 'companion'
    await queryRunner.query(`
      ALTER TABLE "conversations" 
      ADD COLUMN IF NOT EXISTS "mode" VARCHAR(20) DEFAULT 'companion'
    `);

    // Add persona_user_id column for persona mode conversations
    await queryRunner.query(`
      ALTER TABLE "conversations" 
      ADD COLUMN IF NOT EXISTS "persona_user_id" UUID NULL
    `);

    // Add foreign key constraint for persona_user_id
    await queryRunner.query(`
      ALTER TABLE "conversations"
      ADD CONSTRAINT "FK_conversations_persona_user"
      FOREIGN KEY ("persona_user_id") REFERENCES "users"("id")
      ON DELETE SET NULL
    `);

    // Create index for faster lookups by mode
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_conversations_mode" ON "conversations" ("mode")
    `);

    // Create index for persona conversations lookup
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_conversations_persona_user_id" ON "conversations" ("persona_user_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_conversations_persona_user_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_conversations_mode"`);

    // Drop foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "conversations"
      DROP CONSTRAINT IF EXISTS "FK_conversations_persona_user"
    `);

    // Drop columns
    await queryRunner.query(`ALTER TABLE "conversations" DROP COLUMN IF EXISTS "persona_user_id"`);
    await queryRunner.query(`ALTER TABLE "conversations" DROP COLUMN IF EXISTS "mode"`);
  }
}
