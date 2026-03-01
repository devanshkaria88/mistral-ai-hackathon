import { DataSource } from 'typeorm';
import { FamilyGroup } from './family-group.entity';
import { User } from '../users/user.entity';

/**
 * Seed script to create a family group and link the two test users.
 * Run this after the database is set up.
 * 
 * Usage: npx ts-node -r tsconfig-paths/register src/family/seed-family.ts
 */
export async function seedFamily(dataSource: DataSource): Promise<void> {
  const familyGroupRepo = dataSource.getRepository(FamilyGroup);
  const userRepo = dataSource.getRepository(User);

  const user1Id = '18e01328-0aa9-45e5-bccb-b89fdc3eefb9';
  const user2Id = '014b8b98-688d-4df9-84d7-053aeaaa4087';

  // Check if family group already exists
  let familyGroup = await familyGroupRepo.findOne({
    where: { inviteCode: 'MV-FAMILY1' },
  });

  if (!familyGroup) {
    familyGroup = familyGroupRepo.create({
      name: 'The Family',
      inviteCode: 'MV-FAMILY1',
      elderlyUserId: user1Id,
    });
    await familyGroupRepo.save(familyGroup);
    console.log('Created family group:', familyGroup.id);
  } else {
    console.log('Family group already exists:', familyGroup.id);
  }

  // Link both users to this family group
  await userRepo.update(user1Id, { familyGroupId: familyGroup.id });
  await userRepo.update(user2Id, { familyGroupId: familyGroup.id });

  console.log('Linked users to family group');
}
