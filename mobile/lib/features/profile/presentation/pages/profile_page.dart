import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/di/injection.dart';
import '../../../auth/presentation/bloc/auth_bloc.dart';
import '../../../auth/presentation/bloc/auth_event.dart';
import '../bloc/profile_bloc.dart';
import '../bloc/profile_event.dart';
import '../bloc/profile_state.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<ProfileBloc>()..add(const ProfileEvent.loadProfile()),
      child: const _ProfileContent(),
    );
  }
}

class _ProfileContent extends StatelessWidget {
  const _ProfileContent();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          'Profile',
          style: AppTypography.headlineMedium,
        ),
      ),
      body: BlocBuilder<ProfileBloc, ProfileState>(
        builder: (context, state) {
          return state.maybeWhen(
            loaded: (
              displayName,
              email,
              photoUrl,
              conversationsCount,
              storiesCount,
              voiceQualityTier,
              voiceSamplesCount,
            ) =>
                _buildContent(
              context,
              displayName: displayName,
              email: email,
              photoUrl: photoUrl,
              conversationsCount: conversationsCount,
              storiesCount: storiesCount,
              voiceQualityTier: voiceQualityTier,
              voiceSamplesCount: voiceSamplesCount,
            ),
            loading: () => const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
              ),
            ),
            orElse: () => const SizedBox.shrink(),
          );
        },
      ),
    );
  }

  Widget _buildContent(
    BuildContext context, {
    required String displayName,
    required String email,
    String? photoUrl,
    required int conversationsCount,
    required int storiesCount,
    required String voiceQualityTier,
    required int voiceSamplesCount,
  }) {
    return SingleChildScrollView(
      padding: AppSpacing.paddingAllMd,
      child: Column(
        children: [
          _buildProfileHeader(displayName, email, photoUrl),
          AppSpacing.verticalLg,
          _buildVoiceProfileCard(voiceQualityTier, voiceSamplesCount),
          AppSpacing.verticalMd,
          _buildStatsCard(conversationsCount, storiesCount),
          AppSpacing.verticalXl,
          _buildSignOutButton(context),
        ],
      ),
    );
  }

  Widget _buildProfileHeader(String name, String email, String? photoUrl) {
    return AppCard(
      child: Row(
        children: [
          AppAvatar(
            name: name,
            imageUrl: photoUrl,
            size: 72,
          ),
          AppSpacing.horizontalMd,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: AppTypography.titleLarge,
                ),
                AppSpacing.verticalXxs,
                Text(
                  email,
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVoiceProfileCard(String qualityTier, int samplesCount) {
    final tierColor = switch (qualityTier) {
      'excellent' => AppColors.success,
      'good' => AppColors.accent,
      'basic' => AppColors.warning,
      _ => AppColors.textSecondary,
    };

    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(AppSpacing.sm),
                decoration: BoxDecoration(
                  color: AppColors.accentLight,
                  borderRadius: AppRadius.borderRadiusMd,
                ),
                child: const Icon(
                  Icons.record_voice_over,
                  color: AppColors.accent,
                ),
              ),
              AppSpacing.horizontalMd,
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Voice Profile',
                      style: AppTypography.titleSmall,
                    ),
                    AppSpacing.verticalXxs,
                    Text(
                      '$samplesCount audio samples',
                      style: AppTypography.bodySmall,
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.sm,
                  vertical: AppSpacing.xxs,
                ),
                decoration: BoxDecoration(
                  color: tierColor.withValues(alpha: 0.1),
                  borderRadius: AppRadius.borderRadiusSm,
                ),
                child: Text(
                  qualityTier.toUpperCase(),
                  style: AppTypography.labelSmall.copyWith(
                    color: tierColor,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          AppSpacing.verticalMd,
          ClipRRect(
            borderRadius: AppRadius.borderRadiusSm,
            child: LinearProgressIndicator(
              value: samplesCount / 10,
              backgroundColor: AppColors.surfaceVariant,
              valueColor: AlwaysStoppedAnimation<Color>(tierColor),
              minHeight: 8,
            ),
          ),
          AppSpacing.verticalXs,
          Text(
            'More conversations improve voice quality',
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatsCard(int conversations, int stories) {
    return AppCard(
      child: Row(
        children: [
          Expanded(
            child: _buildStatItem(
              icon: Icons.chat_bubble_outline,
              value: conversations.toString(),
              label: 'Conversations',
            ),
          ),
          Container(
            width: 1,
            height: 48,
            color: AppColors.divider,
          ),
          Expanded(
            child: _buildStatItem(
              icon: Icons.auto_stories_outlined,
              value: stories.toString(),
              label: 'Stories',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem({
    required IconData icon,
    required String value,
    required String label,
  }) {
    return Column(
      children: [
        Icon(icon, color: AppColors.accent, size: 24),
        AppSpacing.verticalXs,
        Text(
          value,
          style: AppTypography.headlineSmall.copyWith(
            color: AppColors.primary,
          ),
        ),
        Text(
          label,
          style: AppTypography.bodySmall,
        ),
      ],
    );
  }

  Widget _buildSignOutButton(BuildContext context) {
    return AppButton(
      onPressed: () {
        context.read<AuthBloc>().add(const AuthEvent.signOut());
      },
      label: 'Sign Out',
      variant: AppButtonVariant.secondary,
      isExpanded: true,
    );
  }
}
