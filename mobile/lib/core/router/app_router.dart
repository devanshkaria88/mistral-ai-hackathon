import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'routes.dart';
import '../../features/auth/presentation/bloc/auth_bloc.dart';
import '../../features/auth/presentation/bloc/auth_state.dart';
import '../../features/auth/presentation/pages/login_page.dart';
import '../../features/vault/presentation/pages/vault_page.dart';
import '../../features/vault/presentation/pages/story_detail_page.dart';
import '../../features/conversations/presentation/pages/conversations_list_page.dart';
import '../../features/conversations/presentation/pages/conversation_detail_page.dart';
import '../../features/conversations/presentation/pages/conversation_session_page.dart';
import '../../features/persona/presentation/pages/persona_chat_page.dart';
import '../../features/profile/presentation/pages/profile_page.dart';
import '../theme/theme.dart';

class AppRouter {
  final AuthBloc authBloc;

  AppRouter(this.authBloc);

  late final GoRouter router = GoRouter(
    initialLocation: Routes.login,
    debugLogDiagnostics: true,
    refreshListenable: GoRouterRefreshStream(authBloc.stream),
    redirect: (context, state) {
      final authState = authBloc.state;
      final isAuthenticated = authState is AuthAuthenticated;
      final isOnLoginPage = state.matchedLocation == Routes.login;

      if (!isAuthenticated && !isOnLoginPage) {
        return Routes.login;
      }

      if (isAuthenticated && isOnLoginPage) {
        return Routes.vault;
      }

      return null;
    },
    routes: [
      GoRoute(
        path: Routes.login,
        builder: (context, state) => const LoginPage(),
      ),
      ShellRoute(
        builder: (context, state, child) => _ScaffoldWithNavBar(child: child),
        routes: [
          GoRoute(
            path: Routes.vault,
            builder: (context, state) => const VaultPage(),
          ),
          GoRoute(
            path: Routes.conversations,
            builder: (context, state) => const ConversationsListPage(),
          ),
          GoRoute(
            path: Routes.persona,
            builder: (context, state) => const PersonaChatPage(),
          ),
          GoRoute(
            path: Routes.profile,
            builder: (context, state) => const ProfilePage(),
          ),
        ],
      ),
      GoRoute(
        path: Routes.storyDetail,
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          return StoryDetailPage(storyId: id);
        },
      ),
      GoRoute(
        path: Routes.conversationDetail,
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          return ConversationDetailPage(conversationId: id);
        },
      ),
      GoRoute(
        path: Routes.conversationSession,
        builder: (context, state) {
          final id = state.pathParameters['id']!;
          final sessionUrl = state.uri.queryParameters['sessionUrl'] ?? '';
          return ConversationSessionPage(
            conversationId: id,
            sessionUrl: sessionUrl,
          );
        },
      ),
    ],
  );
}

class _ScaffoldWithNavBar extends StatelessWidget {
  final Widget child;

  const _ScaffoldWithNavBar({required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppColors.surface,
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withValues(alpha: 0.08),
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: NavigationBar(
          backgroundColor: AppColors.surface,
          indicatorColor: AppColors.accentLight,
          selectedIndex: _calculateSelectedIndex(context),
          onDestinationSelected: (index) => _onItemTapped(index, context),
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.auto_stories_outlined),
              selectedIcon: Icon(Icons.auto_stories),
              label: 'Vault',
            ),
            NavigationDestination(
              icon: Icon(Icons.chat_bubble_outline),
              selectedIcon: Icon(Icons.chat_bubble),
              label: 'Conversations',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outline),
              selectedIcon: Icon(Icons.person),
              label: 'Persona',
            ),
            NavigationDestination(
              icon: Icon(Icons.settings_outlined),
              selectedIcon: Icon(Icons.settings),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }

  int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    if (location.startsWith(Routes.vault)) return 0;
    if (location.startsWith(Routes.conversations)) return 1;
    if (location.startsWith(Routes.persona)) return 2;
    if (location.startsWith(Routes.profile)) return 3;
    return 0;
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go(Routes.vault);
        break;
      case 1:
        context.go(Routes.conversations);
        break;
      case 2:
        context.go(Routes.persona);
        break;
      case 3:
        context.go(Routes.profile);
        break;
    }
  }
}

class GoRouterRefreshStream extends ChangeNotifier {
  GoRouterRefreshStream(Stream<dynamic> stream) {
    stream.listen((_) => notifyListeners());
  }
}
