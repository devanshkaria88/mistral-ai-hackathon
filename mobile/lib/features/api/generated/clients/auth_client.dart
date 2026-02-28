// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../models/auth.dart';
import '../models/google_auth.dart';
import '../models/refresh_token.dart';
import '../models/token.dart';
import '../models/user.dart';

part 'auth_client.g.dart';

@RestApi()
abstract class AuthClient {
  factory AuthClient(Dio dio, {String? baseUrl}) = _AuthClient;

  /// Authenticate with Google via Firebase ID token
  @POST('/api/auth/google')
  Future<Auth> authControllerGoogleAuth({
    @Body() required GoogleAuth body,
  });

  /// Refresh access token using refresh token
  @POST('/api/auth/refresh')
  Future<Token> authControllerRefreshToken({
    @Body() required RefreshToken body,
  });

  /// Get current user profile
  @GET('/api/auth/me')
  Future<User> authControllerGetMe();
}
