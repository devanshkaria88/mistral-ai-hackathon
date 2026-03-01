// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'conversations_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$ConversationsState {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationsState);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsState()';
}


}

/// @nodoc
class $ConversationsStateCopyWith<$Res>  {
$ConversationsStateCopyWith(ConversationsState _, $Res Function(ConversationsState) __);
}


/// Adds pattern-matching-related methods to [ConversationsState].
extension ConversationsStatePatterns on ConversationsState {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( ConversationsInitial value)?  initial,TResult Function( ConversationsLoading value)?  loading,TResult Function( ConversationsLoaded value)?  loaded,TResult Function( StartingSession value)?  startingSession,TResult Function( SessionStarted value)?  sessionStarted,TResult Function( ConversationsError value)?  error,required TResult orElse(),}){
final _that = this;
switch (_that) {
case ConversationsInitial() when initial != null:
return initial(_that);case ConversationsLoading() when loading != null:
return loading(_that);case ConversationsLoaded() when loaded != null:
return loaded(_that);case StartingSession() when startingSession != null:
return startingSession(_that);case SessionStarted() when sessionStarted != null:
return sessionStarted(_that);case ConversationsError() when error != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( ConversationsInitial value)  initial,required TResult Function( ConversationsLoading value)  loading,required TResult Function( ConversationsLoaded value)  loaded,required TResult Function( StartingSession value)  startingSession,required TResult Function( SessionStarted value)  sessionStarted,required TResult Function( ConversationsError value)  error,}){
final _that = this;
switch (_that) {
case ConversationsInitial():
return initial(_that);case ConversationsLoading():
return loading(_that);case ConversationsLoaded():
return loaded(_that);case StartingSession():
return startingSession(_that);case SessionStarted():
return sessionStarted(_that);case ConversationsError():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( ConversationsInitial value)?  initial,TResult? Function( ConversationsLoading value)?  loading,TResult? Function( ConversationsLoaded value)?  loaded,TResult? Function( StartingSession value)?  startingSession,TResult? Function( SessionStarted value)?  sessionStarted,TResult? Function( ConversationsError value)?  error,}){
final _that = this;
switch (_that) {
case ConversationsInitial() when initial != null:
return initial(_that);case ConversationsLoading() when loading != null:
return loading(_that);case ConversationsLoaded() when loaded != null:
return loaded(_that);case StartingSession() when startingSession != null:
return startingSession(_that);case SessionStarted() when sessionStarted != null:
return sessionStarted(_that);case ConversationsError() when error != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  initial,TResult Function()?  loading,TResult Function( List<dynamic> conversations)?  loaded,TResult Function()?  startingSession,TResult Function( String conversationId,  String conversationToken,  DynamicVariables dynamicVariables)?  sessionStarted,TResult Function( String message)?  error,required TResult orElse(),}) {final _that = this;
switch (_that) {
case ConversationsInitial() when initial != null:
return initial();case ConversationsLoading() when loading != null:
return loading();case ConversationsLoaded() when loaded != null:
return loaded(_that.conversations);case StartingSession() when startingSession != null:
return startingSession();case SessionStarted() when sessionStarted != null:
return sessionStarted(_that.conversationId,_that.conversationToken,_that.dynamicVariables);case ConversationsError() when error != null:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  initial,required TResult Function()  loading,required TResult Function( List<dynamic> conversations)  loaded,required TResult Function()  startingSession,required TResult Function( String conversationId,  String conversationToken,  DynamicVariables dynamicVariables)  sessionStarted,required TResult Function( String message)  error,}) {final _that = this;
switch (_that) {
case ConversationsInitial():
return initial();case ConversationsLoading():
return loading();case ConversationsLoaded():
return loaded(_that.conversations);case StartingSession():
return startingSession();case SessionStarted():
return sessionStarted(_that.conversationId,_that.conversationToken,_that.dynamicVariables);case ConversationsError():
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  initial,TResult? Function()?  loading,TResult? Function( List<dynamic> conversations)?  loaded,TResult? Function()?  startingSession,TResult? Function( String conversationId,  String conversationToken,  DynamicVariables dynamicVariables)?  sessionStarted,TResult? Function( String message)?  error,}) {final _that = this;
switch (_that) {
case ConversationsInitial() when initial != null:
return initial();case ConversationsLoading() when loading != null:
return loading();case ConversationsLoaded() when loaded != null:
return loaded(_that.conversations);case StartingSession() when startingSession != null:
return startingSession();case SessionStarted() when sessionStarted != null:
return sessionStarted(_that.conversationId,_that.conversationToken,_that.dynamicVariables);case ConversationsError() when error != null:
return error(_that.message);case _:
  return null;

}
}

}

/// @nodoc


class ConversationsInitial implements ConversationsState {
  const ConversationsInitial();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationsInitial);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsState.initial()';
}


}




/// @nodoc


class ConversationsLoading implements ConversationsState {
  const ConversationsLoading();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationsLoading);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsState.loading()';
}


}




/// @nodoc


class ConversationsLoaded implements ConversationsState {
  const ConversationsLoaded({required final  List<dynamic> conversations}): _conversations = conversations;
  

