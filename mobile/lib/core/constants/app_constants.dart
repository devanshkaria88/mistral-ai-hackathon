abstract final class AppConstants {
  static const String appName = 'Resurrect';
  static const String tagline = 'Bring loved ones back to life';

  // API
  static const String apiBaseUrl = 'http://localhost:3000/api';

  static const Duration tokenRefreshThreshold = Duration(minutes: 5);
  static const Duration httpTimeout = Duration(seconds: 30);

  static const int defaultPageSize = 20;
}
