import 'package:freezed_annotation/freezed_annotation.dart';

part 'vault_event.freezed.dart';

@freezed
abstract class VaultEvent with _$VaultEvent {
  const factory VaultEvent.loadStories() = LoadStories;
  const factory VaultEvent.searchStories(String query) = SearchStories;
  const factory VaultEvent.filterByTheme(String? themeSlug) = FilterByTheme;
  const factory VaultEvent.loadTimeline() = LoadTimeline;
}
