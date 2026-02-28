import 'package:injectable/injectable.dart';
import '../entities/user.dart';
import '../repositories/auth_repository.dart';

@injectable
class GetCurrentUserUseCase {
  final AuthRepository _repository;

  GetCurrentUserUseCase(this._repository);

  Future<User> call() {
    return _repository.getCurrentUser();
  }
}
