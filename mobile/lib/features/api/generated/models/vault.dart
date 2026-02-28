// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'story.dart';
import 'vault_stats.dart';
import 'voice_profile_summary.dart';

part 'vault.g.dart';

@JsonSerializable()
class Vault {
  const Vault({
    required this.stories,
    required this.stats,
    required this.voiceProfile,
  });
  
  factory Vault.fromJson(Map<String, Object?> json) => _$VaultFromJson(json);
  
  /// Recent stories from the vault
  final List<Story> stories;

  /// Vault statistics
  final VaultStats stats;

  /// Voice profile status
  final VoiceProfileSummary voiceProfile;

  Map<String, Object?> toJson() => _$VaultToJson(this);
}
