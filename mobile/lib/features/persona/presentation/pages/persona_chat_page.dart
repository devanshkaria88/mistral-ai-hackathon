import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/di/injection.dart';
import '../bloc/persona_bloc.dart';
import '../bloc/persona_event.dart';
import '../bloc/persona_state.dart';

class PersonaChatPage extends StatelessWidget {
  const PersonaChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<PersonaBloc>()
        ..add(const PersonaEvent.loadHistory('mock-elderly-id')),
      child: const _PersonaChatContent(),
    );
  }
}

class _PersonaChatContent extends StatefulWidget {
  const _PersonaChatContent();

  @override
  State<_PersonaChatContent> createState() => _PersonaChatContentState();
}

class _PersonaChatContentState extends State<_PersonaChatContent> {
  final _textController = TextEditingController();
  final _scrollController = ScrollController();

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _sendMessage() {
    final text = _textController.text.trim();
    if (text.isEmpty) return;

    context.read<PersonaBloc>().add(
          PersonaEvent.askQuestion(
            elderlyUserId: 'mock-elderly-id',
            question: text,
          ),
        );
    _textController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          'Talk to Margaret',
          style: AppTypography.headlineMedium,
        ),
      ),
      body: Column(
        children: [
          _buildDisclaimer(),
          Expanded(child: _buildMessageList()),
          _buildInputArea(),
        ],
      ),
    );
  }

  Widget _buildDisclaimer() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      color: AppColors.accentLight.withValues(alpha: 0.5),
      child: Row(
        children: [
          const Icon(
            Icons.info_outline,
            size: 16,
            color: AppColors.textSecondary,
          ),
          AppSpacing.horizontalXs,
          Expanded(
            child: Text(
              'Responses are based on Margaret\'s recorded stories',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageList() {
    return BlocBuilder<PersonaBloc, PersonaState>(
      builder: (context, state) {
        return state.maybeWhen(
          loaded: (messages) {
            if (messages.isEmpty) {
              return _buildEmptyState();
            }
            return ListView.builder(
              controller: _scrollController,
              padding: AppSpacing.paddingAllMd,
              itemCount: messages.length,
              itemBuilder: (context, index) {
                return _buildMessageBubble(index);
              },
            );
          },
          asking: () => Stack(
            children: [
              _buildEmptyState(),
              const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
                ),
              ),
            ],
          ),
          orElse: () => _buildEmptyState(),
        );
      },
    );
  }

  Widget _buildEmptyState() {
    return const AppEmptyState(
      icon: Icons.chat_outlined,
      title: 'Ask a question',
      message: 'Ask a question to hear Margaret\'s story in her own voice',
    );
  }

  Widget _buildMessageBubble(int index) {
    final isUser = index % 2 == 0;
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: Row(
        mainAxisAlignment:
            isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!isUser) ...[
            const AppAvatar(
              name: 'Margaret',
              size: 36,
            ),
            AppSpacing.horizontalSm,
          ],
          Flexible(
            child: Container(
              padding: AppSpacing.paddingAllMd,
              decoration: BoxDecoration(
                color: isUser ? AppColors.primary : AppColors.surface,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(AppRadius.lg),
                  topRight: const Radius.circular(AppRadius.lg),
                  bottomLeft: Radius.circular(isUser ? AppRadius.lg : 4),
                  bottomRight: Radius.circular(isUser ? 4 : AppRadius.lg),
                ),
                boxShadow: isUser
                    ? null
                    : [
                        BoxShadow(
                          color: AppColors.primary.withValues(alpha: 0.06),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    isUser
                        ? 'What was your wedding day like?'
                        : 'Oh, it was a beautiful spring day in 1952...',
                    style: AppTypography.bodyMedium.copyWith(
                      color: isUser
                          ? AppColors.textOnPrimary
                          : AppColors.textPrimary,
                    ),
                  ),
                  if (!isUser) ...[
                    AppSpacing.verticalSm,
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          onPressed: () {},
                          icon: const Icon(Icons.play_circle_outline),
                          iconSize: 20,
                          color: AppColors.accent,
                          padding: EdgeInsets.zero,
                          constraints: const BoxConstraints(),
                        ),
                        AppSpacing.horizontalXs,
                        Text(
                          'Play in Margaret\'s voice',
                          style: AppTypography.labelSmall.copyWith(
                            color: AppColors.accent,
                          ),
                        ),
                      ],
                    ),
                    AppSpacing.verticalXs,
                    Text(
                      'Based on story from March 2024',
                      style: AppTypography.bodySmall.copyWith(
                        color: AppColors.textSecondary,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          if (isUser) AppSpacing.horizontalSm,
        ],
      ),
    );
  }

  Widget _buildInputArea() {
    return Container(
      padding: EdgeInsets.only(
        left: AppSpacing.md,
        right: AppSpacing.md,
        top: AppSpacing.sm,
        bottom: MediaQuery.of(context).padding.bottom + AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: AppColors.surface,
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.06),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _textController,
              decoration: InputDecoration(
                hintText: 'Ask Margaret a question...',
                border: OutlineInputBorder(
                  borderRadius: AppRadius.borderRadiusMd,
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: AppColors.surfaceVariant,
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.md,
                  vertical: AppSpacing.sm,
                ),
              ),
              textInputAction: TextInputAction.send,
              onSubmitted: (_) => _sendMessage(),
            ),
          ),
          AppSpacing.horizontalSm,
          IconButton(
            onPressed: _sendMessage,
            icon: const Icon(Icons.send_rounded),
            color: AppColors.accent,
            style: IconButton.styleFrom(
              backgroundColor: AppColors.accentLight,
            ),
          ),
        ],
      ),
    );
  }
}
