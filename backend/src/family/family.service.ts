import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { VoiceQualityTier } from '../common/types/voice-quality-tier.enum';
import {
  InviteResponseDto,
  VaultResponseDto,
  MyFamilyResponseDto,
  FamilyMemberResponseDto,
} from './dto';
import { FamilyGroup } from './family-group.entity';
import { User } from '../users/user.entity';
import { VoiceProfile } from '../voice/voice-profile.entity';
import { Story } from '../stories/story.entity';

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(
    @InjectRepository(FamilyGroup)
    private readonly familyGroupRepository: Repository<FamilyGroup>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VoiceProfile)
    private readonly voiceProfileRepository: Repository<VoiceProfile>,
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  async getMyFamily(userId: string): Promise<MyFamilyResponseDto> {
    this.logger.log(`Fetching family for user: ${userId}`);

    // Find the user's family group
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['familyGroup'],
    });

    if (!user?.familyGroupId) {
      // User is not in a family group - return empty
      return {
        familyName: 'My Family',
        members: [],
      };
    }

    // Get all members of the family group (excluding the current user)
    const familyGroup = await this.familyGroupRepository.findOne({
      where: { id: user.familyGroupId },
      relations: ['members'],
    });

    if (!familyGroup) {
      return {
        familyName: 'My Family',
        members: [],
      };
    }

    // Get voice profiles and story counts for all members
    const members: FamilyMemberResponseDto[] = [];
    
    for (const member of familyGroup.members) {
      if (member.id === userId) continue; // Skip current user

      const voiceProfile = await this.voiceProfileRepository.findOne({
        where: { userId: member.id },
      });

      const storiesCount = await this.storyRepository.count({
        where: { userId: member.id },
      });

      members.push({
        id: member.id,
        displayName: member.displayName,
        photoUrl: member.photoUrl,
        relationship: this.getRelationship(member, user),
        hasVoiceClone: !!voiceProfile?.elevenLabsVoiceId,
        storiesCount,
      });
    }

    return {
      familyName: familyGroup.name,
      members,
    };
  }

  private getRelationship(member: User, currentUser: User): string {
    // For now, return a generic relationship based on role
    // TODO: Add a relationship field to the family_group_members join table
    if (member.role === 'elderly') {
      return 'Family Elder';
    }
    return 'Family Member';
  }

  async createInvite(elderlyUserId: string): Promise<InviteResponseDto> {
    this.logger.log(`Creating invite for elderly user: ${elderlyUserId}`);
    
    const inviteCode = `MV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Create or get family group for this elderly user
    let familyGroup = await this.familyGroupRepository.findOne({
      where: { elderlyUserId },
    });

    if (!familyGroup) {
      familyGroup = this.familyGroupRepository.create({
        name: 'My Family',
        inviteCode,
        elderlyUserId,
      });
      await this.familyGroupRepository.save(familyGroup);

      // Add the elderly user to their own family group
      await this.userRepository.update(elderlyUserId, {
        familyGroupId: familyGroup.id,
      });
    }

    return {
      inviteCode: familyGroup.inviteCode,
      inviteLink: `https://memoryvault.app/join/${familyGroup.inviteCode}`,
    };
  }

  async joinFamily(userId: string, inviteCode: string): Promise<void> {
    this.logger.log(`User ${userId} joining family with code: ${inviteCode}`);

    const familyGroup = await this.familyGroupRepository.findOne({
      where: { inviteCode },
    });

    if (!familyGroup) {
      throw new NotFoundException('Invalid invite code');
    }

    await this.userRepository.update(userId, {
      familyGroupId: familyGroup.id,
    });

    this.logger.log(`User ${userId} joined family group ${familyGroup.id}`);
  }

  async seedTestFamily(currentUserId: string): Promise<void> {
    this.logger.log(`Seeding test family for user: ${currentUserId}`);

    const user1Id = '18e01328-0aa9-45e5-bccb-b89fdc3eefb9';
    const user2Id = '014b8b98-688d-4df9-84d7-053aeaaa4087';

    // Check if family group already exists
    let familyGroup = await this.familyGroupRepository.findOne({
      where: { inviteCode: 'MV-FAMILY1' },
    });

    if (!familyGroup) {
      familyGroup = this.familyGroupRepository.create({
        name: 'The Family',
        inviteCode: 'MV-FAMILY1',
        elderlyUserId: user1Id,
      });
      await this.familyGroupRepository.save(familyGroup);
      this.logger.log(`Created family group: ${familyGroup.id}`);
    }

    // Link both test users to this family group
    await this.userRepository.update(user1Id, { familyGroupId: familyGroup.id });
    await this.userRepository.update(user2Id, { familyGroupId: familyGroup.id });

    // Also link the current user to this family group
    await this.userRepository.update(currentUserId, { familyGroupId: familyGroup.id });

    this.logger.log('Seeded test family successfully');
  }

  async getVault(elderlyUserId: string): Promise<VaultResponseDto> {
    this.logger.log(`Fetching vault for elderly user: ${elderlyUserId}`);
    
    // Fetch real stories from database
    const stories = await this.storyRepository.find({
      where: { userId: elderlyUserId },
      order: { createdAt: 'DESC' },
      take: 20,
    });

    const voiceProfile = await this.voiceProfileRepository.findOne({
      where: { userId: elderlyUserId },
    });

    const totalStories = await this.storyRepository.count({
      where: { userId: elderlyUserId },
    });

    return {
      stories: stories.map(story => ({
        id: story.id,
        title: story.title,
        content: story.content,
        audioUrl: story.audioUrl,
        timePeriod: story.timePeriod,
        emotionalTone: story.emotionalTone,
        userId: story.userId,
        createdAt: story.createdAt,
        people: [],
        places: [],
        themes: [],
      })),
      stats: {
        totalStories,
        totalConversations: 0,
        totalMinutes: 0,
        peopleCount: 0,
        placesCount: 0,
      },
      voiceProfile: voiceProfile ? {
        qualityTier: voiceProfile.qualityTier,
        samplesCount: voiceProfile.samplesCount,
        totalAudioSeconds: voiceProfile.totalAudioSeconds,
      } : {
        qualityTier: VoiceQualityTier.NONE,
        samplesCount: 0,
        totalAudioSeconds: 0,
      },
    };
  }
}
