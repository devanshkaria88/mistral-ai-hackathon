import 'package:injectable/injectable.dart';
import '../entities/user.dart';
import '../entities/auth_tokens.dart';
import '../repositories/auth_repository.dart';

@injectable
class SignInWithGoogleUseCase {
  final AuthRepository _repository;

  SignInWithGoogleUseCase(this._repository);

  Future<(User, AuthTokens)> call(String idToken) {
    return _repository.signInWithGoogle(idToken);
  }
}
