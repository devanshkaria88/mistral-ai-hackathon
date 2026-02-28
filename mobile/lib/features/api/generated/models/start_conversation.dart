// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'start_conversation.g.dart';

@JsonSerializable()
class StartConversation {
  const StartConversation({
    required this.conversationId,
    required this.sessionUrl,
  });
  
  factory StartConversation.fromJson(Map<String, Object?> json) => _$StartConversationFromJson(json);
  
  /// Unique identifier for the conversation
  final String conversationId;

  /// ElevenLabs session URL for voice interaction
  final String sessionUrl;

  Map<String, Object?> toJson() => _$StartConversationToJson(this);
}
