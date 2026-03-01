import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'core/di/injection.dart';
import 'core/network/api_client.dart';
import 'core/router/app_router.dart';
import 'core/theme/theme.dart';
import 'features/auth/presentation/bloc/auth_bloc.dart';
import 'features/auth/presentation/bloc/auth_event.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  await configureDependencies();

  // Set up token refresh failure callback before setting up interceptor
  // This will be connected to AuthBloc after the app starts
  setupAuthInterceptor();

  runApp(const ResurrectApp());
}

class ResurrectApp extends StatefulWidget {
  const ResurrectApp({super.key});

  @override
  State<ResurrectApp> createState() => _ResurrectAppState();
}

class _ResurrectAppState extends State<ResurrectApp> {
  late final AuthBloc _authBloc;
  late final AppRouter _appRouter;

  @override
  void initState() {
    super.initState();
    _authBloc = getIt<AuthBloc>();
    _appRouter = AppRouter(_authBloc);

    // Set up token refresh failure callback to trigger logout
    onTokenRefreshFailedCallback = () {
      _authBloc.add(const AuthEvent.tokenRefreshFailed());
    };

    // Check initial auth status
    _authBloc.add(const AuthEvent.checkAuthStatus());
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: _authBloc,
      child: MaterialApp.router(
        title: 'Resurrect',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        routerConfig: _appRouter.router,
      ),
    );
  }
}
