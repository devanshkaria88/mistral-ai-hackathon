import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { VoiceQualityTier } from '../common/types/voice-quality-tier.enum';
import { User } from '../users/user.entity';

@Entity('voice_profiles')
export class VoiceProfile extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid', unique: true })
  userId: string;

  @Column({ name: 'elevenlabs_voice_id', nullable: true })
  elevenLabsVoiceId: string;

  @Column({ name: 'samples_count', type: 'int', default: 0 })
  samplesCount: number;

  @Column({ name: 'total_audio_seconds', type: 'float', default: 0 })
  totalAudioSeconds: number;

  @Column({
    name: 'quality_tier',
    type: 'enum',
    enum: VoiceQualityTier,
    default: VoiceQualityTier.NONE,
  })
  qualityTier: VoiceQualityTier;

  @Column({ name: 'last_updated_at', type: 'timestamp', nullable: true })
  lastUpdatedAt: Date;

  @OneToOne(() => User, (user) => user.voiceProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
