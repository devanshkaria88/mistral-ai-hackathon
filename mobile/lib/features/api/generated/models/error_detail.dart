// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'error_detail.g.dart';

@JsonSerializable()
class ErrorDetail {
  const ErrorDetail({
    required this.message,
    this.field,
  });
  
  factory ErrorDetail.fromJson(Map<String, Object?> json) => _$ErrorDetailFromJson(json);
  
  /// Field name that caused the error
  final String? field;

  /// Error message
  final String message;

  Map<String, Object?> toJson() => _$ErrorDetailToJson(this);
}
