import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/router/routes.dart';
import '../../../../core/di/injection.dart';
import '../bloc/vault_bloc.dart';
import '../bloc/vault_event.dart';
import '../bloc/vault_state.dart';

class VaultPage extends StatelessWidget {
  const VaultPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<VaultBloc>()..add(const VaultEvent.loadStories()),
      child: const _VaultPageContent(),
    );
  }
}

class _VaultPageContent extends StatelessWidget {
  const _VaultPageContent();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          'Story Vault',
          style: AppTypography.headlineMedium,
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // TODO: Open search
            },
          ),
        ],
      ),
      body: Column(
        children: [
          _buildThemeFilters(),
          Expanded(child: _buildStoryList()),
        ],
      ),
    );
  }

  Widget _buildThemeFilters() {
    final themes = ['All', 'Childhood', 'Love', 'Work', 'War', 'Faith', 'Lessons'];
    
    return Container(
      height: 48,
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: AppSpacing.paddingHorizontalMd,
        itemCount: themes.length,
        separatorBuilder: (_, __) => AppSpacing.horizontalXs,
        itemBuilder: (context, index) {
          final isSelected = index == 0;
          return FilterChip(
            label: Text(themes[index]),
            selected: isSelected,
            onSelected: (_) {
              // TODO: Filter by theme
            },
            backgroundColor: AppColors.surface,
            selectedColor: AppColors.accentLight,
            labelStyle: AppTypography.labelMedium.copyWith(
              color: isSelected ? AppColors.primary : AppColors.textSecondary,
            ),
          );
        },
      ),
    );
  }

  Widget _buildStoryList() {
    return BlocBuilder<VaultBloc, VaultState>(
      builder: (context, state) {
        return state.when(
          initial: () => const SizedBox.shrink(),
          loading: () => _buildLoadingState(),
          loaded: (stories, _) {
            if (stories.isEmpty) {
              return _buildEmptyState(context);
            }
            return _buildStoriesList(stories);
          },
          error: (message) => Center(
            child: Text(message, style: AppTypography.bodyMedium),
          ),
        );
      },
    );
  }

  Widget _buildLoadingState() {
    return ListView.separated(
      padding: AppSpacing.paddingAllMd,
      itemCount: 5,
      separatorBuilder: (_, __) => AppSpacing.verticalMd,
      itemBuilder: (_, __) => const AppStoryCardSkeleton(),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return AppEmptyState(
      icon: Icons.auto_stories_outlined,
      title: 'No stories yet',
      message: 'Start your first conversation to begin building the vault',
      actionLabel: 'Start Conversation',
      onAction: () => context.go(Routes.conversations),
    );
  }

  Widget _buildStoriesList(List<dynamic> stories) {
    return ListView.separated(
      padding: AppSpacing.paddingAllMd,
      itemCount: stories.length,
      separatorBuilder: (_, __) => AppSpacing.verticalMd,
      itemBuilder: (context, index) {
        return AppCard(
          onTap: () {
            context.push(Routes.storyDetailPath('story-$index'));
          },
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Story Title',
                style: AppTypography.titleMedium,
              ),
              AppSpacing.verticalXs,
              Text(
                'Story preview text goes here...',
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
                    label: Text('Theme', style: AppTypography.labelSmall),
                    visualDensity: VisualDensity.compact,
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
