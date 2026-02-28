// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'update_clone.g.dart';

@JsonSerializable()
class UpdateClone {
  const UpdateClone({
    required this.status,
    required this.samplesCount,
  });
  
  factory UpdateClone.fromJson(Map<String, Object?> json) => _$UpdateCloneFromJson(json);
  
  /// Current status of the voice clone update
  final String status;

  /// Number of samples being used
  final num samplesCount;

  Map<String, Object?> toJson() => _$UpdateCloneToJson(this);
}
