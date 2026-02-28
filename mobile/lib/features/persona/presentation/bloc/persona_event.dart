import 'package:freezed_annotation/freezed_annotation.dart';

part 'persona_event.freezed.dart';

@freezed
abstract class PersonaEvent with _$PersonaEvent {
  const factory PersonaEvent.loadHistory(String elderlyUserId) =
      LoadPersonaHistory;
  const factory PersonaEvent.askQuestion({
    required String elderlyUserId,
    required String question,
  }) = AskPersonaQuestion;
}
