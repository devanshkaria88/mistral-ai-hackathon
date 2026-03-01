import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile_state.freezed.dart';

class AudioSample {
  final String key;
  final double durationSeconds;
  final int timestamp;
  final String? playbackUrl;

  AudioSample({
    required this.key,
    required this.durationSeconds,
    required this.timestamp,
    this.playbackUrl,
  });

  factory AudioSample.fromJson(Map<String, dynamic> json) {
    return AudioSample(
      key: json['key'] as String,
      durationSeconds: (json['durationSeconds'] as num).toDouble(),
      timestamp: json['timestamp'] as int,
      playbackUrl: json['playbackUrl'] as String?,
    );
  }
}

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
    required List<AudioSample> audioSamples,
  }) = ProfileLoaded;
  const factory ProfileState.error(String message) = ProfileError;
}
