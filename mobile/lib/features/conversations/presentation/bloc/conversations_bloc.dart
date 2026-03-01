import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../../api/generated/clients/conversations_client.dart';
import '../../../api/generated/models/start_conversation_request.dart';
import 'conversations_event.dart';
import 'conversations_state.dart';

@injectable
class ConversationsBloc extends Bloc<ConversationsEvent, ConversationsState> {
  final ConversationsClient _conversationsClient;

  ConversationsBloc(this._conversationsClient)
    : super(const ConversationsState.initial()) {
    on<LoadConversations>(_onLoadConversations);
    on<StartCompanionMode>(_onStartCompanionMode);
    on<StartPersonaMode>(_onStartPersonaMode);
    on<EndConversation>(_onEndConversation);
  }

  Future<void> _onLoadConversations(
    LoadConversations event,
    Emitter<ConversationsState> emit,
  ) async {
    emit(const ConversationsState.loading());
    try {
      final conversations = await _conversationsClient
          .conversationsControllerFindAll();
      emit(ConversationsState.loaded(conversations: conversations));
    } catch (e) {
      emit(ConversationsState.error(e.toString()));
    }
  }

  /// Start Companion mode for elderly users (per VOICE_UI_FLOW.md)
  Future<void> _onStartCompanionMode(
    StartCompanionMode event,
    Emitter<ConversationsState> emit,
  ) async {
    emit(const ConversationsState.startingSession());
    try {
      final response = await _conversationsClient
          .conversationsControllerStartConversation(
            body: const StartConversationRequest(
              mode: ConversationMode.companion,
            ),
          );
      emit(
        ConversationsState.sessionStarted(
          conversationId: response.conversationId,
          conversationToken: response.conversationToken,
          dynamicVariables: response.dynamicVariables,
        ),
      );
    } catch (e) {
      emit(ConversationsState.error(e.toString()));
    }
  }

  /// Start Persona mode for family members (per VOICE_UI_FLOW.md)
  Future<void> _onStartPersonaMode(
    StartPersonaMode event,
    Emitter<ConversationsState> emit,
  ) async {
    emit(const ConversationsState.startingSession());
    try {
      final response = await _conversationsClient
          .conversationsControllerStartConversation(
            body: StartConversationRequest(
              mode: ConversationMode.persona,
              elderlyUserId: event.elderlyUserId,
            ),
          );
      emit(
        ConversationsState.sessionStarted(
          conversationId: response.conversationId,
          conversationToken: response.conversationToken,
          dynamicVariables: response.dynamicVariables,
        ),
      );
    } catch (e) {
      emit(ConversationsState.error(e.toString()));
    }
  }

  Future<void> _onEndConversation(
    EndConversation event,
    Emitter<ConversationsState> emit,
  ) async {
    try {
      await _conversationsClient.conversationsControllerEndConversation(
        id: event.id,
      );
      add(const ConversationsEvent.loadConversations());
    } catch (e) {
      emit(ConversationsState.error(e.toString()));
    }
  }
}
