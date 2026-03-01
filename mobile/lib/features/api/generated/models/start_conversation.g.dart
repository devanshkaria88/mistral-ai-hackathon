// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'start_conversation.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DynamicVariables _$DynamicVariablesFromJson(Map<String, dynamic> json) =>
    DynamicVariables(
      userName: json['user_name'] as String? ?? '',
      userAge: json['user_age'] as String? ?? '',
      contextBlock: json['context_block'] as String? ?? '',
      storiesSummary: json['stories_summary'] as String? ?? '',
      explorationSuggestions: json['exploration_suggestions'] as String? ?? '',
      elderlyName: json['elderly_name'] as String?,
      personalityBlock: json['personality_block'] as String?,
      knowledgeGraph: json['knowledge_graph'] as String?,
      peopleBlock: json['people_block'] as String?,
      speechPatterns: json['speech_patterns'] as String?,
    );

Map<String, dynamic> _$DynamicVariablesToJson(DynamicVariables instance) =>
    <String, dynamic>{
      'user_name': instance.userName,
      'user_age': instance.userAge,
      'context_block': instance.contextBlock,
      'stories_summary': instance.storiesSummary,
      'exploration_suggestions': instance.explorationSuggestions,
      if (instance.elderlyName != null) 'elderly_name': instance.elderlyName,
      if (instance.personalityBlock != null)
        'personality_block': instance.personalityBlock,
      if (instance.knowledgeGraph != null)
        'knowledge_graph': instance.knowledgeGraph,
      if (instance.peopleBlock != null) 'people_block': instance.peopleBlock,
      if (instance.speechPatterns != null)
        'speech_patterns': instance.speechPatterns,
    };

StartConversation _$StartConversationFromJson(Map<String, dynamic> json) =>
    StartConversation(
      conversationId: json['conversationId'] as String,
      conversationToken: json['conversationToken'] as String,
      dynamicVariables: DynamicVariables.fromJson(
        json['dynamicVariables'] as Map<String, dynamic>,
      ),
    );

Map<String, dynamic> _$StartConversationToJson(StartConversation instance) =>
    <String, dynamic>{
      'conversationId': instance.conversationId,
      'conversationToken': instance.conversationToken,
      'dynamicVariables': instance.dynamicVariables,
    };
