// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'start_conversation_request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

StartConversationRequest _$StartConversationRequestFromJson(
  Map<String, dynamic> json,
) => StartConversationRequest(
  mode: $enumDecode(_$ConversationModeEnumMap, json['mode']),
  elderlyUserId: json['elderlyUserId'] as String?,
);

Map<String, dynamic> _$StartConversationRequestToJson(
  StartConversationRequest instance,
) => <String, dynamic>{
  'mode': _$ConversationModeEnumMap[instance.mode]!,
  'elderlyUserId': instance.elderlyUserId,
};

const _$ConversationModeEnumMap = {
  ConversationMode.companion: 'companion',
  ConversationMode.persona: 'persona',
};
