import '../entities/user.dart';
import '../entities/auth_tokens.dart';

abstract class AuthRepository {
  Future<(User, AuthTokens)> signInWithGoogle(String idToken);
  Future<AuthTokens> refreshToken(String refreshToken);
  Future<User> getCurrentUser();
  Future<void> signOut();
  Future<bool> hasValidToken();
  Future<String?> getAccessToken();
  Future<String?> getRefreshToken();
}
