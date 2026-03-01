// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'start_conversation.g.dart';

@JsonSerializable()
class DynamicVariables {
  const DynamicVariables({
    required this.userName,
    required this.userAge,
    required this.contextBlock,
    required this.storiesSummary,
    required this.explorationSuggestions,
    this.elderlyName,
    this.personalityBlock,
    this.knowledgeGraph,
    this.peopleBlock,
    this.speechPatterns,
  });

  factory DynamicVariables.fromJson(Map<String, Object?> json) =>
      _$DynamicVariablesFromJson(json);

  // Companion mode variables
  @JsonKey(name: 'user_name')
  final String userName;

  @JsonKey(name: 'user_age')
  final String userAge;

  @JsonKey(name: 'context_block')
  final String contextBlock;

  @JsonKey(name: 'stories_summary')
  final String storiesSummary;

  @JsonKey(name: 'exploration_suggestions')
  final String explorationSuggestions;

  // Persona mode variables (for virtual clone)
  @JsonKey(name: 'elderly_name')
  final String? elderlyName;

  @JsonKey(name: 'personality_block')
  final String? personalityBlock;

  @JsonKey(name: 'knowledge_graph')
  final String? knowledgeGraph;

  @JsonKey(name: 'people_block')
  final String? peopleBlock;

  @JsonKey(name: 'speech_patterns')
  final String? speechPatterns;

  Map<String, Object?> toJson() => _$DynamicVariablesToJson(this);
}

@JsonSerializable()
class StartConversation {
  const StartConversation({
    required this.conversationId,
    required this.conversationToken,
    required this.dynamicVariables,
  });

  factory StartConversation.fromJson(Map<String, Object?> json) =>
      _$StartConversationFromJson(json);

  /// Unique identifier for the conversation
  final String conversationId;

  /// ElevenLabs conversation token for WebRTC voice connection
  final String conversationToken;

  /// Dynamic variables to pass to ElevenLabs agent for personalization
  final DynamicVariables dynamicVariables;

  Map<String, Object?> toJson() => _$StartConversationToJson(this);
}