 final  List<dynamic> _conversations;
 List<dynamic> get conversations {
  if (_conversations is EqualUnmodifiableListView) return _conversations;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_conversations);
}


/// Create a copy of ConversationsState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ConversationsLoadedCopyWith<ConversationsLoaded> get copyWith => _$ConversationsLoadedCopyWithImpl<ConversationsLoaded>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationsLoaded&&const DeepCollectionEquality().equals(other._conversations, _conversations));
}


@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_conversations));

@override
String toString() {
  return 'ConversationsState.loaded(conversations: $conversations)';
}


}

/// @nodoc
abstract mixin class $ConversationsLoadedCopyWith<$Res> implements $ConversationsStateCopyWith<$Res> {
  factory $ConversationsLoadedCopyWith(ConversationsLoaded value, $Res Function(ConversationsLoaded) _then) = _$ConversationsLoadedCopyWithImpl;
@useResult
$Res call({
 List<dynamic> conversations
});




}
/// @nodoc
class _$ConversationsLoadedCopyWithImpl<$Res>
    implements $ConversationsLoadedCopyWith<$Res> {
  _$ConversationsLoadedCopyWithImpl(this._self, this._then);

  final ConversationsLoaded _self;
  final $Res Function(ConversationsLoaded) _then;

/// Create a copy of ConversationsState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? conversations = null,}) {
  return _then(ConversationsLoaded(
conversations: null == conversations ? _self._conversations : conversations // ignore: cast_nullable_to_non_nullable
as List<dynamic>,
  ));
}


}

/// @nodoc


class StartingSession implements ConversationsState {
  const StartingSession();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is StartingSession);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsState.startingSession()';
}


}




/// @nodoc


class SessionStarted implements ConversationsState {
  const SessionStarted({required this.conversationId, required this.conversationToken, required this.dynamicVariables});
  

 final  String conversationId;
 final  String conversationToken;
 final  DynamicVariables dynamicVariables;

/// Create a copy of ConversationsState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SessionStartedCopyWith<SessionStarted> get copyWith => _$SessionStartedCopyWithImpl<SessionStarted>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SessionStarted&&(identical(other.conversationId, conversationId) || other.conversationId == conversationId)&&(identical(other.conversationToken, conversationToken) || other.conversationToken == conversationToken)&&(identical(other.dynamicVariables, dynamicVariables) || other.dynamicVariables == dynamicVariables));
}


@override
int get hashCode => Object.hash(runtimeType,conversationId,conversationToken,dynamicVariables);

@override
String toString() {
  return 'ConversationsState.sessionStarted(conversationId: $conversationId, conversationToken: $conversationToken, dynamicVariables: $dynamicVariables)';
}


}

/// @nodoc
abstract mixin class $SessionStartedCopyWith<$Res> implements $ConversationsStateCopyWith<$Res> {
  factory $SessionStartedCopyWith(SessionStarted value, $Res Function(SessionStarted) _then) = _$SessionStartedCopyWithImpl;
@useResult
$Res call({
 String conversationId, String conversationToken, DynamicVariables dynamicVariables
});




}
/// @nodoc
class _$SessionStartedCopyWithImpl<$Res>
    implements $SessionStartedCopyWith<$Res> {
  _$SessionStartedCopyWithImpl(this._self, this._then);

  final SessionStarted _self;
  final $Res Function(SessionStarted) _then;

/// Create a copy of ConversationsState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? conversationId = null,Object? conversationToken = null,Object? dynamicVariables = null,}) {
  return _then(SessionStarted(
conversationId: null == conversationId ? _self.conversationId : conversationId // ignore: cast_nullable_to_non_nullable
as String,conversationToken: null == conversationToken ? _self.conversationToken : conversationToken // ignore: cast_nullable_to_non_nullable
as String,dynamicVariables: null == dynamicVariables ? _self.dynamicVariables : dynamicVariables // ignore: cast_nullable_to_non_nullable
as DynamicVariables,
  ));
}


}

/// @nodoc


class ConversationsError implements ConversationsState {
  const ConversationsError(this.message);
  

 final  String message;

/// Create a copy of ConversationsState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ConversationsErrorCopyWith<ConversationsError> get copyWith => _$ConversationsErrorCopyWithImpl<ConversationsError>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationsError&&(identical(other.message, message) || other.message == message));
}


@override
int get hashCode => Object.hash(runtimeType,message);

@override
String toString() {
  return 'ConversationsState.error(message: $message)';
}


}

/// @nodoc
abstract mixin class $ConversationsErrorCopyWith<$Res> implements $ConversationsStateCopyWith<$Res> {
  factory $ConversationsErrorCopyWith(ConversationsError value, $Res Function(ConversationsError) _then) = _$ConversationsErrorCopyWithImpl;
@useResult
$Res call({
 String message
});




}
/// @nodoc
class _$ConversationsErrorCopyWithImpl<$Res>
    implements $ConversationsErrorCopyWith<$Res> {
  _$ConversationsErrorCopyWithImpl(this._self, this._then);

  final ConversationsError _self;
  final $Res Function(ConversationsError) _then;

/// Create a copy of ConversationsState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? message = null,}) {
  return _then(ConversationsError(
null == message ? _self.message : message // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
