// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'user_role.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  const User({
    required this.id,
    required this.email,
    required this.displayName,
    required this.role,
    this.photoUrl,
  });
  
  factory User.fromJson(Map<String, Object?> json) => _$UserFromJson(json);
  
  /// User unique identifier
  final String id;

  /// User email address
  final String email;

  /// User display name
  final String displayName;

  /// User profile photo URL
  final String? photoUrl;

  /// User role in the system
  final UserRole role;

  Map<String, Object?> toJson() => _$UserToJson(this);
}
