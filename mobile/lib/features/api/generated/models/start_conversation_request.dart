import 'package:json_annotation/json_annotation.dart';

part 'start_conversation_request.g.dart';

enum ConversationMode {
  @JsonValue('companion')
  companion,
  @JsonValue('persona')
  persona,
}

@JsonSerializable()
class StartConversationRequest {
  const StartConversationRequest({
    required this.mode,
    this.elderlyUserId,
  });

  factory StartConversationRequest.fromJson(Map<String, Object?> json) =>
      _$StartConversationRequestFromJson(json);

  /// Type of conversation: companion (for elderly users) or persona (for family members)
  final ConversationMode mode;

  /// Required when mode is PERSONA - the elderly user whose persona to talk to
  final String? elderlyUserId;

  Map<String, Object?> toJson() => _$StartConversationRequestToJson(this);
}
