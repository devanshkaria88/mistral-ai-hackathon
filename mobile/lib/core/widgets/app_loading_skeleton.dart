import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import '../theme/theme.dart';

class AppLoadingSkeleton extends StatelessWidget {
  const AppLoadingSkeleton({
    super.key,
    this.width,
    this.height = 16,
    this.borderRadius,
  });

  final double? width;
  final double height;
  final BorderRadius? borderRadius;

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
      baseColor: AppColors.shimmerBase,
      highlightColor: AppColors.shimmerHighlight,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: AppColors.shimmerBase,
          borderRadius: borderRadius ?? AppRadius.borderRadiusSm,
        ),
      ),
    );
  }
}

class AppStoryCardSkeleton extends StatelessWidget {
  const AppStoryCardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: AppSpacing.paddingAllMd,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderRadiusLg,
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.06),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Shimmer.fromColors(
        baseColor: AppColors.shimmerBase,
        highlightColor: AppColors.shimmerHighlight,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              height: 20,
              decoration: BoxDecoration(
                color: AppColors.shimmerBase,
                borderRadius: AppRadius.borderRadiusSm,
              ),
            ),
            AppSpacing.verticalSm,
            Container(
              width: double.infinity,
              height: 14,
              decoration: BoxDecoration(
                color: AppColors.shimmerBase,
                borderRadius: AppRadius.borderRadiusSm,
              ),
            ),
            AppSpacing.verticalXs,
            Container(
              width: 200,
              height: 14,
              decoration: BoxDecoration(
                color: AppColors.shimmerBase,
                borderRadius: AppRadius.borderRadiusSm,
              ),
            ),
            AppSpacing.verticalMd,
            Row(
              children: [
                Container(
                  width: 60,
                  height: 24,
                  decoration: BoxDecoration(
                    color: AppColors.shimmerBase,
                    borderRadius: AppRadius.borderRadiusSm,
                  ),
                ),
                AppSpacing.horizontalXs,
                Container(
                  width: 80,
                  height: 24,
                  decoration: BoxDecoration(
                    color: AppColors.shimmerBase,
                    borderRadius: AppRadius.borderRadiusSm,
                  ),
                ),
              ],
            ),
            AppSpacing.verticalSm,
            Container(
              width: 100,
              height: 12,
              decoration: BoxDecoration(
                color: AppColors.shimmerBase,
                borderRadius: AppRadius.borderRadiusSm,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class AppConversationCardSkeleton extends StatelessWidget {
  const AppConversationCardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: AppSpacing.paddingAllMd,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderRadiusLg,
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.06),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Shimmer.fromColors(
        baseColor: AppColors.shimmerBase,
        highlightColor: AppColors.shimmerHighlight,
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: const BoxDecoration(
                color: AppColors.shimmerBase,
                shape: BoxShape.circle,
              ),
            ),
            AppSpacing.horizontalMd,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 150,
                    height: 16,
                    decoration: BoxDecoration(
                      color: AppColors.shimmerBase,
                      borderRadius: AppRadius.borderRadiusSm,
                    ),
                  ),
                  AppSpacing.verticalXs,
                  Container(
                    width: 100,
                    height: 12,
                    decoration: BoxDecoration(
                      color: AppColors.shimmerBase,
                      borderRadius: AppRadius.borderRadiusSm,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: 60,
              height: 24,
              decoration: BoxDecoration(
                color: AppColors.shimmerBase,
                borderRadius: AppRadius.borderRadiusSm,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
