// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../models/create_invite.dart';
import '../models/invite.dart';
import '../models/vault.dart';

part 'family_client.g.dart';

@RestApi()
abstract class FamilyClient {
  factory FamilyClient(Dio dio, {String? baseUrl}) = _FamilyClient;

  /// Create an invite link for family members
  @POST('/api/family/invite')
  Future<Invite> familyControllerCreateInvite({
    @Body() required CreateInvite body,
  });

  /// Get the elderly user's vault (for family members).
  ///
  /// [elderlyUserId] - Elderly user ID.
  @GET('/api/family/vault/{elderlyUserId}')
  Future<Vault> familyControllerGetVault({
    @Path('elderlyUserId') required String elderlyUserId,
  });
}
