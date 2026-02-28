// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'voice_profile.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

VoiceProfile _$VoiceProfileFromJson(Map<String, dynamic> json) => VoiceProfile(
  id: json['id'] as String,
  userId: json['userId'] as String,
  samplesCount: json['samplesCount'] as num,
  totalAudioSeconds: json['totalAudioSeconds'] as num,
  qualityTier: VoiceProfileQualityTier.fromJson(json['qualityTier'] as String),
  elevenLabsVoiceId: json['elevenLabsVoiceId'] as String?,
  lastUpdatedAt: json['lastUpdatedAt'] == null
      ? null
      : DateTime.parse(json['lastUpdatedAt'] as String),
);

Map<String, dynamic> _$VoiceProfileToJson(VoiceProfile instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'elevenLabsVoiceId': instance.elevenLabsVoiceId,
      'samplesCount': instance.samplesCount,
      'totalAudioSeconds': instance.totalAudioSeconds,
      'qualityTier': _$VoiceProfileQualityTierEnumMap[instance.qualityTier]!,
      'lastUpdatedAt': instance.lastUpdatedAt?.toIso8601String(),
    };

const _$VoiceProfileQualityTierEnumMap = {
  VoiceProfileQualityTier.none: 'none',
  VoiceProfileQualityTier.basic: 'basic',
  VoiceProfileQualityTier.good: 'good',
  VoiceProfileQualityTier.excellent: 'excellent',
  VoiceProfileQualityTier.$unknown: r'$unknown',
};
