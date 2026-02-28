// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'create_invite.g.dart';

@JsonSerializable()
class CreateInvite {
  const CreateInvite({
    required this.elderlyUserId,
  });
  
  factory CreateInvite.fromJson(Map<String, Object?> json) => _$CreateInviteFromJson(json);
  
  /// User ID of the elderly person to create invite for
  final String elderlyUserId;

  Map<String, Object?> toJson() => _$CreateInviteToJson(this);
}
