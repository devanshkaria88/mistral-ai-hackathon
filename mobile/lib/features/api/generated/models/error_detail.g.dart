// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'error_detail.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ErrorDetail _$ErrorDetailFromJson(Map<String, dynamic> json) => ErrorDetail(
  message: json['message'] as String,
  field: json['field'] as String?,
);

Map<String, dynamic> _$ErrorDetailToJson(ErrorDetail instance) =>
    <String, dynamic>{'field': instance.field, 'message': instance.message};
