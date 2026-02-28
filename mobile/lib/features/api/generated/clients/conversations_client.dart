// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../models/conversation.dart';
import '../models/end_conversation.dart';
import '../models/start_conversation.dart';

part 'conversations_client.g.dart';

@RestApi()
abstract class ConversationsClient {
  factory ConversationsClient(Dio dio, {String? baseUrl}) = _ConversationsClient;

  /// Start a new conversation session.
  ///
  /// For voice-first UI: Companion mode for elderly users, Persona mode for family members talking to elderly persona.
  @POST('/api/conversations')
  Future<StartConversation> conversationsControllerStartConversation({
    @Body() required StartConversation body,
  });

  /// List all conversations for the current user
  @GET('/api/conversations')
  Future<List<Conversation>> conversationsControllerFindAll();

  /// End a conversation and trigger processing.
  ///
  /// [id] - Conversation ID.
  @POST('/api/conversations/{id}/end')
  Future<EndConversation> conversationsControllerEndConversation({
    @Path('id') required String id,
  });

  /// Get a single conversation with extracted stories.
  ///
  /// [id] - Conversation ID.
  @GET('/api/conversations/{id}')
  Future<Conversation> conversationsControllerFindOne({
    @Path('id') required String id,
  });
}
