// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'start_conversation.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StartConversation _$StartConversationFromJson(Map<String, dynamic> json) =>
    StartConversation(
      conversationId: json['conversationId'] as String,
      sessionUrl: json['sessionUrl'] as String,
    );

Map<String, dynamic> _$StartConversationToJson(StartConversation instance) =>
    <String, dynamic>{
      'conversationId': instance.conversationId,
      'sessionUrl': instance.sessionUrl,
    };
