// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'voice_profile_quality_tier.dart';

part 'voice_profile.g.dart';

@JsonSerializable()
class VoiceProfile {
  const VoiceProfile({
    required this.id,
    required this.userId,
    required this.samplesCount,
    required this.totalAudioSeconds,
    required this.qualityTier,
    this.elevenLabsVoiceId,
    this.lastUpdatedAt,
  });
  
  factory VoiceProfile.fromJson(Map<String, Object?> json) => _$VoiceProfileFromJson(json);
  
  /// Voice profile ID
  final String id;

  /// User ID this profile belongs to
  final String userId;

  /// ElevenLabs voice clone ID
  final String? elevenLabsVoiceId;

  /// Number of audio samples collected
  final num samplesCount;

  /// Total seconds of audio collected
  final num totalAudioSeconds;

  /// Current voice quality tier
  final VoiceProfileQualityTier qualityTier;

  /// When the voice profile was last updated
  final DateTime? lastUpdatedAt;

  Map<String, Object?> toJson() => _$VoiceProfileToJson(this);
}
