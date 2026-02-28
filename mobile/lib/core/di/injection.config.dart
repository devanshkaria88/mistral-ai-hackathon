// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format width=80

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:dio/dio.dart' as _i361;
import 'package:firebase_auth/firebase_auth.dart' as _i59;
import 'package:flutter_secure_storage/flutter_secure_storage.dart' as _i558;
import 'package:get_it/get_it.dart' as _i174;
import 'package:google_sign_in/google_sign_in.dart' as _i116;
import 'package:injectable/injectable.dart' as _i526;

import '../../features/auth/data/datasources/auth_local_data_source.dart'
    as _i852;
import '../../features/auth/data/datasources/auth_remote_data_source.dart'
    as _i107;
import '../../features/auth/data/datasources/firebase_auth_data_source.dart'
    as _i492;
import '../../features/auth/data/repositories/auth_repository_impl.dart'
    as _i153;
import '../../features/auth/domain/repositories/auth_repository.dart' as _i787;
import '../../features/auth/domain/usecases/check_auth_status.dart' as _i643;
import '../../features/auth/domain/usecases/get_current_user.dart' as _i111;
import '../../features/auth/domain/usecases/refresh_token.dart' as _i209;
import '../../features/auth/domain/usecases/sign_in_with_google.dart' as _i692;
import '../../features/auth/domain/usecases/sign_out.dart' as _i568;
import '../../features/auth/presentation/bloc/auth_bloc.dart' as _i797;
import '../../features/conversations/presentation/bloc/conversations_bloc.dart'
    as _i794;
import '../../features/persona/presentation/bloc/persona_bloc.dart' as _i664;
import '../../features/profile/presentation/bloc/profile_bloc.dart' as _i469;
import '../../features/vault/presentation/bloc/vault_bloc.dart' as _i168;
import '../network/api_client.dart' as _i557;
import 'register_module.dart' as _i291;

extension GetItInjectableX on _i174.GetIt {
  // initializes the registration of main-scope dependencies inside of GetIt
  _i174.GetIt init({
    String? environment,
    _i526.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i526.GetItHelper(this, environment, environmentFilter);
    final registerModule = _$RegisterModule();
    final networkModule = _$NetworkModule();
    gh.factory<_i794.ConversationsBloc>(() => _i794.ConversationsBloc());
    gh.factory<_i664.PersonaBloc>(() => _i664.PersonaBloc());
    gh.factory<_i469.ProfileBloc>(() => _i469.ProfileBloc());
    gh.factory<_i168.VaultBloc>(() => _i168.VaultBloc());
    gh.lazySingleton<_i558.FlutterSecureStorage>(
      () => registerModule.secureStorage,
    );
    gh.lazySingleton<_i59.FirebaseAuth>(() => registerModule.firebaseAuth);
    gh.lazySingleton<_i116.GoogleSignIn>(() => registerModule.googleSignIn);
    gh.lazySingleton<_i361.Dio>(() => networkModule.dio);
    gh.lazySingleton<_i107.AuthRemoteDataSource>(
      () => _i107.AuthRemoteDataSourceImpl(gh<_i361.Dio>()),
    );
    gh.lazySingleton<_i852.AuthLocalDataSource>(
      () => _i852.AuthLocalDataSourceImpl(gh<_i558.FlutterSecureStorage>()),
    );
    gh.lazySingleton<_i492.FirebaseAuthDataSource>(
      () => _i492.FirebaseAuthDataSourceImpl(
        gh<_i59.FirebaseAuth>(),
        gh<_i116.GoogleSignIn>(),
      ),
    );
    gh.lazySingleton<_i787.AuthRepository>(
      () => _i153.AuthRepositoryImpl(
        gh<_i107.AuthRemoteDataSource>(),
        gh<_i852.AuthLocalDataSource>(),
        gh<_i492.FirebaseAuthDataSource>(),
      ),
    );
    gh.factory<_i643.CheckAuthStatusUseCase>(
      () => _i643.CheckAuthStatusUseCase(gh<_i787.AuthRepository>()),
    );
    gh.factory<_i111.GetCurrentUserUseCase>(
      () => _i111.GetCurrentUserUseCase(gh<_i787.AuthRepository>()),
    );
    gh.factory<_i209.RefreshTokenUseCase>(
      () => _i209.RefreshTokenUseCase(gh<_i787.AuthRepository>()),
    );
    gh.factory<_i692.SignInWithGoogleUseCase>(
      () => _i692.SignInWithGoogleUseCase(gh<_i787.AuthRepository>()),
    );
    gh.factory<_i568.SignOutUseCase>(
      () => _i568.SignOutUseCase(gh<_i787.AuthRepository>()),
    );
    gh.factory<_i797.AuthBloc>(
      () => _i797.AuthBloc(
        gh<_i692.SignInWithGoogleUseCase>(),
        gh<_i568.SignOutUseCase>(),
        gh<_i111.GetCurrentUserUseCase>(),
        gh<_i643.CheckAuthStatusUseCase>(),
        gh<_i492.FirebaseAuthDataSource>(),
      ),
    );
    return this;
  }
}

class _$RegisterModule extends _i291.RegisterModule {}

class _$NetworkModule extends _i557.NetworkModule {}
