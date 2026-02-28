import 'package:injectable/injectable.dart';
import '../repositories/auth_repository.dart';

@injectable
class CheckAuthStatusUseCase {
  final AuthRepository _repository;

  CheckAuthStatusUseCase(this._repository);

  Future<bool> call() {
    return _repository.hasValidToken();
  }
}
