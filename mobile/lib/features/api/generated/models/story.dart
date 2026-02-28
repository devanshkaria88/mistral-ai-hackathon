// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'person.dart';
import 'place.dart';
import 'theme.dart';

part 'story.g.dart';

@JsonSerializable()
class Story {
  const Story({
    required this.id,
    required this.title,
    required this.content,
    required this.userId,
    required this.createdAt,
    required this.people,
    required this.places,
    required this.themes,
    this.audioUrl,
    this.timePeriod,
    this.emotionalTone,
    this.conversationId,
  });
  
  factory Story.fromJson(Map<String, Object?> json) => _$StoryFromJson(json);
  
  /// Unique identifier for the story
  final String id;

  /// Title of the story
  final String title;

  /// Full narrative content of the story
  final String content;

  /// URL to the audio version in cloned voice
  final String? audioUrl;

  /// Time period the story relates to
  final String? timePeriod;

  /// Emotional tone of the story
  final String? emotionalTone;

  /// User ID of the elderly person
  final String userId;

  /// Conversation ID this story was extracted from
  final String? conversationId;

  /// When the story was created
  final DateTime createdAt;

  /// People mentioned in this story
  final List<Person> people;

  /// Places mentioned in this story
  final List<Place> places;

  /// Themes associated with this story
  final List<Theme> themes;

  Map<String, Object?> toJson() => _$StoryToJson(this);
}
