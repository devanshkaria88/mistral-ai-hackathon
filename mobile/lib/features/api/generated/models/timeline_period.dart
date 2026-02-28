// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'story.dart';

part 'timeline_period.g.dart';

@JsonSerializable()
class TimelinePeriod {
  const TimelinePeriod({
    required this.period,
    required this.stories,
  });
  
  factory TimelinePeriod.fromJson(Map<String, Object?> json) => _$TimelinePeriodFromJson(json);
  
  /// Time period label
  final String period;

  /// Stories from this time period
  final List<Story> stories;

  Map<String, Object?> toJson() => _$TimelinePeriodToJson(this);
}
