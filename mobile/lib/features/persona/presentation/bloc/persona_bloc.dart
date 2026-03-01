import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../../api/generated/clients/persona_client.dart';
import '../../../api/generated/models/ask_persona.dart';
import 'persona_event.dart';
import 'persona_state.dart';

@injectable
class PersonaBloc extends Bloc<PersonaEvent, PersonaState> {
  final PersonaClient _personaClient;

  PersonaBloc(this._personaClient) : super(const PersonaState.initial()) {
    on<LoadPersonaHistory>(_onLoadHistory);
    on<AskPersonaQuestion>(_onAskQuestion);
  }

  Future<void> _onLoadHistory(
    LoadPersonaHistory event,
    Emitter<PersonaState> emit,
  ) async {
    emit(const PersonaState.loading());
    try {
      final messages = await _personaClient.personaControllerGetHistory(
        elderlyUserId: event.elderlyUserId,
      );
      emit(PersonaState.loaded(messages: messages));
    } catch (e) {
      emit(PersonaState.error(e.toString()));
    }
  }

  Future<void> _onAskQuestion(
    AskPersonaQuestion event,
    Emitter<PersonaState> emit,
  ) async {
    emit(const PersonaState.asking());
    try {
      await _personaClient.personaControllerAskPersona(
        body: AskPersona(
          elderlyUserId: event.elderlyUserId,
          question: event.question,
        ),
      );
      // Reload history to get the new message
      final messages = await _personaClient.personaControllerGetHistory(
        elderlyUserId: event.elderlyUserId,
      );
      emit(PersonaState.loaded(messages: messages));
    } catch (e) {
      emit(PersonaState.error(e.toString()));
    }
  }
}
