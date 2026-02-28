// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'place.g.dart';

@JsonSerializable()
class Place {
  const Place({
    required this.id,
    required this.name,
    this.description,
    this.latitude,
    this.longitude,
  });
  
  factory Place.fromJson(Map<String, Object?> json) => _$PlaceFromJson(json);
  
  /// Unique identifier for the place
  final String id;

  /// Name of the place
  final String name;

  /// Description of the place
  final String? description;

  /// Latitude coordinate
  final num? latitude;

  /// Longitude coordinate
  final num? longitude;

  Map<String, Object?> toJson() => _$PlaceToJson(this);
}
