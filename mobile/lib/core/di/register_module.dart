import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:injectable/injectable.dart';

import '../../features/api/generated/clients/auth_client.dart';
import '../../features/api/generated/clients/conversations_client.dart';
import '../../features/api/generated/clients/stories_client.dart';
import '../../features/api/generated/clients/persona_client.dart';
import '../../features/api/generated/clients/family_client.dart';
import '../../features/api/generated/clients/voice_client.dart';

@module
abstract class RegisterModule {
  @lazySingleton
  FlutterSecureStorage get secureStorage => const FlutterSecureStorage();

  @lazySingleton
  FirebaseAuth get firebaseAuth => FirebaseAuth.instance;

  @lazySingleton
  GoogleSignIn get googleSignIn => GoogleSignIn();

  // Dio is registered in NetworkModule (api_client.dart)

  @lazySingleton
  AuthClient authClient(Dio dio) => AuthClient(dio);

  @lazySingleton
  ConversationsClient conversationsClient(Dio dio) => ConversationsClient(dio);

  @lazySingleton
  StoriesClient storiesClient(Dio dio) => StoriesClient(dio);

  @lazySingleton
  PersonaClient personaClient(Dio dio) => PersonaClient(dio);

  @lazySingleton
  FamilyClient familyClient(Dio dio) => FamilyClient(dio);

  @lazySingleton
  VoiceClient voiceClient(Dio dio) => VoiceClient(dio);
}
