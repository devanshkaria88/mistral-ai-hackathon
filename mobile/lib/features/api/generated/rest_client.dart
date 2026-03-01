// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';

import 'clients/auth_client.dart';
import 'clients/conversations_client.dart';
import 'clients/stories_client.dart';
import 'clients/persona_client.dart';
import 'clients/family_client.dart';
import 'clients/voice_client.dart';

/// Resurrect API `v1.0`.
///
/// API for preserving and sharing family memories through AI-powered conversations.
class RestClient {
  RestClient(Dio dio, {String? baseUrl}) : _dio = dio, _baseUrl = baseUrl;

  final Dio _dio;
  final String? _baseUrl;

  static String get version => '1.0';

  AuthClient? _auth;
  ConversationsClient? _conversations;
  StoriesClient? _stories;
  PersonaClient? _persona;
  FamilyClient? _family;
  VoiceClient? _voice;

  AuthClient get auth => _auth ??= AuthClient(_dio, baseUrl: _baseUrl);

  ConversationsClient get conversations =>
      _conversations ??= ConversationsClient(_dio, baseUrl: _baseUrl);

  StoriesClient get stories =>
      _stories ??= StoriesClient(_dio, baseUrl: _baseUrl);

  PersonaClient get persona =>
      _persona ??= PersonaClient(_dio, baseUrl: _baseUrl);

  FamilyClient get family => _family ??= FamilyClient(_dio, baseUrl: _baseUrl);

  VoiceClient get voice => _voice ??= VoiceClient(_dio, baseUrl: _baseUrl);
}
