import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/di/injection.dart';

class StoryDetailPage extends StatefulWidget {
  final String storyId;

  const StoryDetailPage({super.key, required this.storyId});

  @override
  State<StoryDetailPage> createState() => _StoryDetailPageState();
}

class _StoryDetailPageState extends State<StoryDetailPage> {
  Map<String, dynamic>? _story;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadStory();
  }

  Future<void> _loadStory() async {
    try {
      final dio = getIt<Dio>();
      final response = await dio.get('/api/stories/${widget.storyId}');
      setState(() {
        _story = response.data as Map<String, dynamic>;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Failed to load story: $e');
      setState(() {
        _error = 'Failed to load story';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(title: const Text('Story')),
        body: const Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
          ),
        ),
      );
    }

    if (_error != null || _story == null) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(title: const Text('Story')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.error_outline,
                size: 48,
                color: AppColors.textSecondary,
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                _error ?? 'Story not found',
                style: AppTypography.bodyMedium,
              ),
              const SizedBox(height: AppSpacing.md),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _isLoading = true;
                    _error = null;
                  });
                  _loadStory();
                },
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    final title = _story!['title'] as String? ?? 'Untitled Story';
    final content = _story!['content'] as String? ?? '';
    final timePeriod = _story!['timePeriod'] as String?;
    final emotionalTone = _story!['emotionalTone'] as String?;
    final audioUrl = _story!['audioUrl'] as String?;
    final createdAt = _story!['createdAt'] as String?;
    final themes = (_story!['themes'] as List<dynamic>?) ?? [];
    final people = (_story!['people'] as List<dynamic>?) ?? [];
    final places = (_story!['places'] as List<dynamic>?) ?? [];

    String subtitle = '';
    if (timePeriod != null) subtitle = timePeriod;
    if (emotionalTone != null) {
      subtitle += subtitle.isNotEmpty ? ' • $emotionalTone' : emotionalTone;
    }

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
          IconButton(
            icon: const Icon(Icons.delete_outline),
            onPressed: () => _showDeleteConfirmation(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.paddingAllLg,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: AppTypography.headlineMedium),
            if (subtitle.isNotEmpty) ...[
              AppSpacing.verticalXs,
              Text(
                subtitle,
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
            ],
            AppSpacing.verticalLg,

            // Audio Player (if available)
            if (audioUrl != null && audioUrl.isNotEmpty)
              AppAudioPlayer(audioUrl: audioUrl),
            if (audioUrl != null && audioUrl.isNotEmpty) AppSpacing.verticalLg,

            // Story Content
            Text(content, style: AppTypography.bodyLarge.copyWith(height: 1.7)),
            AppSpacing.verticalXl,

            // Theme Tags
            if (themes.isNotEmpty) ...[
              Text('Themes', style: AppTypography.titleSmall),
              AppSpacing.verticalSm,
              Wrap(
                spacing: AppSpacing.xs,
                runSpacing: AppSpacing.xs,
                children: themes
                    .map((t) => _buildChip(t['name'] as String? ?? ''))
                    .toList(),
              ),
              AppSpacing.verticalLg,
            ],

            // People Mentioned
            if (people.isNotEmpty) ...[
              Text('People Mentioned', style: AppTypography.titleSmall),
              AppSpacing.verticalSm,
              Wrap(
                spacing: AppSpacing.xs,
                runSpacing: AppSpacing.xs,
                children: people
                    .map(
                      (p) => _buildPersonChip(
                        p['name'] as String? ?? '',
                        p['relationship'] as String? ?? '',
                      ),
                    )
                    .toList(),
              ),
              AppSpacing.verticalLg,
            ],

            // Places
            if (places.isNotEmpty) ...[
              Text('Places', style: AppTypography.titleSmall),
              AppSpacing.verticalSm,
              Wrap(
                spacing: AppSpacing.xs,
                runSpacing: AppSpacing.xs,
                children: places
                    .map((p) => _buildChip(p['name'] as String? ?? ''))
                    .toList(),
              ),
              AppSpacing.verticalXl,
            ],

            // Conversation Info
            if (createdAt != null)
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
                      'From conversation on ${_formatDate(createdAt)}',
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

  String _formatDate(String isoDate) {
    try {
      final date = DateTime.parse(isoDate);
      return DateFormat('MMM d, yyyy').format(date);
    } catch (_) {
      return isoDate;
    }
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

  Future<void> _showDeleteConfirmation(BuildContext context) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Story'),
        content: const Text(
          'Are you sure you want to delete this story? This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      await _deleteStory();
    }
  }

  Future<void> _deleteStory() async {
    try {
      final dio = getIt<Dio>();
      await dio.delete('/api/stories/${widget.storyId}');

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Story deleted'),
            backgroundColor: AppColors.success,
          ),
        );
        context.pop();
      }
    } catch (e) {
      debugPrint('Failed to delete story: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to delete story'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}
