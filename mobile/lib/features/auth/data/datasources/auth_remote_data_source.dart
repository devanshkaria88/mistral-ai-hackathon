import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import '../../../../core/network/api_endpoints.dart';
import '../../../../core/error/exceptions.dart';
import '../models/user_model.dart';
import '../models/auth_response_model.dart';

abstract class AuthRemoteDataSource {
  Future<AuthResponseModel> signInWithGoogle(String idToken);
  Future<TokenRefreshResponseModel> refreshToken(String refreshToken);
  Future<UserModel> getCurrentUser();
}

@LazySingleton(as: AuthRemoteDataSource)
class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final Dio _dio;

  AuthRemoteDataSourceImpl(this._dio);

  @override
  Future<AuthResponseModel> signInWithGoogle(String idToken) async {
    try {
      final response = await _dio.post(
        ApiEndpoints.authGoogle,
        data: {'idToken': idToken},
      );
      return AuthResponseModel.fromJson(response.data);
    } on DioException catch (e) {
      throw ServerException(
        e.response?.data?['message'] ?? 'Sign in failed',
        statusCode: e.response?.statusCode,
      );
    }
  }

  @override
  Future<TokenRefreshResponseModel> refreshToken(String refreshToken) async {
    try {
      final response = await _dio.post(
        ApiEndpoints.authRefresh,
        data: {'refreshToken': refreshToken},
      );
      return TokenRefreshResponseModel.fromJson(response.data);
    } on DioException catch (e) {
      throw AuthException(
        e.response?.data?['message'] ?? 'Token refresh failed',
      );
    }
  }

  @override
  Future<UserModel> getCurrentUser() async {
    try {
      final response = await _dio.get(ApiEndpoints.authMe);
      return UserModel.fromJson(response.data);
    } on DioException catch (e) {
      throw ServerException(
        e.response?.data?['message'] ?? 'Failed to get user',
        statusCode: e.response?.statusCode,
      );
    }
  }
}
