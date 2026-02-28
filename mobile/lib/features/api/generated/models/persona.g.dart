// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'persona.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Persona _$PersonaFromJson(Map<String, dynamic> json) => Persona(
  response: json['response'] as String,
  sourceStories: (json['sourceStories'] as List<dynamic>)
      .map((e) => Story.fromJson(e as Map<String, dynamic>))
      .toList(),
  audioUrl: json['audioUrl'] as String?,
);

Map<String, dynamic> _$PersonaToJson(Persona instance) => <String, dynamic>{
  'response': instance.response,
  'audioUrl': instance.audioUrl,
  'sourceStories': instance.sourceStories,
};
