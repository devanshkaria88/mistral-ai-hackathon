import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile_state.freezed.dart';

@freezed
abstract class ProfileState with _$ProfileState {
  const factory ProfileState.initial() = ProfileInitial;
  const factory ProfileState.loading() = ProfileLoading;
  const factory ProfileState.loaded({
    required String displayName,
    required String email,
    String? photoUrl,
    required int conversationsCount,
    required int storiesCount,
    required String voiceQualityTier,
    required int voiceSamplesCount,
  }) = ProfileLoaded;
  const factory ProfileState.error(String message) = ProfileError;
}
