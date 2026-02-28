import 'package:freezed_annotation/freezed_annotation.dart';

part 'conversations_event.freezed.dart';

@freezed
abstract class ConversationsEvent with _$ConversationsEvent {
  const factory ConversationsEvent.loadConversations() = LoadConversations;
  const factory ConversationsEvent.startConversation() = StartConversation;
  const factory ConversationsEvent.endConversation(String id) = EndConversation;
}
