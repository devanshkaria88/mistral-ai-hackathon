// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'conversation_status.dart';

part 'conversation.g.dart';

@JsonSerializable()
class Conversation {
  const Conversation({
    required this.id,
    required this.userId,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.storiesCount,
    this.transcript,
    this.audioUrl,
  });
  
  factory Conversation.fromJson(Map<String, Object?> json) => _$ConversationFromJson(json);
  
  /// Unique identifier for the conversation
  final String id;

  /// User ID of the elderly person
  final String userId;

  /// Current status of the conversation
  final ConversationStatus status;

  /// Full transcript of the conversation
  final String? transcript;

  /// URL to the audio recording
  final String? audioUrl;

  /// When the conversation was created
  final DateTime createdAt;

  /// When the conversation was last updated
  final DateTime updatedAt;

  /// Number of stories extracted from this conversation
  final num storiesCount;

  Map<String, Object?> toJson() => _$ConversationToJson(this);
}
