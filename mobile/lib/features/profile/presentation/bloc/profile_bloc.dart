import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'profile_event.dart';
import 'profile_state.dart';

@injectable
class ProfileBloc extends Bloc<ProfileEvent, ProfileState> {
  ProfileBloc() : super(const ProfileState.initial()) {
    on<LoadProfile>(_onLoadProfile);
    on<ProfileSignOut>(_onSignOut);
  }

  Future<void> _onLoadProfile(
    LoadProfile event,
    Emitter<ProfileState> emit,
  ) async {
    emit(const ProfileState.loading());
    // TODO: Implement with real data source
    emit(const ProfileState.loaded(
      displayName: 'Margaret Smith',
      email: 'margaret@example.com',
      conversationsCount: 5,
      storiesCount: 12,
      voiceQualityTier: 'good',
      voiceSamplesCount: 8,
    ));
  }

  Future<void> _onSignOut(
    ProfileSignOut event,
    Emitter<ProfileState> emit,
  ) async {
    // Sign out is handled by AuthBloc
  }
}
