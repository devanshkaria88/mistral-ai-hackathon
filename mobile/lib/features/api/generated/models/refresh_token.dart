// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'refresh_token.g.dart';

@JsonSerializable()
class RefreshToken {
  const RefreshToken({
    required this.refreshToken,
  });
  
  factory RefreshToken.fromJson(Map<String, Object?> json) => _$RefreshTokenFromJson(json);
  
  /// Refresh token for obtaining new access token
  final String refreshToken;

  Map<String, Object?> toJson() => _$RefreshTokenToJson(this);
}
