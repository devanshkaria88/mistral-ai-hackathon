// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'invite.g.dart';

@JsonSerializable()
class Invite {
  const Invite({
    required this.inviteCode,
    required this.inviteLink,
  });
  
  factory Invite.fromJson(Map<String, Object?> json) => _$InviteFromJson(json);
  
  /// Invite code for joining the family group
  final String inviteCode;

  /// Full invite link
  final String inviteLink;

  Map<String, Object?> toJson() => _$InviteToJson(this);
}
