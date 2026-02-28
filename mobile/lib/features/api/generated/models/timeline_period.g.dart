// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'timeline_period.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TimelinePeriod _$TimelinePeriodFromJson(Map<String, dynamic> json) =>
    TimelinePeriod(
      period: json['period'] as String,
      stories: (json['stories'] as List<dynamic>)
          .map((e) => Story.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$TimelinePeriodToJson(TimelinePeriod instance) =>
    <String, dynamic>{'period': instance.period, 'stories': instance.stories};
