import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/router/routes.dart';
import '../../../../core/di/injection.dart';
import '../bloc/conversations_bloc.dart';
import '../bloc/conversations_event.dart';
import '../bloc/conversations_state.dart';

class ConversationsListPage extends StatelessWidget {
  const ConversationsListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<ConversationsBloc>()
        ..add(const ConversationsEvent.loadConversations()),
      child: const _ConversationsListContent(),
    );
  }
}

class _ConversationsListContent extends StatelessWidget {
  const _ConversationsListContent();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          'Conversations',
          style: AppTypography.headlineMedium,
        ),
      ),
      body: BlocConsumer<ConversationsBloc, ConversationsState>(
        listener: (context, state) {
          state.maybeWhen(
            sessionStarted: (conversationId, sessionUrl) {
              context.push(
                '${Routes.conversationSessionPath(conversationId)}?sessionUrl=$sessionUrl',
              );
            },
            error: (message) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(message)),
              );
            },
            orElse: () {},
          );
        },
        builder: (context, state) {
          return Column(
            children: [
              _buildStartButton(context, state),
              Expanded(child: _buildConversationsList(context, state)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildStartButton(BuildContext context, ConversationsState state) {
    final isStarting = state.maybeWhen(
      startingSession: () => true,
      orElse: () => false,
    );

    return Padding(
      padding: AppSpacing.paddingAllMd,
      child: AppButton(
        onPressed: () {
          context.read<ConversationsBloc>().add(
                const ConversationsEvent.startConversation(),
              );
        },
        label: 'Start New Conversation',
        icon: Icons.mic,
        isLoading: isStarting,
        isExpanded: true,
      ),
    );
  }

  Widget _buildConversationsList(
    BuildContext context,
    ConversationsState state,
  ) {
    return state.maybeWhen(
      loading: () => _buildLoadingState(),
      loaded: (conversations) {
        if (conversations.isEmpty) {
          return _buildEmptyState();
        }
        return _buildList(context, conversations);
      },
      orElse: () => _buildEmptyState(),
    );
  }

  Widget _buildLoadingState() {
    return ListView.separated(
      padding: AppSpacing.paddingAllMd,
      itemCount: 3,
      separatorBuilder: (_, __) => AppSpacing.verticalMd,
      itemBuilder: (_, __) => const AppConversationCardSkeleton(),
    );
  }

  Widget _buildEmptyState() {
    return const AppEmptyState(
      icon: Icons.chat_bubble_outline,
      title: 'No conversations yet',
      message: 'Start your first conversation to begin preserving memories',
    );
  }

  Widget _buildList(BuildContext context, List<dynamic> conversations) {
    return ListView.separated(
      padding: AppSpacing.paddingHorizontalMd,
      itemCount: conversations.length,
      separatorBuilder: (_, __) => AppSpacing.verticalMd,
      itemBuilder: (context, index) {
        return AppCard(
          onTap: () {
            context.push(Routes.conversationDetailPath('conv-$index'));
          },
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: AppColors.accentLight,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.chat_bubble,
                  color: AppColors.accent,
                ),
              ),
              AppSpacing.horizontalMd,
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Conversation ${index + 1}',
                      style: AppTypography.titleSmall,
                    ),
                    AppSpacing.verticalXxs,
                    Text(
                      'Feb 28, 2026 • 3 stories',
                      style: AppTypography.bodySmall,
                    ),
                  ],
                ),
              ),
              _buildStatusChip('Processed'),
            ],
          ),
        );
      },
    );
  }

  Widget _buildStatusChip(String status) {
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
}
