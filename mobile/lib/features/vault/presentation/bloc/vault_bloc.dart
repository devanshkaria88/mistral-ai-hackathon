import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import 'vault_event.dart';
import 'vault_state.dart';

@injectable
class VaultBloc extends Bloc<VaultEvent, VaultState> {
  VaultBloc() : super(const VaultState.initial()) {
    on<LoadStories>(_onLoadStories);
    on<SearchStories>(_onSearchStories);
    on<FilterByTheme>(_onFilterByTheme);
    on<LoadTimeline>(_onLoadTimeline);
  }

  Future<void> _onLoadStories(
    LoadStories event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    // TODO: Implement with real data source
    emit(const VaultState.loaded(stories: []));
  }

  Future<void> _onSearchStories(
    SearchStories event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    // TODO: Implement search
    emit(const VaultState.loaded(stories: []));
  }

  Future<void> _onFilterByTheme(
    FilterByTheme event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    // TODO: Implement filter
    emit(VaultState.loaded(stories: const [], selectedTheme: event.themeSlug));
  }

  Future<void> _onLoadTimeline(
    LoadTimeline event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    // TODO: Implement timeline
    emit(const VaultState.loaded(stories: []));
  }
}
