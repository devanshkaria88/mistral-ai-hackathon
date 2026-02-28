import 'package:freezed_annotation/freezed_annotation.dart';

part 'persona_state.freezed.dart';

@freezed
abstract class PersonaState with _$PersonaState {
  const factory PersonaState.initial() = PersonaInitial;
  const factory PersonaState.loading() = PersonaLoading;
  const factory PersonaState.loaded({required List<dynamic> messages}) =
      PersonaLoaded;
  const factory PersonaState.asking() = PersonaAsking;
  const factory PersonaState.error(String message) = PersonaError;
}
