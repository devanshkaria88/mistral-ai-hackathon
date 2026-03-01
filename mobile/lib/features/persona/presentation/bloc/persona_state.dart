import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../api/generated/models/persona_message.dart';

part 'persona_state.freezed.dart';

@freezed
abstract class PersonaState with _$PersonaState {
  const factory PersonaState.initial() = PersonaInitial;
  const factory PersonaState.loading() = PersonaLoading;
  const factory PersonaState.loaded({required List<PersonaMessage> messages}) =
      PersonaLoaded;
  const factory PersonaState.asking() = PersonaAsking;
  const factory PersonaState.error(String message) = PersonaError;
}
