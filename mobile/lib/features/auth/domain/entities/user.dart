import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';

enum UserRole { elderly, familyMember }

@freezed
abstract class User with _$User {
  const factory User({
    required String id,
    required String email,
    required String displayName,
    String? photoUrl,
    required UserRole role,
  }) = _User;
}
