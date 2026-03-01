// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:json_annotation/json_annotation.dart';

part 'update_elevenlabs_id_request.g.dart';

@JsonSerializable()
class UpdateElevenLabsIdRequest {
  const UpdateElevenLabsIdRequest({
    required this.elevenLabsConversationId,
  });

  factory UpdateElevenLabsIdRequest.fromJson(Map<String, Object?> json) =>
      _$UpdateElevenLabsIdRequestFromJson(json);

  /// The ElevenLabs conversation ID returned when the session connects
  final String elevenLabsConversationId;

  Map<String, Object?> toJson() => _$UpdateElevenLabsIdRequestToJson(this);
}
