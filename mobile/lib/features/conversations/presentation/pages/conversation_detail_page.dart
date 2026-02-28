import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/router/routes.dart';

class ConversationDetailPage extends StatelessWidget {
  final String conversationId;

  const ConversationDetailPage({super.key, required this.conversationId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Conversation Details'),
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.paddingAllMd,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            AppSpacing.verticalLg,
            _buildStoriesSection(context),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: AppColors.accentLight,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.chat_bubble,
                  color: AppColors.accent,
                  size: 28,
                ),
              ),
              AppSpacing.horizontalMd,
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'February 28, 2026',
                      style: AppTypography.titleMedium,
                    ),
                    AppSpacing.verticalXxs,
                    Text(
                      '15 minutes • 3 stories extracted',
                      style: AppTypography.bodySmall,
                    ),
                  ],
                ),
              ),
              _buildStatusBadge('Processed'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xxs,
      ),
      decoration: BoxDecoration(
        color: AppColors.success.withValues(alpha: 0.1),
        borderRadius: AppRadius.borderRadiusSm,
      ),
      child: Text(
        status,
        style: AppTypography.labelSmall.copyWith(
          color: AppColors.success,
        ),
      ),
    );
  }

  Widget _buildStoriesSection(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Extracted Stories',
          style: AppTypography.titleMedium,
        ),
        AppSpacing.verticalMd,
        // Mock stories
        ...List.generate(3, (index) => _buildStoryCard(context, index)),
      ],
    );
  }

  Widget _buildStoryCard(BuildContext context, int index) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: AppCard(
        onTap: () {
          context.push(Routes.storyDetailPath('story-$index'));
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Story Title ${index + 1}',
              style: AppTypography.titleSmall,
            ),
            AppSpacing.verticalXs,
            Text(
              'A brief preview of the story content that was extracted from this conversation...',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.textSecondary,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            AppSpacing.verticalSm,
            Wrap(
              spacing: AppSpacing.xs,
              children: [
                Chip(
                  label: Text('Childhood', style: AppTypography.labelSmall),
                  visualDensity: VisualDensity.compact,
                  backgroundColor: AppColors.accentLight,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
