import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/router/routes.dart';
import '../../../../core/router/app_router.dart';
import '../../../../core/theme/theme.dart';
import '../../../auth/domain/entities/user.dart';
import '../../../auth/presentation/bloc/auth_bloc.dart';
import '../../../auth/presentation/bloc/auth_state.dart';
import '../../../conversations/presentation/bloc/conversations_bloc.dart';
import '../../../conversations/presentation/bloc/conversations_event.dart';
import '../../../conversations/presentation/bloc/conversations_state.dart';

/// Voice-first home screen that auto-selects mode based on user role.
///
/// Per VOICE_UI_FLOW.md:
/// - Elderly users → Auto-start Companion mode
/// - Family users → Show option to talk to elderly relative
class VoiceHomePage extends StatefulWidget {
  const VoiceHomePage({super.key});

  @override
  State<VoiceHomePage> createState() => _VoiceHomePageState();
}

class _VoiceHomePageState extends State<VoiceHomePage> {
  @override
  void initState() {
    super.initState();
    _checkUserRoleAndAutoStart();
  }

  void _checkUserRoleAndAutoStart() {
    final authState = context.read<AuthBloc>().state;
    authState.maybeWhen(
      authenticated: (user) {
        // Per VOICE_UI_FLOW.md: Elderly users auto-start Companion mode
        if (user.role == UserRole.elderly) {
          _startCompanionMode();
        }
      },
      orElse: () {},
    );
  }

  void _startCompanionMode() {
    context.read<ConversationsBloc>().add(
      const ConversationsEvent.startCompanionMode(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<ConversationsBloc, ConversationsState>(
      listener: (context, state) {
        state.maybeWhen(
          sessionStarted:
              (conversationId, conversationToken, dynamicVariables) {
                context.push(
                  Routes.conversationSessionPath(conversationId),
                  extra: ConversationSessionData(
                    conversationToken: conversationToken,
                    dynamicVariables: {
                      'user_name': dynamicVariables.userName,
                      'context_block': dynamicVariables.contextBlock,
                      'stories_summary': dynamicVariables.storiesSummary,
                      'exploration_suggestions':
                          dynamicVariables.explorationSuggestions,
                    },
                  ),
                );
              },
          error: (message) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(message), backgroundColor: Colors.red),
            );
          },
          orElse: () {},
        );
      },
      builder: (context, conversationsState) {
        return BlocBuilder<AuthBloc, AuthState>(
          builder: (context, authState) {
            return authState.maybeWhen(
              authenticated: (user) =>
                  _buildAuthenticatedView(user, conversationsState),
              orElse: () => _buildLoadingView(),
            );
          },
        );
      },
    );
  }

  Widget _buildLoadingView() {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: const Center(
        child: CircularProgressIndicator(color: AppColors.primary),
      ),
    );
  }

  Widget _buildAuthenticatedView(
    User user,
    ConversationsState conversationsState,
  ) {
    final isElderly = user.role == UserRole.elderly;
    final isStarting = conversationsState.maybeWhen(
      startingSession: () => true,
      orElse: () => false,
    );

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: AppSpacing.paddingAllLg,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Welcome message
              Text(
                'Hello, ${user.displayName.split(' ').first}!',
                style: AppTypography.headlineLarge.copyWith(
                  color: AppColors.primary,
                ),
                textAlign: TextAlign.center,
              ),
              AppSpacing.verticalLg,

              // Voice indicator
              _buildVoiceIndicator(isStarting),
              AppSpacing.verticalXl,

              // Mode-specific content
              if (isElderly)
                _buildElderlyView(isStarting)
              else
                _buildFamilyView(isStarting),

              const Spacer(),

              // Navigation hint
              Text(
                isElderly
                    ? 'Tap to start talking with Evie'
                    : 'Say "Talk to [name]" or tap below',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              AppSpacing.verticalMd,
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildVoiceIndicator(bool isActive) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      width: isActive ? 160 : 140,
      height: isActive ? 160 : 140,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: isActive
            ? AppColors.success.withValues(alpha: 0.3)
            : AppColors.primary.withValues(alpha: 0.1),
        border: Border.all(
          color: isActive ? AppColors.success : AppColors.primary,
          width: 3,
        ),
      ),
      child: Center(
        child: Icon(
          isActive ? Icons.mic : Icons.mic_none,
          size: 64,
          color: isActive ? AppColors.success : AppColors.primary,
        ),
      ),
    );
  }

  Widget _buildElderlyView(bool isStarting) {
    return Column(
      children: [
        Text(
          isStarting ? 'Connecting to Evie...' : 'Ready to share your stories?',
          style: AppTypography.headlineSmall.copyWith(
            color: AppColors.textPrimary,
          ),
          textAlign: TextAlign.center,
        ),
        AppSpacing.verticalLg,
        _buildActionButton(
          label: isStarting ? 'Connecting...' : 'Start Conversation',
          onPressed: isStarting ? null : _startCompanionMode,
          isLoading: isStarting,
        ),
      ],
    );
  }

  Widget _buildFamilyView(bool isStarting) {
    return Column(
      children: [
        Text(
          'Who would you like to talk to?',
          style: AppTypography.headlineSmall.copyWith(
            color: AppColors.textPrimary,
          ),
          textAlign: TextAlign.center,
        ),
        AppSpacing.verticalLg,
        _buildActionButton(
          label: 'Talk to Family Member',
          onPressed: isStarting ? null : () => context.push('/family'),
          icon: Icons.family_restroom,
        ),
        AppSpacing.verticalMd,
        _buildActionButton(
          label: 'Browse Stories',
          onPressed: () => context.go('/vault'),
          variant: _ButtonVariant.secondary,
          icon: Icons.auto_stories,
        ),
      ],
    );
  }

  Widget _buildActionButton({
    required String label,
    required VoidCallback? onPressed,
    bool isLoading = false,
    IconData? icon,
    _ButtonVariant variant = _ButtonVariant.primary,
  }) {
    final isPrimary = variant == _ButtonVariant.primary;

    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: isPrimary ? AppColors.primary : AppColors.surface,
          foregroundColor: isPrimary ? Colors.white : AppColors.primary,
          elevation: isPrimary ? 2 : 0,
          side: isPrimary ? null : BorderSide(color: AppColors.primary),
          shape: RoundedRectangleBorder(borderRadius: AppRadius.borderRadiusMd),
        ),
        child: isLoading
            ? const SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: Colors.white,
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (icon != null) ...[
                    Icon(icon, size: 24),
                    AppSpacing.horizontalSm,
                  ],
                  Text(label, style: AppTypography.labelLarge),
                ],
              ),
      ),
    );
  }
}

enum _ButtonVariant { primary, secondary }
