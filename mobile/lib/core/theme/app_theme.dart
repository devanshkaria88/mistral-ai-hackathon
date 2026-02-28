import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_typography.dart';
import 'app_radius.dart';
import 'app_spacing.dart';

abstract final class AppTheme {
  static ThemeData get lightTheme => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: _colorScheme,
    textTheme: AppTypography.textTheme,
    scaffoldBackgroundColor: AppColors.background,
    appBarTheme: _appBarTheme,
    cardTheme: _cardTheme,
    elevatedButtonTheme: _elevatedButtonTheme,
    outlinedButtonTheme: _outlinedButtonTheme,
    textButtonTheme: _textButtonTheme,
    inputDecorationTheme: _inputDecorationTheme,
    bottomNavigationBarTheme: _bottomNavTheme,
    dividerTheme: _dividerTheme,
    chipTheme: _chipTheme,
    floatingActionButtonTheme: _fabTheme,
    progressIndicatorTheme: _progressTheme,
    snackBarTheme: _snackBarTheme,
  );

  static ColorScheme get _colorScheme => const ColorScheme.light(
    primary: AppColors.primary,
    onPrimary: AppColors.textOnPrimary,
    secondary: AppColors.accent,
    onSecondary: AppColors.textOnAccent,
    tertiary: AppColors.accentLight,
    surface: AppColors.surface,
    onSurface: AppColors.textPrimary,
    surfaceContainerHighest: AppColors.surfaceVariant,
    error: AppColors.error,
    onError: AppColors.textOnPrimary,
    outline: AppColors.border,
    outlineVariant: AppColors.borderLight,
  );

  static AppBarTheme get _appBarTheme => AppBarTheme(
    backgroundColor: AppColors.background,
    foregroundColor: AppColors.textPrimary,
    elevation: 0,
    scrolledUnderElevation: 0,
    centerTitle: true,
    titleTextStyle: AppTypography.titleLarge,
    iconTheme: const IconThemeData(color: AppColors.primary),
  );

  static CardThemeData get _cardTheme => CardThemeData(
    color: AppColors.surface,
    elevation: 2,
    shadowColor: AppColors.primary.withValues(alpha: 0.08),
    shape: AppRadius.shapeLg,
    margin: EdgeInsets.zero,
  );

  static ElevatedButtonThemeData get _elevatedButtonTheme =>
      ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.accent,
          foregroundColor: AppColors.textOnAccent,
          elevation: 0,
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: AppSpacing.md,
          ),
          shape: AppRadius.shapeMd,
          textStyle: AppTypography.labelLarge,
        ),
      );

  static OutlinedButtonThemeData get _outlinedButtonTheme =>
      OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.primary,
          side: const BorderSide(color: AppColors.primary, width: 1.5),
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: AppSpacing.md,
          ),
          shape: AppRadius.shapeMd,
          textStyle: AppTypography.labelLarge,
        ),
      );

  static TextButtonThemeData get _textButtonTheme => TextButtonThemeData(
    style: TextButton.styleFrom(
      foregroundColor: AppColors.accent,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.xs,
      ),
      textStyle: AppTypography.labelLarge,
    ),
  );

  static InputDecorationTheme get _inputDecorationTheme => InputDecorationTheme(
    filled: true,
    fillColor: AppColors.surface,
    contentPadding: const EdgeInsets.symmetric(
      horizontal: AppSpacing.md,
      vertical: AppSpacing.md,
    ),
    border: OutlineInputBorder(
      borderRadius: AppRadius.borderRadiusMd,
      borderSide: const BorderSide(color: AppColors.border),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: AppRadius.borderRadiusMd,
      borderSide: const BorderSide(color: AppColors.border),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: AppRadius.borderRadiusMd,
      borderSide: const BorderSide(color: AppColors.accent, width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: AppRadius.borderRadiusMd,
      borderSide: const BorderSide(color: AppColors.error),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: AppRadius.borderRadiusMd,
      borderSide: const BorderSide(color: AppColors.error, width: 2),
    ),
    hintStyle: AppTypography.bodyMedium.copyWith(
      color: AppColors.textSecondary,
    ),
    labelStyle: AppTypography.bodyMedium,
    errorStyle: AppTypography.bodySmall.copyWith(color: AppColors.error),
  );

  static BottomNavigationBarThemeData get _bottomNavTheme =>
      BottomNavigationBarThemeData(
        backgroundColor: AppColors.surface,
        selectedItemColor: AppColors.accent,
        unselectedItemColor: AppColors.primary,
        selectedLabelStyle: AppTypography.labelSmall,
        unselectedLabelStyle: AppTypography.labelSmall,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      );

  static DividerThemeData get _dividerTheme =>
      const DividerThemeData(color: AppColors.divider, thickness: 1, space: 1);

  static ChipThemeData get _chipTheme => ChipThemeData(
    backgroundColor: AppColors.surfaceVariant,
    selectedColor: AppColors.accentLight,
    labelStyle: AppTypography.labelMedium,
    padding: const EdgeInsets.symmetric(
      horizontal: AppSpacing.sm,
      vertical: AppSpacing.xxs,
    ),
    shape: AppRadius.shapeSm,
    side: BorderSide.none,
  );

  static FloatingActionButtonThemeData get _fabTheme =>
      const FloatingActionButtonThemeData(
        backgroundColor: AppColors.accent,
        foregroundColor: AppColors.textOnAccent,
        elevation: 4,
        shape: CircleBorder(),
      );

  static ProgressIndicatorThemeData get _progressTheme =>
      const ProgressIndicatorThemeData(
        color: AppColors.accent,
        linearTrackColor: AppColors.surfaceVariant,
        circularTrackColor: AppColors.surfaceVariant,
      );

  static SnackBarThemeData get _snackBarTheme => SnackBarThemeData(
    backgroundColor: AppColors.primary,
    contentTextStyle: AppTypography.bodyMedium.copyWith(
      color: AppColors.textOnPrimary,
    ),
    shape: AppRadius.shapeMd,
    behavior: SnackBarBehavior.floating,
  );
}
