import 'package:freezed_annotation/freezed_annotation.dart';

part 'conversations_event.freezed.dart';

@freezed
abstract class ConversationsEvent with _$ConversationsEvent {
  const factory ConversationsEvent.loadConversations() = LoadConversations;

  /// Start companion mode for elderly users (per VOICE_UI_FLOW.md)
  const factory ConversationsEvent.startCompanionMode() = StartCompanionMode;

  /// Start persona mode for family members to talk to elderly relative
  /// [elderlyUserId] - the elderly user whose persona to talk to
  const factory ConversationsEvent.startPersonaMode(String elderlyUserId) =
      StartPersonaMode;

  const factory ConversationsEvent.endConversation(String id) = EndConversation;
}
