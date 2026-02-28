// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'bookmark.g.dart';

@JsonSerializable()
class Bookmark {
  const Bookmark({
    required this.bookmarked,
  });
  
  factory Bookmark.fromJson(Map<String, Object?> json) => _$BookmarkFromJson(json);
  
  /// Whether the story is now bookmarked
  final bool bookmarked;

  Map<String, Object?> toJson() => _$BookmarkToJson(this);
}
