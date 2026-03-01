import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../../auth/data/datasources/auth_remote_data_source.dart';
import '../../../auth/domain/repositories/auth_repository.dart';
import 'profile_event.dart';
import 'profile_state.dart';

@injectable
class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  final AuthRepository _authRepository;
  final AuthRemoteDataSource _remoteDataSource;

  ProfileBloc(this._authRepository, this._remoteDataSource)
    : super(const ProfileState.initial()) {
    on<LoadProfile>(_onLoadProfile);
    on<ProfileSignOut>(_onSignOut);
    on<DeleteAudioSample>(_onDeleteAudioSample);
  }

  Future<void> _onLoadProfile(
    LoadProfile event,
    Emitter<ProfileState> emit,
  ) async {
    emit(const ProfileState.loading());
    try {
      final user = await _authRepository.getCurrentUser();

      // Fetch profile stats
      final stats = await _remoteDataSource.getProfileStats();
      final conversationsCount = stats['conversationsCount'] as int? ?? 0;
      final storiesCount = stats['storiesCount'] as int? ?? 0;

      // Fetch voice profile
      final voiceProfile = await _remoteDataSource.getVoiceProfile();
      final voiceQualityTier =
          voiceProfile?['qualityTier'] as String? ?? 'none';
      final voiceSamplesCount = voiceProfile?['samplesCount'] as int? ?? 0;

      // Parse audio samples with safe type handling
      final List<AudioSample> audioSamples = [];
      final audioSamplesRaw = voiceProfile?['audioSamples'];
      if (audioSamplesRaw is List) {
        for (final item in audioSamplesRaw) {
          if (item is Map<String, dynamic>) {
            audioSamples.add(AudioSample.fromJson(item));
          } else if (item is Map) {
            // Handle Map<dynamic, dynamic> case
            audioSamples.add(
              AudioSample.fromJson(Map<String, dynamic>.from(item)),
            );
          }
        }
      }

      emit(
        ProfileState.loaded(
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
          conversationsCount: conversationsCount,
          storiesCount: storiesCount,
          voiceQualityTier: voiceQualityTier,
          voiceSamplesCount: voiceSamplesCount,
          audioSamples: audioSamples,
        ),
      );
    } catch (e) {
      emit(ProfileState.error(e.toString()));
    }
  }

  Future<void> _onDeleteAudioSample(
    DeleteAudioSample event,
    Emitter<ProfileState> emit,
  ) async {
    try {
      await _remoteDataSource.deleteAudioSample(event.sampleKey);
      // Reload profile to get updated data
      add(const ProfileEvent.loadProfile());
    } catch (e) {
      emit(ProfileState.error(e.toString()));
    }
  }

  Future<void> _onSignOut(
    ProfileSignOut event,
    Emitter<ProfileState> emit,
  ) async {
    // Sign out is handled by AuthBloc
  }
}
