import 'package:flutter/material.dart';

abstract final class AppColors {
  // Primary palette
  static const Color primary = Color(0xFF1B2A4A);
  static const Color primaryLight = Color(0xFF2D3E5F);
  static const Color primaryDark = Color(0xFF0F1A2E);

  // Accent palette
  static const Color accent = Color(0xFFD4A853);
  static const Color accentLight = Color(0xFFF0DEB4);
  static const Color accentDark = Color(0xFFB8923F);

  // Background & Surface
  static const Color background = Color(0xFFFBF8F3);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceVariant = Color(0xFFF2EDE6);

  // Text
  static const Color textPrimary = Color(0xFF2C2C2C);
  static const Color textSecondary = Color(0xFF6B6560);
  static const Color textOnPrimary = Color(0xFFFFFFFF);
  static const Color textOnAccent = Color(0xFF1B2A4A);

  // Semantic
  static const Color success = Color(0xFF4A9B6E);
  static const Color error = Color(0xFFC75050);
  static const Color warning = Color(0xFFE5A84B);
  static const Color info = Color(0xFF5B8DB8);

  // Divider & Border
  static const Color divider = Color(0xFFE8E2DA);
  static const Color border = Color(0xFFD9D3CB);
  static const Color borderLight = Color(0xFFEDE8E1);

  // Overlay
  static const Color overlay = Color(0x801B2A4A);
  static const Color shimmerBase = Color(0xFFE8E2DA);
  static const Color shimmerHighlight = Color(0xFFF5F1EB);
}
