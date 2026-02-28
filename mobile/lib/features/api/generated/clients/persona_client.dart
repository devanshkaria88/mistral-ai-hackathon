// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../models/ask_persona.dart';
import '../models/persona.dart';
import '../models/persona_message.dart';

part 'persona_client.g.dart';

@RestApi()
abstract class PersonaClient {
  factory PersonaClient(Dio dio, {String? baseUrl}) = _PersonaClient;

  /// Ask a question to the elderly persona
  @POST('/api/persona/ask')
  Future<Persona> personaControllerAskPersona({
    @Body() required AskPersona body,
  });

  /// Get conversation history with persona.
  ///
  /// [elderlyUserId] - User ID of the elderly person.
  @GET('/api/persona/history')
  Future<List<PersonaMessage>> personaControllerGetHistory({
    @Query('elderlyUserId') required String elderlyUserId,
  });
}
