import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VoiceQualityTier } from '../common/types/voice-quality-tier.enum';
import {
  InviteResponseDto,
  VaultResponseDto,
} from './dto';

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  async createInvite(elderlyUserId: string): Promise<InviteResponseDto> {
    this.logger.log(`Creating invite for elderly user: ${elderlyUserId}`);
    
    const inviteCode = `MV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return {
      inviteCode,
      inviteLink: `https://memoryvault.app/join/${inviteCode}`,
    };
  }

  async getVault(elderlyUserId: string): Promise<VaultResponseDto> {
    this.logger.log(`Fetching vault for elderly user: ${elderlyUserId}`);
    
    return {
      stories: [
        {
          id: uuidv4(),
          title: 'Meeting Arthur at the Dance Hall',
          content: "It was 1962, and I was just nineteen...",
          audioUrl: 'https://storage.example.com/tts/story1.mp3',
          timePeriod: '1962',
          emotionalTone: 'nostalgic',
          userId: elderlyUserId,
          createdAt: new Date('2026-02-27T10:30:00Z'),
          people: [
            { id: uuidv4(), name: 'Arthur', relationship: 'husband' },
          ],
          places: [
            { id: uuidv4(), name: 'Palais Dance Hall' },
          ],
          themes: [
            { id: uuidv4(), name: 'Love', slug: 'love' },
          ],
        },
      ],
      stats: {
        totalStories: 24,
        totalConversations: 8,
        totalMinutes: 156,
        peopleCount: 12,
        placesCount: 7,
      },
      voiceProfile: {
        qualityTier: VoiceQualityTier.GOOD,
        samplesCount: 5,
        totalAudioSeconds: 324.5,
      },
    };
  }
}
