import 'package:injectable/injectable.dart';
import '../../domain/entities/user.dart';
import '../../domain/entities/auth_tokens.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_data_source.dart';
import '../datasources/auth_local_data_source.dart';
import '../datasources/firebase_auth_data_source.dart';

@LazySingleton(as: AuthRepository)
class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource _remoteDataSource;
  final AuthLocalDataSource _localDataSource;
  final FirebaseAuthDataSource _firebaseDataSource;

  AuthRepositoryImpl(
    this._remoteDataSource,
    this._localDataSource,
    this._firebaseDataSource,
  );

  @override
  Future<(User, AuthTokens)> signInWithGoogle(String idToken) async {
    final response = await _remoteDataSource.signInWithGoogle(idToken);
    
    await _localDataSource.saveTokens(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    );

    return (
      response.user.toEntity(),
      AuthTokens(
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      ),
    );
  }

  @override
  Future<AuthTokens> refreshToken(String refreshToken) async {
    final response = await _remoteDataSource.refreshToken(refreshToken);
    
    await _localDataSource.saveTokens(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    );

    return AuthTokens(
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    );
  }

  @override
  Future<User> getCurrentUser() async {
    final userModel = await _remoteDataSource.getCurrentUser();
    return userModel.toEntity();
  }

  @override
  Future<void> signOut() async {
    await _firebaseDataSource.signOut();
    await _localDataSource.clearTokens();
  }

  @override
  Future<bool> hasValidToken() async {
    return _localDataSource.hasTokens();
  }

  @override
  Future<String?> getAccessToken() async {
    return _localDataSource.getAccessToken();
  }

  @override
  Future<String?> getRefreshToken() async {
    return _localDataSource.getRefreshToken();
  }
}
