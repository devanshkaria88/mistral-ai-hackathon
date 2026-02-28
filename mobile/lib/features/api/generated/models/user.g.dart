// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
  id: json['id'] as String,
  email: json['email'] as String,
  displayName: json['displayName'] as String,
  role: UserRole.fromJson(json['role'] as String),
  photoUrl: json['photoUrl'] as String?,
);

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
  'id': instance.id,
  'email': instance.email,
  'displayName': instance.displayName,
  'photoUrl': instance.photoUrl,
  'role': _$UserRoleEnumMap[instance.role]!,
};

const _$UserRoleEnumMap = {
  UserRole.elderly: 'elderly',
  UserRole.familyMember: 'family_member',
  UserRole.$unknown: r'$unknown',
};
