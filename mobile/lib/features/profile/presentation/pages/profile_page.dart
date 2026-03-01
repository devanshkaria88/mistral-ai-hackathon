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
      create: (_) =>
          getIt<ProfileBloc>()..add(const ProfileEvent.loadProfile()),
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
        title: Text('Profile', style: AppTypography.headlineMedium),
      ),
      body: BlocBuilder<ProfileBloc, ProfileState>(
        builder: (context, state) {
          return state.when(
            initial: () => const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
              ),
            ),
            loading: () => const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
              ),
            ),
            loaded:
                (
                  displayName,
                  email,
                  photoUrl,
                  conversationsCount,
                  storiesCount,
                  voiceQualityTier,
                  voiceSamplesCount,
                  audioSamples,
                ) => _buildContent(
                  context,
                  displayName: displayName,
                  email: email,
                  photoUrl: photoUrl,
                  conversationsCount: conversationsCount,
                  storiesCount: storiesCount,
                  voiceQualityTier: voiceQualityTier,
                  voiceSamplesCount: voiceSamplesCount,
                  audioSamples: audioSamples,
                ),
            error: (message) => Center(
              child: Padding(
                padding: AppSpacing.paddingAllLg,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.error_outline,
                      size: 64,
                      color: AppColors.error.withValues(alpha: 0.5),
                    ),
                    AppSpacing.verticalMd,
                    Text(
                      'Failed to load profile',
                      style: AppTypography.titleMedium,
                    ),
                    AppSpacing.verticalSm,
                    Text(
                      message,
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.textSecondary,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    AppSpacing.verticalLg,
                    AppButton(
                      onPressed: () {
                        context.read<ProfileBloc>().add(
                          const ProfileEvent.loadProfile(),
                        );
                      },
                      label: 'Retry',
                      variant: AppButtonVariant.secondary,
                    ),
                  ],
                ),
              ),
            ),
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
    required List<AudioSample> audioSamples,
  }) {
    return SingleChildScrollView(
      padding: AppSpacing.paddingAllMd,
      child: Column(
        children: [
          _buildProfileHeader(displayName, email, photoUrl),
          AppSpacing.verticalLg,
          _buildVoiceProfileCard(
            context,
            voiceQualityTier,
            voiceSamplesCount,
            audioSamples,
          ),
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
          AppAvatar(name: name, imageUrl: photoUrl, size: 72),
          AppSpacing.horizontalMd,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: AppTypography.titleLarge),
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

  Widget _buildVoiceProfileCard(
    BuildContext context,
    String qualityTier,
    int samplesCount,
    List<AudioSample> audioSamples,
  ) {
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
                    Text('Voice Profile', style: AppTypography.titleSmall),
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
          if (audioSamples.isNotEmpty) ...[
            AppSpacing.verticalMd,
            const Divider(),
            AppSpacing.verticalSm,
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Audio Samples', style: AppTypography.titleSmall),
                if (audioSamples.length > 2)
                  TextButton(
                    onPressed: () =>
                        _showAllAudioSamples(context, audioSamples),
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.zero,
                      minimumSize: Size.zero,
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                    child: Text(
                      'View All (${audioSamples.length})',
                      style: AppTypography.labelSmall.copyWith(
                        color: AppColors.accent,
                      ),
                    ),
                  ),
              ],
            ),
            AppSpacing.verticalSm,
            // Sort by timestamp descending and show only latest 2
            ..._getSortedSamples(
              audioSamples,
            ).take(2).map((sample) => _buildAudioSampleItem(context, sample)),
          ],
        ],
      ),
    );
  }

  Widget _buildAudioSampleItem(BuildContext context, AudioSample sample) {
    final date = DateTime.fromMillisecondsSinceEpoch(sample.timestamp);
    final formattedDate = '${date.day}/${date.month}/${date.year}';
    final duration = sample.durationSeconds.toStringAsFixed(1);

    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${duration}s recording',
                      style: AppTypography.bodySmall,
                    ),
                    Text(
                      formattedDate,
                      style: AppTypography.labelSmall.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                icon: const Icon(
                  Icons.play_circle_outline,
                  color: AppColors.accent,
                  size: 24,
                ),
                onPressed: sample.playbackUrl != null
                    ? () => _showAudioPlayer(context, sample)
                    : null,
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(),
              ),
              AppSpacing.horizontalXs,
              IconButton(
                icon: const Icon(
                  Icons.delete_outline,
                  color: AppColors.error,
                  size: 20,
                ),
                onPressed: () => _confirmDeleteSample(context, sample.key),
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(),
              ),
            ],
          ),
        ],
      ),
    );
  }

  List<AudioSample> _getSortedSamples(List<AudioSample> samples) {
    final sorted = List<AudioSample>.from(samples);
    sorted.sort((a, b) => b.timestamp.compareTo(a.timestamp)); // Latest first
    return sorted;
  }

  void _showAllAudioSamples(BuildContext context, List<AudioSample> samples) {
    final sortedSamples = _getSortedSamples(samples);
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (ctx) => _AllAudioSamplesPage(
          samples: sortedSamples,
          onDelete: (key) {
            context.read<ProfileBloc>().add(
              ProfileEvent.deleteAudioSample(key),
            );
            Navigator.of(ctx).pop();
          },
          onPlay: (sample) => _showAudioPlayer(ctx, sample),
        ),
      ),
    );
  }

  void _showAudioPlayer(BuildContext context, AudioSample sample) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) {
        final date = DateTime.fromMillisecondsSinceEpoch(sample.timestamp);
        final formattedDate = '${date.day}/${date.month}/${date.year}';
        return Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Audio Sample', style: AppTypography.titleMedium),
              AppSpacing.verticalXs,
              Text(
                'Recorded on $formattedDate • ${sample.durationSeconds.toStringAsFixed(1)}s',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
              AppSpacing.verticalLg,
              if (sample.playbackUrl != null)
                AppAudioPlayer(audioUrl: sample.playbackUrl!),
              AppSpacing.verticalLg,
            ],
          ),
        );
      },
    );
  }

  void _confirmDeleteSample(BuildContext context, String sampleKey) {
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Delete Audio Sample'),
        content: const Text(
          'Are you sure you want to delete this audio sample? This cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(dialogContext);
              context.read<ProfileBloc>().add(
                ProfileEvent.deleteAudioSample(sampleKey),
              );
            },
            child: const Text(
              'Delete',
              style: TextStyle(color: AppColors.error),
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
          Container(width: 1, height: 48, color: AppColors.divider),
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
          style: AppTypography.headlineSmall.copyWith(color: AppColors.primary),
        ),
        Text(label, style: AppTypography.bodySmall),
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

class _AllAudioSamplesPage extends StatelessWidget {
  final List<AudioSample> samples;
  final void Function(String key) onDelete;
  final void Function(AudioSample sample) onPlay;

  const _AllAudioSamplesPage({
    required this.samples,
    required this.onDelete,
    required this.onPlay,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('All Audio Samples')),
      body: ListView.builder(
        padding: AppSpacing.paddingAllMd,
        itemCount: samples.length,
        itemBuilder: (context, index) {
          final sample = samples[index];
          final date = DateTime.fromMillisecondsSinceEpoch(sample.timestamp);
          final formattedDate = '${date.day}/${date.month}/${date.year}';
          final duration = sample.durationSeconds.toStringAsFixed(1);

          return AppCard(
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${duration}s recording',
                        style: AppTypography.bodyMedium,
                      ),
                      AppSpacing.verticalXxs,
                      Text(
                        formattedDate,
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(
                    Icons.play_circle_outline,
                    color: AppColors.accent,
                    size: 28,
                  ),
                  onPressed: sample.playbackUrl != null
                      ? () => onPlay(sample)
                      : null,
                ),
                IconButton(
                  icon: const Icon(
                    Icons.delete_outline,
                    color: AppColors.error,
                    size: 24,
                  ),
                  onPressed: () => _confirmDelete(context, sample.key),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  void _confirmDelete(BuildContext context, String sampleKey) {
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Delete Audio Sample'),
        content: const Text(
          'Are you sure you want to delete this audio sample? This cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(dialogContext);
              onDelete(sampleKey);
            },
            child: const Text(
              'Delete',
              style: TextStyle(color: AppColors.error),
            ),
          ),
        ],
      ),
    );
  }
}
