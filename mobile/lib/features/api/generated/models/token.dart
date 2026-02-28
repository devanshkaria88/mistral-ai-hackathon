// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'token.g.dart';

@JsonSerializable()
class Token {
  const Token({
    required this.accessToken,
    required this.refreshToken,
  });
  
  factory Token.fromJson(Map<String, Object?> json) => _$TokenFromJson(json);
  
  /// JWT access token (15 minute expiry)
  final String accessToken;

  /// Refresh token (7 day expiry)
  final String refreshToken;

  Map<String, Object?> toJson() => _$TokenToJson(this);
}
