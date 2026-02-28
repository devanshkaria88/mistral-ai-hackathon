// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'voice_profile_summary_quality_tier.dart';

part 'voice_profile_summary.g.dart';

@JsonSerializable()
class VoiceProfileSummary {
  const VoiceProfileSummary({
    required this.qualityTier,
    required this.samplesCount,
    required this.totalAudioSeconds,
  });
  
  factory VoiceProfileSummary.fromJson(Map<String, Object?> json) => _$VoiceProfileSummaryFromJson(json);
  
  /// Current voice quality tier
  final VoiceProfileSummaryQualityTier qualityTier;

  /// Number of audio samples collected
  final num samplesCount;

  /// Total seconds of audio collected
  final num totalAudioSeconds;

  Map<String, Object?> toJson() => _$VoiceProfileSummaryToJson(this);
}
