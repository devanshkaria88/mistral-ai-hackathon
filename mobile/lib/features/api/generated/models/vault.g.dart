// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vault.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Vault _$VaultFromJson(Map<String, dynamic> json) => Vault(
  stories: (json['stories'] as List<dynamic>)
      .map((e) => Story.fromJson(e as Map<String, dynamic>))
      .toList(),
  stats: VaultStats.fromJson(json['stats'] as Map<String, dynamic>),
  voiceProfile: VoiceProfileSummary.fromJson(
    json['voiceProfile'] as Map<String, dynamic>,
  ),
);

Map<String, dynamic> _$VaultToJson(Vault instance) => <String, dynamic>{
  'stories': instance.stories,
  'stats': instance.stats,
  'voiceProfile': instance.voiceProfile,
};
