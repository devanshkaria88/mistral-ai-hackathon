import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:google_sign_in/google_sign_in.dart';
import 'package:injectable/injectable.dart';
import '../../../../core/error/exceptions.dart';

abstract class FirebaseAuthDataSource {
  Future<String> signInWithGoogle();
  Future<void> signOut();
}

@LazySingleton(as: FirebaseAuthDataSource)
class FirebaseAuthDataSourceImpl implements FirebaseAuthDataSource {
  final firebase.FirebaseAuth _firebaseAuth;
  final GoogleSignIn _googleSignIn;

  FirebaseAuthDataSourceImpl(this._firebaseAuth, this._googleSignIn);

  @override
  Future<String> signInWithGoogle() async {
    try {
      final googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        throw const AuthException('Google sign in was cancelled');
      }

      final googleAuth = await googleUser.authentication;
      final credential = firebase.GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential =
          await _firebaseAuth.signInWithCredential(credential);
      final idToken = await userCredential.user?.getIdToken();

      if (idToken == null) {
        throw const AuthException('Failed to get Firebase ID token');
      }

      return idToken;
    } on firebase.FirebaseAuthException catch (e) {
      throw AuthException(e.message ?? 'Firebase authentication failed');
    }
  }

  @override
  Future<void> signOut() async {
    await Future.wait([
      _firebaseAuth.signOut(),
      _googleSignIn.signOut(),
    ]);
  }
}
