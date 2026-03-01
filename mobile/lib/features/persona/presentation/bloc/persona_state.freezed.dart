// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'persona_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$PersonaState {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaState);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'PersonaState()';
}


}

/// @nodoc
class $PersonaStateCopyWith<$Res>  {
$PersonaStateCopyWith(PersonaState _, $Res Function(PersonaState) __);
}


/// Adds pattern-matching-related methods to [PersonaState].
extension PersonaStatePatterns on PersonaState {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( PersonaInitial value)?  initial,TResult Function( PersonaLoading value)?  loading,TResult Function( PersonaLoaded value)?  loaded,TResult Function( PersonaAsking value)?  asking,TResult Function( PersonaError value)?  error,required TResult orElse(),}){
final _that = this;
switch (_that) {
case PersonaInitial() when initial != null:
return initial(_that);case PersonaLoading() when loading != null:
return loading(_that);case PersonaLoaded() when loaded != null:
return loaded(_that);case PersonaAsking() when asking != null:
return asking(_that);case PersonaError() when error != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( PersonaInitial value)  initial,required TResult Function( PersonaLoading value)  loading,required TResult Function( PersonaLoaded value)  loaded,required TResult Function( PersonaAsking value)  asking,required TResult Function( PersonaError value)  error,}){
final _that = this;
switch (_that) {
case PersonaInitial():
return initial(_that);case PersonaLoading():
return loading(_that);case PersonaLoaded():
return loaded(_that);case PersonaAsking():
return asking(_that);case PersonaError():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( PersonaInitial value)?  initial,TResult? Function( PersonaLoading value)?  loading,TResult? Function( PersonaLoaded value)?  loaded,TResult? Function( PersonaAsking value)?  asking,TResult? Function( PersonaError value)?  error,}){
final _that = this;
switch (_that) {
case PersonaInitial() when initial != null:
return initial(_that);case PersonaLoading() when loading != null:
return loading(_that);case PersonaLoaded() when loaded != null:
return loaded(_that);case PersonaAsking() when asking != null:
return asking(_that);case PersonaError() when error != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  initial,TResult Function()?  loading,TResult Function( List<PersonaMessage> messages)?  loaded,TResult Function()?  asking,TResult Function( String message)?  error,required TResult orElse(),}) {final _that = this;
switch (_that) {
case PersonaInitial() when initial != null:
return initial();case PersonaLoading() when loading != null:
return loading();case PersonaLoaded() when loaded != null:
return loaded(_that.messages);case PersonaAsking() when asking != null:
return asking();case PersonaError() when error != null:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  initial,required TResult Function()  loading,required TResult Function( List<PersonaMessage> messages)  loaded,required TResult Function()  asking,required TResult Function( String message)  error,}) {final _that = this;
switch (_that) {
case PersonaInitial():
return initial();case PersonaLoading():
return loading();case PersonaLoaded():
return loaded(_that.messages);case PersonaAsking():
return asking();case PersonaError():
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  initial,TResult? Function()?  loading,TResult? Function( List<PersonaMessage> messages)?  loaded,TResult? Function()?  asking,TResult? Function( String message)?  error,}) {final _that = this;
switch (_that) {
case PersonaInitial() when initial != null:
return initial();case PersonaLoading() when loading != null:
return loading();case PersonaLoaded() when loaded != null:
return loaded(_that.messages);case PersonaAsking() when asking != null:
return asking();case PersonaError() when error != null:
return error(_that.message);case _:
  return null;

}
}

}

/// @nodoc


class PersonaInitial implements PersonaState {
  const PersonaInitial();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaInitial);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'PersonaState.initial()';
}


}




/// @nodoc


class PersonaLoading implements PersonaState {
  const PersonaLoading();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaLoading);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'PersonaState.loading()';
}


}




/// @nodoc


class PersonaLoaded implements PersonaState {
  const PersonaLoaded({required final  List<PersonaMessage> messages}): _messages = messages;
  

 final  List<PersonaMessage> _messages;
 List<PersonaMessage> get messages {
  if (_messages is EqualUnmodifiableListView) return _messages;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_messages);
}


/// Create a copy of PersonaState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PersonaLoadedCopyWith<PersonaLoaded> get copyWith => _$PersonaLoadedCopyWithImpl<PersonaLoaded>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaLoaded&&const DeepCollectionEquality().equals(other._messages, _messages));
}


@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_messages));

@override
String toString() {
  return 'PersonaState.loaded(messages: $messages)';
}


}

/// @nodoc
abstract mixin class $PersonaLoadedCopyWith<$Res> implements $PersonaStateCopyWith<$Res> {
  factory $PersonaLoadedCopyWith(PersonaLoaded value, $Res Function(PersonaLoaded) _then) = _$PersonaLoadedCopyWithImpl;
@useResult
$Res call({
 List<PersonaMessage> messages
});




}
/// @nodoc
class _$PersonaLoadedCopyWithImpl<$Res>
    implements $PersonaLoadedCopyWith<$Res> {
  _$PersonaLoadedCopyWithImpl(this._self, this._then);

  final PersonaLoaded _self;
  final $Res Function(PersonaLoaded) _then;

/// Create a copy of PersonaState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? messages = null,}) {
  return _then(PersonaLoaded(
messages: null == messages ? _self._messages : messages // ignore: cast_nullable_to_non_nullable
as List<PersonaMessage>,
  ));
}


}

/// @nodoc


class PersonaAsking implements PersonaState {
  const PersonaAsking();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaAsking);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'PersonaState.asking()';
}


}




/// @nodoc


class PersonaError implements PersonaState {
  const PersonaError(this.message);
  

 final  String message;

/// Create a copy of PersonaState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PersonaErrorCopyWith<PersonaError> get copyWith => _$PersonaErrorCopyWithImpl<PersonaError>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaError&&(identical(other.message, message) || other.message == message));
}


@override
int get hashCode => Object.hash(runtimeType,message);

@override
String toString() {
  return 'PersonaState.error(message: $message)';
}


}

/// @nodoc
abstract mixin class $PersonaErrorCopyWith<$Res> implements $PersonaStateCopyWith<$Res> {
  factory $PersonaErrorCopyWith(PersonaError value, $Res Function(PersonaError) _then) = _$PersonaErrorCopyWithImpl;
@useResult
$Res call({
 String message
});




}
/// @nodoc
class _$PersonaErrorCopyWithImpl<$Res>
    implements $PersonaErrorCopyWith<$Res> {
  _$PersonaErrorCopyWithImpl(this._self, this._then);

  final PersonaError _self;
  final $Res Function(PersonaError) _then;

/// Create a copy of PersonaState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? message = null,}) {
  return _then(PersonaError(
null == message ? _self.message : message // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
