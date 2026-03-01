import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../api/generated/models/start_conversation.dart';

part 'conversations_state.freezed.dart';

@freezed
abstract class ConversationsState with _$ConversationsState {
  const factory ConversationsState.initial() = ConversationsInitial;
  const factory ConversationsState.loading() = ConversationsLoading;
  const factory ConversationsState.loaded({
    required List<dynamic> conversations,
  }) = ConversationsLoaded;
  const factory ConversationsState.startingSession() = StartingSession;
  const factory ConversationsState.sessionStarted({
    required String conversationId,
    required String conversationToken,
    required DynamicVariables dynamicVariables,
  }) = SessionStarted;
  const factory ConversationsState.error(String message) = ConversationsError;
}
