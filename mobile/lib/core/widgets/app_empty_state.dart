import 'package:flutter/material.dart';
import '../theme/theme.dart';
import 'app_button.dart';

class AppEmptyState extends StatelessWidget {
  const AppEmptyState({
    super.key,
    required this.message,
    this.title,
    this.icon,
    this.actionLabel,
    this.onAction,
  });

  final String message;
  final String? title;
  final IconData? icon;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: AppSpacing.paddingAllLg,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon ?? Icons.inbox_outlined,
                size: 56,
                color: AppColors.textSecondary,
              ),
            ),
            AppSpacing.verticalLg,
            if (title != null) ...[
              Text(
                title!,
                style: AppTypography.headlineSmall,
                textAlign: TextAlign.center,
              ),
              AppSpacing.verticalXs,
            ],
            Text(
              message,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.textSecondary,
              ),
              textAlign: TextAlign.center,
            ),
            if (actionLabel != null && onAction != null) ...[
              AppSpacing.verticalLg,
              AppButton(
                onPressed: onAction,
                label: actionLabel!,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
