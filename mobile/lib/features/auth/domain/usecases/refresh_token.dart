import 'package:injectable/injectable.dart';
import '../entities/auth_tokens.dart';
import '../repositories/auth_repository.dart';

@injectable
class RefreshTokenUseCase {
  final AuthRepository _repository;

  RefreshTokenUseCase(this._repository);

  Future<AuthTokens> call(String refreshToken) {
    return _repository.refreshToken(refreshToken);
  }
}
