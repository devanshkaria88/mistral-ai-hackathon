// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'voice_profile_summary.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

VoiceProfileSummary _$VoiceProfileSummaryFromJson(Map<String, dynamic> json) =>
    VoiceProfileSummary(
      qualityTier: VoiceProfileSummaryQualityTier.fromJson(
        json['qualityTier'] as String,
      ),
      samplesCount: json['samplesCount'] as num,
      totalAudioSeconds: json['totalAudioSeconds'] as num,
    );

Map<String, dynamic> _$VoiceProfileSummaryToJson(
  VoiceProfileSummary instance,
) => <String, dynamic>{
  'qualityTier': _$VoiceProfileSummaryQualityTierEnumMap[instance.qualityTier]!,
  'samplesCount': instance.samplesCount,
  'totalAudioSeconds': instance.totalAudioSeconds,
};

const _$VoiceProfileSummaryQualityTierEnumMap = {
  VoiceProfileSummaryQualityTier.none: 'none',
  VoiceProfileSummaryQualityTier.basic: 'basic',
  VoiceProfileSummaryQualityTier.good: 'good',
  VoiceProfileSummaryQualityTier.excellent: 'excellent',
  VoiceProfileSummaryQualityTier.$unknown: r'$unknown',
};
