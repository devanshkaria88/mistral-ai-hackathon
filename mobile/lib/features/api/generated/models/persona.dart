// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'story.dart';

part 'persona.g.dart';

@JsonSerializable()
class Persona {
  const Persona({
    required this.response,
    required this.sourceStories,
    this.audioUrl,
  });
  
  factory Persona.fromJson(Map<String, Object?> json) => _$PersonaFromJson(json);
  
  /// The persona response text
  final String response;

  /// URL to the audio response in cloned voice
  final String? audioUrl;

  /// Source stories used to generate this response
  final List<Story> sourceStories;

  Map<String, Object?> toJson() => _$PersonaToJson(this);
}
