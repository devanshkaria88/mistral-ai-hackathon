// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'persona_message.g.dart';

@JsonSerializable()
class PersonaMessage {
  const PersonaMessage({
    required this.id,
    required this.question,
    required this.response,
    required this.sourceStoryIds,
    required this.createdAt,
    this.responseAudioUrl,
  });
  
  factory PersonaMessage.fromJson(Map<String, Object?> json) => _$PersonaMessageFromJson(json);
  
  /// Message ID
  final String id;

  /// The question asked
  final String question;

  /// The persona response
  final String response;

  /// URL to the audio response
  final String? responseAudioUrl;

  /// IDs of stories used as context
  final List<String> sourceStoryIds;

  /// When the message was created
  final DateTime createdAt;

  Map<String, Object?> toJson() => _$PersonaMessageToJson(this);
}
