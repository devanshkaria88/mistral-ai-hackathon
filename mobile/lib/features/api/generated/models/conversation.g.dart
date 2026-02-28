// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'conversation.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Conversation _$ConversationFromJson(Map<String, dynamic> json) => Conversation(
  id: json['id'] as String,
  userId: json['userId'] as String,
  status: ConversationStatus.fromJson(json['status'] as String),
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
  storiesCount: json['storiesCount'] as num,
  transcript: json['transcript'] as String?,
  audioUrl: json['audioUrl'] as String?,
);

Map<String, dynamic> _$ConversationToJson(Conversation instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'status': _$ConversationStatusEnumMap[instance.status]!,
      'transcript': instance.transcript,
      'audioUrl': instance.audioUrl,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
      'storiesCount': instance.storiesCount,
    };

const _$ConversationStatusEnumMap = {
  ConversationStatus.active: 'active',
  ConversationStatus.ended: 'ended',
  ConversationStatus.processing: 'processing',
  ConversationStatus.processed: 'processed',
  ConversationStatus.failed: 'failed',
  ConversationStatus.$unknown: r'$unknown',
};
