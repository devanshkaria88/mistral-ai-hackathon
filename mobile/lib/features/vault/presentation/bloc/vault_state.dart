import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../api/generated/models/story.dart';
import '../../../api/generated/models/timeline.dart';

part 'vault_state.freezed.dart';

@freezed
abstract class VaultState with _$VaultState {
  const factory VaultState.initial() = VaultInitial;
  const factory VaultState.loading() = VaultLoading;
  const factory VaultState.loaded({
    required List<Story> stories,
    String? selectedTheme,
    String? searchQuery,
  }) = VaultLoaded;
  const factory VaultState.timelineLoaded({required Timeline timeline}) =
      VaultTimelineLoaded;
  const factory VaultState.error(String message) = VaultError;
}
