// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'person.g.dart';

@JsonSerializable()
class Person {
  const Person({
    required this.id,
    required this.name,
    this.relationship,
  });
  
  factory Person.fromJson(Map<String, Object?> json) => _$PersonFromJson(json);
  
  /// Unique identifier for the person
  final String id;

  /// Name of the person
  final String name;

  /// Relationship to the elderly person
  final String? relationship;

  Map<String, Object?> toJson() => _$PersonToJson(this);
}
