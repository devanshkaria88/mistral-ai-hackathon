import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../../api/generated/clients/stories_client.dart';
import 'vault_event.dart';
import 'vault_state.dart';

@injectable
class VaultBloc extends Bloc<VaultEvent, VaultState> {
  final StoriesClient _storiesClient;

  VaultBloc(this._storiesClient) : super(const VaultState.initial()) {
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
    try {
      final stories = await _storiesClient.storiesControllerFindAll();
      emit(VaultState.loaded(stories: stories));
    } catch (e) {
      emit(VaultState.error(e.toString()));
    }
  }

  Future<void> _onSearchStories(
    SearchStories event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    try {
      final stories = await _storiesClient.storiesControllerSearch(
        q: event.query,
      );
      emit(VaultState.loaded(stories: stories, searchQuery: event.query));
    } catch (e) {
      emit(VaultState.error(e.toString()));
    }
  }

  Future<void> _onFilterByTheme(
    FilterByTheme event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    try {
      final stories = await _storiesClient.storiesControllerFindAll(
        themeSlug: event.themeSlug,
      );
      emit(VaultState.loaded(stories: stories, selectedTheme: event.themeSlug));
    } catch (e) {
      emit(VaultState.error(e.toString()));
    }
  }

  Future<void> _onLoadTimeline(
    LoadTimeline event,
    Emitter<VaultState> emit,
  ) async {
    emit(const VaultState.loading());
    try {
      final timeline = await _storiesClient.storiesControllerGetTimeline();
      emit(VaultState.timelineLoaded(timeline: timeline));
    } catch (e) {
      emit(VaultState.error(e.toString()));
    }
  }
}
