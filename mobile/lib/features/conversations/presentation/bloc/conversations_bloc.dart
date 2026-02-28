import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'conversations_event.dart';
import 'conversations_state.dart';

@injectable
class ConversationsBloc extends Bloc<ConversationsEvent, ConversationsState> {
  ConversationsBloc() : super(const ConversationsState.initial()) {
    on<LoadConversations>(_onLoadConversations);
    on<StartConversation>(_onStartConversation);
    on<EndConversation>(_onEndConversation);
  }

  Future<void> _onLoadConversations(
    LoadConversations event,
    Emitter<ConversationsState> emit,
  ) async {
    emit(const ConversationsState.loading());
    // TODO: Implement with real data source
    emit(const ConversationsState.loaded(conversations: []));
  }

  Future<void> _onStartConversation(
    StartConversation event,
    Emitter<ConversationsState> emit,
  ) async {
    emit(const ConversationsState.startingSession());
    // TODO: Call backend to get session URL
    // For now, emit mock data
    emit(const ConversationsState.sessionStarted(
      conversationId: 'mock-id',
      sessionUrl: 'https://elevenlabs.io/session/mock',
    ));
  }

  Future<void> _onEndConversation(
    EndConversation event,
    Emitter<ConversationsState> emit,
  ) async {
    // TODO: Call backend to end conversation
    add(const ConversationsEvent.loadConversations());
  }
}
