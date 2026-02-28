import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/constants/app_constants.dart';
import '../bloc/auth_bloc.dart';
import '../bloc/auth_event.dart';
import '../bloc/auth_state.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: AppSpacing.paddingAllLg,
          child: Column(
            children: [
              const Spacer(flex: 2),
              _buildLogo(),
              AppSpacing.verticalLg,
              _buildTitle(),
              AppSpacing.verticalSm,
              _buildTagline(),
              const Spacer(flex: 3),
              _buildSignInButton(context),
              AppSpacing.verticalLg,
              _buildDisclaimer(),
              AppSpacing.verticalXl,
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Container(
      width: 120,
      height: 120,
      decoration: BoxDecoration(
        color: AppColors.primary,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.3),
            blurRadius: 24,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: const Icon(
        Icons.auto_stories_rounded,
        size: 56,
        color: AppColors.accentLight,
      ),
    );
  }

  Widget _buildTitle() {
    return Text(
      AppConstants.appName,
      style: AppTypography.displaySmall.copyWith(
        color: AppColors.primary,
        fontWeight: FontWeight.w700,
      ),
      textAlign: TextAlign.center,
    );
  }

  Widget _buildTagline() {
    return Text(
      AppConstants.tagline,
      style: AppTypography.bodyLarge.copyWith(
        color: AppColors.textSecondary,
        fontStyle: FontStyle.italic,
      ),
      textAlign: TextAlign.center,
    );
  }

  Widget _buildSignInButton(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        state.maybeWhen(
          error: (message) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(message),
                backgroundColor: AppColors.error,
              ),
            );
          },
          orElse: () {},
        );
      },
      builder: (context, state) {
        final isLoading = state.maybeWhen(
          loading: () => true,
          orElse: () => false,
        );

        return AppButton(
          onPressed: () {
            context.read<AuthBloc>().add(const AuthEvent.signInWithGoogle());
          },
          label: 'Continue with Google',
          icon: Icons.g_mobiledata_rounded,
          isLoading: isLoading,
          isExpanded: true,
        );
      },
    );
  }

  Widget _buildDisclaimer() {
    return Text(
      'By continuing, you agree to our Terms of Service\nand Privacy Policy',
      style: AppTypography.bodySmall.copyWith(
        color: AppColors.textSecondary,
      ),
      textAlign: TextAlign.center,
    );
  }
}
