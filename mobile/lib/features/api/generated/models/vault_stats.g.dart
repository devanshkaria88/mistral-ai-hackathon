// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vault_stats.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

VaultStats _$VaultStatsFromJson(Map<String, dynamic> json) => VaultStats(
  totalStories: json['totalStories'] as num,
  totalConversations: json['totalConversations'] as num,
  totalMinutes: json['totalMinutes'] as num,
  peopleCount: json['peopleCount'] as num,
  placesCount: json['placesCount'] as num,
);

Map<String, dynamic> _$VaultStatsToJson(VaultStats instance) =>
    <String, dynamic>{
      'totalStories': instance.totalStories,
      'totalConversations': instance.totalConversations,
      'totalMinutes': instance.totalMinutes,
      'peopleCount': instance.peopleCount,
      'placesCount': instance.placesCount,
    };
