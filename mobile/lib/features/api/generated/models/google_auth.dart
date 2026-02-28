// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'google_auth.g.dart';

@JsonSerializable()
class GoogleAuth {
  const GoogleAuth({
    required this.idToken,
  });
  
  factory GoogleAuth.fromJson(Map<String, Object?> json) => _$GoogleAuthFromJson(json);
  
  /// Firebase ID token from Google Sign-In
  final String idToken;

  Map<String, Object?> toJson() => _$GoogleAuthToJson(this);
}
