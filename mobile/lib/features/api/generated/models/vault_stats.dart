// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'vault_stats.g.dart';

@JsonSerializable()
class VaultStats {
  const VaultStats({
    required this.totalStories,
    required this.totalConversations,
    required this.totalMinutes,
    required this.peopleCount,
    required this.placesCount,
  });
  
  factory VaultStats.fromJson(Map<String, Object?> json) => _$VaultStatsFromJson(json);
  
  /// Total number of stories
  final num totalStories;

  /// Total number of conversations
  final num totalConversations;

  /// Total minutes of conversation
  final num totalMinutes;

  /// Number of unique people mentioned
  final num peopleCount;

  /// Number of unique places mentioned
  final num placesCount;

  Map<String, Object?> toJson() => _$VaultStatsToJson(this);
}
