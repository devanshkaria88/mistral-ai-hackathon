// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, unused_import, invalid_annotation_target, unnecessary_import

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../models/bookmark.dart';
import '../models/story.dart';
import '../models/theme.dart';
import '../models/timeline.dart';

part 'stories_client.g.dart';

@RestApi()
abstract class StoriesClient {
  factory StoriesClient(Dio dio, {String? baseUrl}) = _StoriesClient;

  /// List stories with optional filters.
  ///
  /// [page] - Page number (1-indexed).
  ///
  /// [limit] - Number of items per page.
  ///
  /// [personId] - Filter by person ID.
  ///
  /// [placeId] - Filter by place ID.
  ///
  /// [themeSlug] - Filter by theme slug.
  ///
  /// [timePeriod] - Filter by time period.
  @GET('/api/stories')
  Future<List<Story>> storiesControllerFindAll({
    @Query('personId') String? personId,
    @Query('placeId') String? placeId,
    @Query('themeSlug') String? themeSlug,
    @Query('timePeriod') String? timePeriod,
    @Query('page') num? page = 1,
    @Query('limit') num? limit = 20,
  });

  /// Semantic search across stories.
  ///
  /// [q] - Search query for semantic search.
  @GET('/api/stories/search')
  Future<List<Story>> storiesControllerSearch({
    @Query('q') required String q,
  });

  /// Get stories grouped by time period
  @GET('/api/stories/timeline')
  Future<Timeline> storiesControllerGetTimeline();

  /// Get all available themes
  @GET('/api/stories/themes')
  Future<List<Theme>> storiesControllerGetThemes();

  /// Get a single story by ID.
  ///
  /// [id] - Story ID.
  @GET('/api/stories/{id}')
  Future<Story> storiesControllerFindOne({
    @Path('id') required String id,
  });

  /// Toggle bookmark on a story.
  ///
  /// [id] - Story ID.
  @POST('/api/stories/{id}/bookmark')
  Future<Bookmark> storiesControllerToggleBookmark({
    @Path('id') required String id,
  });
}
