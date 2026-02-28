// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'vault_event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$VaultEvent {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultEvent);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'VaultEvent()';
}


}

/// @nodoc
class $VaultEventCopyWith<$Res>  {
$VaultEventCopyWith(VaultEvent _, $Res Function(VaultEvent) __);
}


/// Adds pattern-matching-related methods to [VaultEvent].
extension VaultEventPatterns on VaultEvent {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( LoadStories value)?  loadStories,TResult Function( SearchStories value)?  searchStories,TResult Function( FilterByTheme value)?  filterByTheme,TResult Function( LoadTimeline value)?  loadTimeline,required TResult orElse(),}){
final _that = this;
switch (_that) {
case LoadStories() when loadStories != null:
return loadStories(_that);case SearchStories() when searchStories != null:
return searchStories(_that);case FilterByTheme() when filterByTheme != null:
return filterByTheme(_that);case LoadTimeline() when loadTimeline != null:
return loadTimeline(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( LoadStories value)  loadStories,required TResult Function( SearchStories value)  searchStories,required TResult Function( FilterByTheme value)  filterByTheme,required TResult Function( LoadTimeline value)  loadTimeline,}){
final _that = this;
switch (_that) {
case LoadStories():
return loadStories(_that);case SearchStories():
return searchStories(_that);case FilterByTheme():
return filterByTheme(_that);case LoadTimeline():
return loadTimeline(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( LoadStories value)?  loadStories,TResult? Function( SearchStories value)?  searchStories,TResult? Function( FilterByTheme value)?  filterByTheme,TResult? Function( LoadTimeline value)?  loadTimeline,}){
final _that = this;
switch (_that) {
case LoadStories() when loadStories != null:
return loadStories(_that);case SearchStories() when searchStories != null:
return searchStories(_that);case FilterByTheme() when filterByTheme != null:
return filterByTheme(_that);case LoadTimeline() when loadTimeline != null:
return loadTimeline(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  loadStories,TResult Function( String query)?  searchStories,TResult Function( String? themeSlug)?  filterByTheme,TResult Function()?  loadTimeline,required TResult orElse(),}) {final _that = this;
switch (_that) {
case LoadStories() when loadStories != null:
return loadStories();case SearchStories() when searchStories != null:
return searchStories(_that.query);case FilterByTheme() when filterByTheme != null:
return filterByTheme(_that.themeSlug);case LoadTimeline() when loadTimeline != null:
return loadTimeline();case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  loadStories,required TResult Function( String query)  searchStories,required TResult Function( String? themeSlug)  filterByTheme,required TResult Function()  loadTimeline,}) {final _that = this;
switch (_that) {
case LoadStories():
return loadStories();case SearchStories():
return searchStories(_that.query);case FilterByTheme():
return filterByTheme(_that.themeSlug);case LoadTimeline():
return loadTimeline();case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  loadStories,TResult? Function( String query)?  searchStories,TResult? Function( String? themeSlug)?  filterByTheme,TResult? Function()?  loadTimeline,}) {final _that = this;
switch (_that) {
case LoadStories() when loadStories != null:
return loadStories();case SearchStories() when searchStories != null:
return searchStories(_that.query);case FilterByTheme() when filterByTheme != null:
return filterByTheme(_that.themeSlug);case LoadTimeline() when loadTimeline != null:
return loadTimeline();case _:
  return null;

}
}

}

/// @nodoc


class LoadStories implements VaultEvent {
  const LoadStories();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LoadStories);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'VaultEvent.loadStories()';
}


}




/// @nodoc


class SearchStories implements VaultEvent {
  const SearchStories(this.query);
  

 final  String query;

/// Create a copy of VaultEvent
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SearchStoriesCopyWith<SearchStories> get copyWith => _$SearchStoriesCopyWithImpl<SearchStories>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SearchStories&&(identical(other.query, query) || other.query == query));
}


@override
int get hashCode => Object.hash(runtimeType,query);

@override
String toString() {
  return 'VaultEvent.searchStories(query: $query)';
}


}

/// @nodoc
abstract mixin class $SearchStoriesCopyWith<$Res> implements $VaultEventCopyWith<$Res> {
  factory $SearchStoriesCopyWith(SearchStories value, $Res Function(SearchStories) _then) = _$SearchStoriesCopyWithImpl;
@useResult
$Res call({
 String query
});




}
/// @nodoc
class _$SearchStoriesCopyWithImpl<$Res>
    implements $SearchStoriesCopyWith<$Res> {
  _$SearchStoriesCopyWithImpl(this._self, this._then);

  final SearchStories _self;
  final $Res Function(SearchStories) _then;

/// Create a copy of VaultEvent
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? query = null,}) {
  return _then(SearchStories(
null == query ? _self.query : query // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

/// @nodoc


class FilterByTheme implements VaultEvent {
  const FilterByTheme(this.themeSlug);
  

 final  String? themeSlug;

/// Create a copy of VaultEvent
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$FilterByThemeCopyWith<FilterByTheme> get copyWith => _$FilterByThemeCopyWithImpl<FilterByTheme>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is FilterByTheme&&(identical(other.themeSlug, themeSlug) || other.themeSlug == themeSlug));
}


@override
int get hashCode => Object.hash(runtimeType,themeSlug);

@override
String toString() {
  return 'VaultEvent.filterByTheme(themeSlug: $themeSlug)';
}


}

/// @nodoc
abstract mixin class $FilterByThemeCopyWith<$Res> implements $VaultEventCopyWith<$Res> {
  factory $FilterByThemeCopyWith(FilterByTheme value, $Res Function(FilterByTheme) _then) = _$FilterByThemeCopyWithImpl;
@useResult
$Res call({
 String? themeSlug
});




}
/// @nodoc
class _$FilterByThemeCopyWithImpl<$Res>
    implements $FilterByThemeCopyWith<$Res> {
  _$FilterByThemeCopyWithImpl(this._self, this._then);

  final FilterByTheme _self;
  final $Res Function(FilterByTheme) _then;

/// Create a copy of VaultEvent
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? themeSlug = freezed,}) {
  return _then(FilterByTheme(
freezed == themeSlug ? _self.themeSlug : themeSlug // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}

/// @nodoc


class LoadTimeline implements VaultEvent {
  const LoadTimeline();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LoadTimeline);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'VaultEvent.loadTimeline()';
}


}




// dart format on
