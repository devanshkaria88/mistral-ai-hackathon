// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'timeline.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Timeline _$TimelineFromJson(Map<String, dynamic> json) => Timeline(
  timeline: (json['timeline'] as List<dynamic>)
      .map((e) => TimelinePeriod.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$TimelineToJson(Timeline instance) => <String, dynamic>{
  'timeline': instance.timeline,
};
