import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:logger/logger.dart';
import 'api_endpoints.dart';
import '../constants/app_constants.dart';
import '../di/injection.dart';
import '../../features/auth/data/datasources/auth_local_data_source.dart';
import '../../features/auth/data/datasources/auth_remote_data_source.dart';
import 'auth_interceptor.dart';

@module
abstract class NetworkModule {
  @lazySingleton
  Dio get dio {
    final dio = Dio(
      BaseOptions(
        baseUrl: ApiEndpoints.baseUrl,
        connectTimeout: AppConstants.httpTimeout,
        receiveTimeout: AppConstants.httpTimeout,
        sendTimeout: AppConstants.httpTimeout,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        logPrint: (obj) => Logger().d(obj),
      ),
    );

    return dio;
  }
}

/// Callback type for when token refresh fails
typedef OnTokenRefreshFailed = void Function();

/// Global callback for token refresh failure - set this in main.dart
OnTokenRefreshFailed? onTokenRefreshFailedCallback;

/// Adds the AuthInterceptor to Dio after all dependencies are ready.
/// Call this after configureDependencies() in main.dart
void setupAuthInterceptor() {
  final dio = getIt<Dio>();
  final localDataSource = getIt<AuthLocalDataSource>();
  final remoteDataSource = getIt<AuthRemoteDataSource>();

  // Use full AuthInterceptor with token refresh support
  dio.interceptors.insert(
    0,
    AuthInterceptor(
      localDataSource,
      remoteDataSource,
      onTokenRefreshFailed: onTokenRefreshFailedCallback,
    ),
  );
}
