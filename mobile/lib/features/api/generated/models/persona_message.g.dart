// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'persona_message.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PersonaMessage _$PersonaMessageFromJson(Map<String, dynamic> json) =>
    PersonaMessage(
      id: json['id'] as String,
      question: json['question'] as String,
      response: json['response'] as String,
      sourceStoryIds: (json['sourceStoryIds'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
      createdAt: DateTime.parse(json['createdAt'] as String),
      responseAudioUrl: json['responseAudioUrl'] as String?,
    );

Map<String, dynamic> _$PersonaMessageToJson(PersonaMessage instance) =>
    <String, dynamic>{
      'id': instance.id,
      'question': instance.question,
      'response': instance.response,
      'responseAudioUrl': instance.responseAudioUrl,
      'sourceStoryIds': instance.sourceStoryIds,
      'createdAt': instance.createdAt.toIso8601String(),
    };
