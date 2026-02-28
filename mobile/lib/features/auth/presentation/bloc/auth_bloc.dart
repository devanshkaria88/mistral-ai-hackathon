import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../domain/usecases/sign_in_with_google.dart';
import '../../domain/usecases/sign_out.dart';
import '../../domain/usecases/get_current_user.dart';
import '../../domain/usecases/check_auth_status.dart';
import '../../data/datasources/firebase_auth_data_source.dart';
import 'auth_event.dart';
import 'auth_state.dart';

@injectable
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final SignInWithGoogleUseCase _signInWithGoogle;
  final SignOutUseCase _signOut;
  final GetCurrentUserUseCase _getCurrentUser;
  final CheckAuthStatusUseCase _checkAuthStatus;
  final FirebaseAuthDataSource _firebaseAuthDataSource;

  AuthBloc(
    this._signInWithGoogle,
    this._signOut,
    this._getCurrentUser,
    this._checkAuthStatus,
    this._firebaseAuthDataSource,
  ) : super(const AuthState.initial()) {
    on<CheckAuthStatus>(_onCheckAuthStatus);
    on<SignInWithGoogle>(_onSignInWithGoogle);
    on<SignOut>(_onSignOut);
    on<TokenRefreshFailed>(_onTokenRefreshFailed);
  }

  Future<void> _onCheckAuthStatus(
    CheckAuthStatus event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthState.loading());
    try {
      final hasToken = await _checkAuthStatus();
      if (hasToken) {
        final user = await _getCurrentUser();
        emit(AuthState.authenticated(user));
      } else {
        emit(const AuthState.unauthenticated());
      }
    } catch (e) {
      emit(const AuthState.unauthenticated());
    }
  }

  Future<void> _onSignInWithGoogle(
    SignInWithGoogle event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthState.loading());
    try {
      final idToken = await _firebaseAuthDataSource.signInWithGoogle();
      final (user, _) = await _signInWithGoogle(idToken);
      emit(AuthState.authenticated(user));
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  Future<void> _onSignOut(
    SignOut event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthState.loading());
    try {
      await _signOut();
      emit(const AuthState.unauthenticated());
    } catch (e) {
      emit(AuthState.error(e.toString()));
    }
  }

  Future<void> _onTokenRefreshFailed(
    TokenRefreshFailed event,
    Emitter<AuthState> emit,
  ) async {
    await _signOut();
    emit(const AuthState.unauthenticated());
  }
}
