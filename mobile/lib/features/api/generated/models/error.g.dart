// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'error.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Error _$ErrorFromJson(Map<String, dynamic> json) => Error(
  status: json['status'] as num,
  message: json['message'] as String,
  errors: (json['errors'] as List<dynamic>)
      .map((e) => ErrorDetail.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$ErrorToJson(Error instance) => <String, dynamic>{
  'status': instance.status,
  'message': instance.message,
  'errors': instance.errors,
};
