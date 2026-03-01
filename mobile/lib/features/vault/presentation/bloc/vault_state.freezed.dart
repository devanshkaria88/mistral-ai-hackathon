// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'vault_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$VaultState {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultState);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'VaultState()';
}


}

/// @nodoc
class $VaultStateCopyWith<$Res>  {
$VaultStateCopyWith(VaultState _, $Res Function(VaultState) __);
}


/// Adds pattern-matching-related methods to [VaultState].
extension VaultStatePatterns on VaultState {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( VaultInitial value)?  initial,TResult Function( VaultLoading value)?  loading,TResult Function( VaultLoaded value)?  loaded,TResult Function( VaultTimelineLoaded value)?  timelineLoaded,TResult Function( VaultError value)?  error,required TResult orElse(),}){
final _that = this;
switch (_that) {
case VaultInitial() when initial != null:
return initial(_that);case VaultLoading() when loading != null:
return loading(_that);case VaultLoaded() when loaded != null:
return loaded(_that);case VaultTimelineLoaded() when timelineLoaded != null:
return timelineLoaded(_that);case VaultError() when error != null:
return error(_that);case _:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( VaultInitial value)  initial,required TResult Function( VaultLoading value)  loading,required TResult Function( VaultLoaded value)  loaded,required TResult Function( VaultTimelineLoaded value)  timelineLoaded,required TResult Function( VaultError value)  error,}){
final _that = this;
switch (_that) {
case VaultInitial():
return initial(_that);case VaultLoading():
return loading(_that);case VaultLoaded():
return loaded(_that);case VaultTimelineLoaded():
return timelineLoaded(_that);case VaultError():
return error(_that);case _:
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( VaultInitial value)?  initial,TResult? Function( VaultLoading value)?  loading,TResult? Function( VaultLoaded value)?  loaded,TResult? Function( VaultTimelineLoaded value)?  timelineLoaded,TResult? Function( VaultError value)?  error,}){
final _that = this;
switch (_that) {
case VaultInitial() when initial != null:
return initial(_that);case VaultLoading() when loading != null:
return loading(_that);case VaultLoaded() when loaded != null:
return loaded(_that);case VaultTimelineLoaded() when timelineLoaded != null:
return timelineLoaded(_that);case VaultError() when error != null:
return error(_that);case _:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  initial,TResult Function()?  loading,TResult Function( List<Story> stories,  String? selectedTheme,  String? searchQuery)?  loaded,TResult Function( Timeline timeline)?  timelineLoaded,TResult Function( String message)?  error,required TResult orElse(),}) {final _that = this;
switch (_that) {
case VaultInitial() when initial != null:
return initial();case VaultLoading() when loading != null:
return loading();case VaultLoaded() when loaded != null:
return loaded(_that.stories,_that.selectedTheme,_that.searchQuery);case VaultTimelineLoaded() when timelineLoaded != null:
return timelineLoaded(_that.timeline);case VaultError() when error != null:
return error(_that.message);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  initial,required TResult Function()  loading,required TResult Function( List<Story> stories,  String? selectedTheme,  String? searchQuery)  loaded,required TResult Function( Timeline timeline)  timelineLoaded,required TResult Function( String message)  error,}) {final _that = this;
switch (_that) {
case VaultInitial():
return initial();case VaultLoading():
return loading();case VaultLoaded():
return loaded(_that.stories,_that.selectedTheme,_that.searchQuery);case VaultTimelineLoaded():
return timelineLoaded(_that.timeline);case VaultError():
return error(_that.message);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  initial,TResult? Function()?  loading,TResult? Function( List<Story> stories,  String? selectedTheme,  String? searchQuery)?  loaded,TResult? Function( Timeline timeline)?  timelineLoaded,TResult? Function( String message)?  error,}) {final _that = this;
switch (_that) {
case VaultInitial() when initial != null:
return initial();case VaultLoading() when loading != null:
return loading();case VaultLoaded() when loaded != null:
return loaded(_that.stories,_that.selectedTheme,_that.searchQuery);case VaultTimelineLoaded() when timelineLoaded != null:
return timelineLoaded(_that.timeline);case VaultError() when error != null:
return error(_that.message);case _:
  return null;

}
}

}

/// @nodoc


class VaultInitial implements VaultState {
  const VaultInitial();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultInitial);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'VaultState.initial()';
}


}




/// @nodoc


class VaultLoading implements VaultState {
  const VaultLoading();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultLoading);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'VaultState.loading()';
}


}




/// @nodoc


class VaultLoaded implements VaultState {
  const VaultLoaded({required final  List<Story> stories, this.selectedTheme, this.searchQuery}): _stories = stories;
  

