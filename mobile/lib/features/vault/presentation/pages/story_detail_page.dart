import 'package:flutter/material.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';

class StoryDetailPage extends StatelessWidget {
  final String storyId;

  const StoryDetailPage({super.key, required this.storyId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Story'),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmark_outline),
            onPressed: () {
              // TODO: Bookmark story
            },
          ),
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {
              // TODO: Share story
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.paddingAllLg,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'The Day We First Met',
              style: AppTypography.headlineMedium,
            ),
            AppSpacing.verticalXs,
            Text(
              'March 1952 • Childhood',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            AppSpacing.verticalLg,
            
            // Audio Player
            const AppAudioPlayer(
              audioUrl: 'https://example.com/audio.mp3',
            ),
            AppSpacing.verticalLg,
            
            // Story Content
            Text(
              'This is where the full story content would appear. '
              'The story is displayed in a warm, readable format with '
              'proper typography using Merriweather for headings and Inter for body text. '
              '\n\nThe story continues with multiple paragraphs, preserving the '
              'authentic voice and memories shared during the conversation. '
              'Each story is a precious piece of family history.',
              style: AppTypography.bodyLarge.copyWith(
                height: 1.7,
              ),
            ),
            AppSpacing.verticalXl,
            
            // Theme Tags
            Text(
              'Themes',
              style: AppTypography.titleSmall,
            ),
            AppSpacing.verticalSm,
            Wrap(
              spacing: AppSpacing.xs,
              runSpacing: AppSpacing.xs,
              children: [
                _buildChip('Childhood'),
                _buildChip('Love'),
                _buildChip('Family'),
              ],
            ),
            AppSpacing.verticalLg,
            
            // People Mentioned
            Text(
              'People Mentioned',
              style: AppTypography.titleSmall,
            ),
            AppSpacing.verticalSm,
            Wrap(
              spacing: AppSpacing.xs,
              runSpacing: AppSpacing.xs,
              children: [
                _buildPersonChip('Arthur', 'Husband'),
                _buildPersonChip('Mary', 'Sister'),
              ],
            ),
            AppSpacing.verticalLg,
            
            // Places
            Text(
              'Places',
              style: AppTypography.titleSmall,
            ),
            AppSpacing.verticalSm,
            Wrap(
              spacing: AppSpacing.xs,
              runSpacing: AppSpacing.xs,
              children: [
                _buildChip('London'),
                _buildChip('Hyde Park'),
              ],
            ),
            AppSpacing.verticalXl,
            
            // Conversation Info
            AppCard(
              backgroundColor: AppColors.surfaceVariant,
              child: Row(
                children: [
                  const Icon(
                    Icons.chat_bubble_outline,
                    color: AppColors.textSecondary,
                    size: 20,
                  ),
                  AppSpacing.horizontalSm,
                  Text(
                    'From conversation on Feb 28, 2026',
                    style: AppTypography.bodySmall,
                  ),
                ],
              ),
            ),
            AppSpacing.verticalXxl,
          ],
        ),
      ),
    );
  }

  Widget _buildChip(String label) {
    return Chip(
      label: Text(label, style: AppTypography.labelSmall),
      backgroundColor: AppColors.accentLight,
      visualDensity: VisualDensity.compact,
    );
  }

  Widget _buildPersonChip(String name, String relationship) {
    return ActionChip(
      avatar: CircleAvatar(
        backgroundColor: AppColors.primary,
        radius: 12,
        child: Text(
          name[0],
          style: AppTypography.labelSmall.copyWith(
            color: AppColors.textOnPrimary,
            fontSize: 10,
          ),
        ),
      ),
      label: Text('$name ($relationship)', style: AppTypography.labelSmall),
      backgroundColor: AppColors.surface,
      onPressed: () {
        // TODO: Navigate to person's stories
      },
    );
  }
}
