// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'end_conversation.g.dart';

@JsonSerializable()
class EndConversation {
  const EndConversation({
    required this.status,
  });
  
  factory EndConversation.fromJson(Map<String, Object?> json) => _$EndConversationFromJson(json);
  
  /// Current processing status
  final String status;

  Map<String, Object?> toJson() => _$EndConversationToJson(this);
}