 final  List<Story> _stories;
 List<Story> get stories {
  if (_stories is EqualUnmodifiableListView) return _stories;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_stories);
}

 final  String? selectedTheme;
 final  String? searchQuery;

/// Create a copy of VaultState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VaultLoadedCopyWith<VaultLoaded> get copyWith => _$VaultLoadedCopyWithImpl<VaultLoaded>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultLoaded&&const DeepCollectionEquality().equals(other._stories, _stories)&&(identical(other.selectedTheme, selectedTheme) || other.selectedTheme == selectedTheme)&&(identical(other.searchQuery, searchQuery) || other.searchQuery == searchQuery));
}


@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_stories),selectedTheme,searchQuery);

@override
String toString() {
  return 'VaultState.loaded(stories: $stories, selectedTheme: $selectedTheme, searchQuery: $searchQuery)';
}


}

/// @nodoc
abstract mixin class $VaultLoadedCopyWith<$Res> implements $VaultStateCopyWith<$Res> {
  factory $VaultLoadedCopyWith(VaultLoaded value, $Res Function(VaultLoaded) _then) = _$VaultLoadedCopyWithImpl;
@useResult
$Res call({
 List<Story> stories, String? selectedTheme, String? searchQuery
});




}
/// @nodoc
class _$VaultLoadedCopyWithImpl<$Res>
    implements $VaultLoadedCopyWith<$Res> {
  _$VaultLoadedCopyWithImpl(this._self, this._then);

  final VaultLoaded _self;
  final $Res Function(VaultLoaded) _then;

/// Create a copy of VaultState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? stories = null,Object? selectedTheme = freezed,Object? searchQuery = freezed,}) {
  return _then(VaultLoaded(
stories: null == stories ? _self._stories : stories // ignore: cast_nullable_to_non_nullable
as List<Story>,selectedTheme: freezed == selectedTheme ? _self.selectedTheme : selectedTheme // ignore: cast_nullable_to_non_nullable
as String?,searchQuery: freezed == searchQuery ? _self.searchQuery : searchQuery // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}

/// @nodoc


class VaultTimelineLoaded implements VaultState {
  const VaultTimelineLoaded({required this.timeline});
  

 final  Timeline timeline;

/// Create a copy of VaultState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VaultTimelineLoadedCopyWith<VaultTimelineLoaded> get copyWith => _$VaultTimelineLoadedCopyWithImpl<VaultTimelineLoaded>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultTimelineLoaded&&(identical(other.timeline, timeline) || other.timeline == timeline));
}


@override
int get hashCode => Object.hash(runtimeType,timeline);

@override
String toString() {
  return 'VaultState.timelineLoaded(timeline: $timeline)';
}


}

/// @nodoc
abstract mixin class $VaultTimelineLoadedCopyWith<$Res> implements $VaultStateCopyWith<$Res> {
  factory $VaultTimelineLoadedCopyWith(VaultTimelineLoaded value, $Res Function(VaultTimelineLoaded) _then) = _$VaultTimelineLoadedCopyWithImpl;
@useResult
$Res call({
 Timeline timeline
});




}
/// @nodoc
class _$VaultTimelineLoadedCopyWithImpl<$Res>
    implements $VaultTimelineLoadedCopyWith<$Res> {
  _$VaultTimelineLoadedCopyWithImpl(this._self, this._then);

  final VaultTimelineLoaded _self;
  final $Res Function(VaultTimelineLoaded) _then;

/// Create a copy of VaultState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? timeline = null,}) {
  return _then(VaultTimelineLoaded(
timeline: null == timeline ? _self.timeline : timeline // ignore: cast_nullable_to_non_nullable
as Timeline,
  ));
}


}

/// @nodoc


class VaultError implements VaultState {
  const VaultError(this.message);
  

 final  String message;

/// Create a copy of VaultState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VaultErrorCopyWith<VaultError> get copyWith => _$VaultErrorCopyWithImpl<VaultError>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VaultError&&(identical(other.message, message) || other.message == message));
}


@override
int get hashCode => Object.hash(runtimeType,message);

@override
String toString() {
  return 'VaultState.error(message: $message)';
}


}

/// @nodoc
abstract mixin class $VaultErrorCopyWith<$Res> implements $VaultStateCopyWith<$Res> {
  factory $VaultErrorCopyWith(VaultError value, $Res Function(VaultError) _then) = _$VaultErrorCopyWithImpl;
@useResult
$Res call({
 String message
});




}
/// @nodoc
class _$VaultErrorCopyWithImpl<$Res>
    implements $VaultErrorCopyWith<$Res> {
  _$VaultErrorCopyWithImpl(this._self, this._then);

  final VaultError _self;
  final $Res Function(VaultError) _then;

/// Create a copy of VaultState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? message = null,}) {
  return _then(VaultError(
null == message ? _self.message : message // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
