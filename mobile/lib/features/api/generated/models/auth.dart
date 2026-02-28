// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'user.dart';

part 'auth.g.dart';

@JsonSerializable()
class Auth {
  const Auth({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
  });
  
  factory Auth.fromJson(Map<String, Object?> json) => _$AuthFromJson(json);
  
  /// JWT access token (15 minute expiry)
  final String accessToken;

  /// Refresh token (7 day expiry)
  final String refreshToken;

  /// User profile information
  final User user;

  Map<String, Object?> toJson() => _$AuthToJson(this);
}
