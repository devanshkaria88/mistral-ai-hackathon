// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../models/update_clone.dart';
import '../models/voice_profile.dart';

part 'voice_client.g.dart';

@RestApi()
abstract class VoiceClient {
  factory VoiceClient(Dio dio, {String? baseUrl}) = _VoiceClient;

  /// Get current voice profile status
  @GET('/api/voice/profile')
  Future<VoiceProfile> voiceControllerGetProfile();

  /// Trigger voice clone update with latest samples
  @POST('/api/voice/update-clone')
  Future<UpdateClone> voiceControllerUpdateClone();
}
