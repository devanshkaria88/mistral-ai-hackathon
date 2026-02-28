// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'ask_persona.g.dart';

@JsonSerializable()
class AskPersona {
  const AskPersona({
    required this.elderlyUserId,
    required this.question,
  });
  
  factory AskPersona.fromJson(Map<String, Object?> json) => _$AskPersonaFromJson(json);
  
  /// User ID of the elderly person whose persona to query
  final String elderlyUserId;

  /// Question to ask the persona
  final String question;

  Map<String, Object?> toJson() => _$AskPersonaToJson(this);
}
