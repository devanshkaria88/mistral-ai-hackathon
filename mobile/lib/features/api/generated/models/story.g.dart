// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'story.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Story _$StoryFromJson(Map<String, dynamic> json) => Story(
  id: json['id'] as String,
  title: json['title'] as String,
  content: json['content'] as String,
  userId: json['userId'] as String,
  createdAt: DateTime.parse(json['createdAt'] as String),
  people: (json['people'] as List<dynamic>)
      .map((e) => Person.fromJson(e as Map<String, dynamic>))
      .toList(),
  places: (json['places'] as List<dynamic>)
      .map((e) => Place.fromJson(e as Map<String, dynamic>))
      .toList(),
  themes: (json['themes'] as List<dynamic>)
      .map((e) => Theme.fromJson(e as Map<String, dynamic>))
      .toList(),
  audioUrl: json['audioUrl'] as String?,
  timePeriod: json['timePeriod'] as String?,
  emotionalTone: json['emotionalTone'] as String?,
  conversationId: json['conversationId'] as String?,
);

Map<String, dynamic> _$StoryToJson(Story instance) => <String, dynamic>{
  'id': instance.id,
  'title': instance.title,
  'content': instance.content,
  'audioUrl': instance.audioUrl,
  'timePeriod': instance.timePeriod,
  'emotionalTone': instance.emotionalTone,
  'userId': instance.userId,
  'conversationId': instance.conversationId,
  'createdAt': instance.createdAt.toIso8601String(),
  'people': instance.people,
  'places': instance.places,
  'themes': instance.themes,
};
