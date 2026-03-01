import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile_event.freezed.dart';

@freezed
abstract class ProfileEvent with _$ProfileEvent {
  const factory ProfileEvent.loadProfile() = LoadProfile;
  const factory ProfileEvent.signOut() = ProfileSignOut;
  const factory ProfileEvent.deleteAudioSample(String sampleKey) =
      DeleteAudioSample;
}
