import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/router/routes.dart';
import '../../../../core/di/injection.dart';

class ConversationDetailPage extends StatefulWidget {
  final String conversationId;

  const ConversationDetailPage({super.key, required this.conversationId});

  @override
  State<ConversationDetailPage> createState() => _ConversationDetailPageState();
}

class _ConversationDetailPageState extends State<ConversationDetailPage> {
  Map<String, dynamic>? _conversation;
  List<dynamic> _stories = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadConversation();
  }

  Future<void> _loadConversation() async {
    try {
      final dio = getIt<Dio>();
      final response = await dio.get(
        '/api/conversations/${widget.conversationId}',
      );
      final data = response.data as Map<String, dynamic>;

      setState(() {
        _conversation = data;
        _stories = (data['stories'] as List<dynamic>?) ?? [];
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Failed to load conversation: $e');
      setState(() {
        _error = 'Failed to load conversation';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(title: const Text('Conversation Details')),
        body: const Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
          ),
        ),
      );
    }

    if (_error != null || _conversation == null) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(title: const Text('Conversation Details')),
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
                _error ?? 'Conversation not found',
                style: AppTypography.bodyMedium,
              ),
              const SizedBox(height: AppSpacing.md),
              ElevatedButton(
                onPressed: () {
                  setState(() {
                    _isLoading = true;
                    _error = null;
                  });
                  _loadConversation();
                },
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Conversation Details'),
        actions: [
          IconButton(
            icon: const Icon(Icons.delete_outline),
            onPressed: () => _showDeleteConfirmation(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.paddingAllMd,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            AppSpacing.verticalLg,
            _buildRecordingSection(),
            AppSpacing.verticalLg,
            _buildStoriesSection(context),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    final createdAt = _conversation!['createdAt'] as String?;
    final status = _conversation!['status'] as String? ?? 'active';
    final durationMinutes =
        (_conversation!['durationMinutes'] as num?)?.toInt() ?? 0;

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
                      createdAt != null
                          ? _formatDate(createdAt)
                          : 'Unknown date',
                      style: AppTypography.titleMedium,
                    ),
                    AppSpacing.verticalXxs,
                    Text(
                      '${durationMinutes > 0 ? '$durationMinutes minutes' : 'Duration unknown'} • ${_stories.length} stories extracted',
                      style: AppTypography.bodySmall,
                    ),
                  ],
                ),
              ),
              _buildStatusBadge(status),
            ],
          ),
        ],
      ),
    );
  }

  String _formatDate(String isoDate) {
    try {
      final date = DateTime.parse(isoDate);
      return DateFormat('MMMM d, yyyy').format(date);
    } catch (_) {
      return isoDate;
    }
  }

  Widget _buildStatusBadge(String status) {
    final isProcessed = status == 'processed';
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xxs,
      ),
      decoration: BoxDecoration(
        color: isProcessed
            ? AppColors.success.withValues(alpha: 0.1)
            : AppColors.accent.withValues(alpha: 0.1),
        borderRadius: AppRadius.borderRadiusSm,
      ),
      child: Text(
        status.substring(0, 1).toUpperCase() + status.substring(1),
        style: AppTypography.labelSmall.copyWith(
          color: isProcessed ? AppColors.success : AppColors.accent,
        ),
      ),
    );
  }

  Widget _buildRecordingSection() {
    final recordingUrl = _conversation!['recordingUrl'] as String?;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Call Recording', style: AppTypography.titleMedium),
        AppSpacing.verticalMd,
        if (recordingUrl != null)
          AppAudioPlayer(audioUrl: recordingUrl)
        else
          AppCard(
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(AppSpacing.sm),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVariant,
                    borderRadius: AppRadius.borderRadiusMd,
                  ),
                  child: const Icon(
                    Icons.mic_off,
                    color: AppColors.textSecondary,
                  ),
                ),
                AppSpacing.horizontalMd,
                Expanded(
                  child: Text(
                    'Recording not available',
                    style: AppTypography.bodyMedium.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }

  Widget _buildStoriesSection(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Extracted Stories', style: AppTypography.titleMedium),
        AppSpacing.verticalMd,
        if (_stories.isEmpty)
          const AppEmptyState(
            icon: Icons.auto_stories_outlined,
            title: 'No stories yet',
            message:
                'Stories will appear here once the conversation is processed',
          )
        else
          ..._stories.map((story) => _buildStoryCard(context, story)),
      ],
    );
  }

  Widget _buildStoryCard(BuildContext context, Map<String, dynamic> story) {
    final id = story['id'] as String? ?? '';
    final title = story['title'] as String? ?? 'Untitled Story';
    final content = story['content'] as String? ?? '';
    final themes = (story['themes'] as List<dynamic>?) ?? [];

    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: AppCard(
        onTap: () {
          context.push(Routes.storyDetailPath(id));
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: AppTypography.titleSmall),
            AppSpacing.verticalXs,
            Text(
              content.length > 100
                  ? '${content.substring(0, 100)}...'
                  : content,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.textSecondary,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            if (themes.isNotEmpty) ...[
              AppSpacing.verticalSm,
              Wrap(
                spacing: AppSpacing.xs,
                children: themes
                    .take(3)
                    .map(
                      (t) => Chip(
                        label: Text(
                          t['name'] as String? ?? '',
                          style: AppTypography.labelSmall,
                        ),
                        visualDensity: VisualDensity.compact,
                        backgroundColor: AppColors.accentLight,
                      ),
                    )
                    .toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Future<void> _showDeleteConfirmation(BuildContext context) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Conversation'),
        content: const Text(
          'Are you sure you want to delete this conversation? This action cannot be undone.',
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
      await _deleteConversation();
    }
  }

  Future<void> _deleteConversation() async {
    try {
      final dio = getIt<Dio>();
      await dio.delete('/api/conversations/${widget.conversationId}');

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Conversation deleted'),
            backgroundColor: AppColors.success,
          ),
        );
        context.pop();
      }
    } catch (e) {
      debugPrint('Failed to delete conversation: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to delete conversation'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}
