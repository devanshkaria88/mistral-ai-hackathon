import 'package:freezed_annotation/freezed_annotation.dart';

part 'vault_state.freezed.dart';

@freezed
abstract class VaultState with _$VaultState {
  const factory VaultState.initial() = VaultInitial;
  const factory VaultState.loading() = VaultLoading;
  const factory VaultState.loaded({
    required List<dynamic> stories,
    String? selectedTheme,
  }) = VaultLoaded;
  const factory VaultState.error(String message) = VaultError;
}
