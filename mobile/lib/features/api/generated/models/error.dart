// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'error_detail.dart';

part 'error.g.dart';

@JsonSerializable()
class Error {
  const Error({
    required this.status,
    required this.message,
    required this.errors,
  });
  
  factory Error.fromJson(Map<String, Object?> json) => _$ErrorFromJson(json);
  
  /// HTTP status code
  final num status;

  /// Human readable error description
  final String message;

  /// Array of detailed errors
  final List<ErrorDetail> errors;

  Map<String, Object?> toJson() => _$ErrorToJson(this);
}
