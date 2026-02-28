abstract final class AppConstants {
  static const String appName = 'MemoryVault';
  static const String tagline = 'Every life is worth remembering';
  
  static const Duration tokenRefreshThreshold = Duration(minutes: 5);
  static const Duration httpTimeout = Duration(seconds: 30);
  
  static const int defaultPageSize = 20;
}
