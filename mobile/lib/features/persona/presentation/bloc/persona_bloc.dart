import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'persona_event.dart';
import 'persona_state.dart';

@injectable
class PersonaBloc extends Bloc<PersonaEvent, PersonaState> {
  PersonaBloc() : super(const PersonaState.initial()) {
    on<LoadPersonaHistory>(_onLoadHistory);
    on<AskPersonaQuestion>(_onAskQuestion);
  }

  Future<void> _onLoadHistory(
    LoadPersonaHistory event,
    Emitter<PersonaState> emit,
  ) async {
    emit(const PersonaState.loading());
    // TODO: Implement with real data source
    emit(const PersonaState.loaded(messages: []));
  }

  Future<void> _onAskQuestion(
    AskPersonaQuestion event,
    Emitter<PersonaState> emit,
  ) async {
    emit(const PersonaState.asking());
    // TODO: Call persona API
    await Future.delayed(const Duration(seconds: 1));
    emit(const PersonaState.loaded(messages: []));
  }
}
