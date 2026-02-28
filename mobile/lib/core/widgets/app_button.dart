import 'package:flutter/material.dart';
import '../theme/theme.dart';

enum AppButtonVariant { primary, secondary, text }

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.onPressed,
    required this.label,
    this.variant = AppButtonVariant.primary,
    this.isLoading = false,
    this.isExpanded = false,
    this.icon,
    this.enabled = true,
  });

  final VoidCallback? onPressed;
  final String label;
  final AppButtonVariant variant;
  final bool isLoading;
  final bool isExpanded;
  final IconData? icon;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final child = _buildChild();

    Widget button = switch (variant) {
      AppButtonVariant.primary => ElevatedButton(
          onPressed: _effectiveOnPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.accent,
            foregroundColor: AppColors.textOnAccent,
            disabledBackgroundColor: AppColors.accent.withValues(alpha: 0.5),
            disabledForegroundColor: AppColors.textOnAccent.withValues(alpha: 0.7),
          ),
          child: child,
        ),
      AppButtonVariant.secondary => OutlinedButton(
          onPressed: _effectiveOnPressed,
          child: child,
        ),
      AppButtonVariant.text => TextButton(
          onPressed: _effectiveOnPressed,
          child: child,
        ),
    };

    if (isExpanded) {
      button = SizedBox(
        width: double.infinity,
        child: button,
      );
    }

    return button;
  }

  VoidCallback? get _effectiveOnPressed {
    if (!enabled || isLoading) return null;
    return onPressed;
  }

  Widget _buildChild() {
    if (isLoading) {
      return SizedBox(
        height: 20,
        width: 20,
        child: CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(
            variant == AppButtonVariant.primary
                ? AppColors.textOnAccent
                : AppColors.accent,
          ),
        ),
      );
    }

    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 20),
          AppSpacing.horizontalXs,
          Text(label),
        ],
      );
    }

    return Text(label);
  }
}
