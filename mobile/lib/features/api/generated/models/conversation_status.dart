// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

/// Current status of the conversation
@JsonEnum()
enum ConversationStatus {
  @JsonValue('active')
  active('active'),
  @JsonValue('ended')
  ended('ended'),
  @JsonValue('processing')
  processing('processing'),
  @JsonValue('processed')
  processed('processed'),
  @JsonValue('failed')
  failed('failed'),
  /// Default value for all unparsed values, allows backward compatibility when adding new values on the backend.
  $unknown(null);

  const ConversationStatus(this.json);

  factory ConversationStatus.fromJson(String json) => values.firstWhere(
        (e) => e.json == json,
        orElse: () => $unknown,
      );

  final String? json;

  @override
  String toString() => json?.toString() ?? super.toString();
  /// Returns all defined enum values excluding the $unknown value.
  static List<ConversationStatus> get $valuesDefined => values.where((value) => value != $unknown).toList();
}
