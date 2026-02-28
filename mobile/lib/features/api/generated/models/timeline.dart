// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

import 'timeline_period.dart';

part 'timeline.g.dart';

@JsonSerializable()
class Timeline {
  const Timeline({
    required this.timeline,
  });
  
  factory Timeline.fromJson(Map<String, Object?> json) => _$TimelineFromJson(json);
  
  /// Stories grouped by time period
  final List<TimelinePeriod> timeline;

  Map<String, Object?> toJson() => _$TimelineToJson(this);
}
