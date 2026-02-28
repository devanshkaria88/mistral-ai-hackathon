import 'package:dio/dio.dart';
import '../../features/auth/data/datasources/auth_local_data_source.dart';
import '../../features/auth/data/datasources/auth_remote_data_source.dart';

typedef OnTokenRefreshFailed = void Function();

class AuthInterceptor extends Interceptor {
  final AuthLocalDataSource _localDataSource;
  final AuthRemoteDataSource _remoteDataSource;
  final OnTokenRefreshFailed? onTokenRefreshFailed;

  AuthInterceptor(
    this._localDataSource,
    this._remoteDataSource, {
    this.onTokenRefreshFailed,
  });

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final accessToken = await _localDataSource.getAccessToken();
    if (accessToken != null && accessToken.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $accessToken';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      try {
        final refreshToken = await _localDataSource.getRefreshToken();
        if (refreshToken == null) {
          onTokenRefreshFailed?.call();
          handler.next(err);
          return;
        }

        final response = await _remoteDataSource.refreshToken(refreshToken);
        await _localDataSource.saveTokens(
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        );

        final retryOptions = err.requestOptions;
        retryOptions.headers['Authorization'] =
            'Bearer ${response.accessToken}';

        final dio = Dio();
        final retryResponse = await dio.fetch(retryOptions);
        handler.resolve(retryResponse);
        return;
      } catch (e) {
        onTokenRefreshFailed?.call();
      }
    }
    handler.next(err);
  }
}
