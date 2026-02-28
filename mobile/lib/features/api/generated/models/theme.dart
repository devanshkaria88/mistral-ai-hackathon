// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'theme.g.dart';

@JsonSerializable()
class Theme {
  const Theme({
    required this.id,
    required this.name,
    required this.slug,
  });
  
  factory Theme.fromJson(Map<String, Object?> json) => _$ThemeFromJson(json);
  
  /// Unique identifier for the theme
  final String id;

  /// Display name of the theme
  final String name;

  /// URL-friendly slug
  final String slug;

  Map<String, Object?> toJson() => _$ThemeToJson(this);
}
