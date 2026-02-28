// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'conversations_event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$ConversationsEvent {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationsEvent);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsEvent()';
}


}

/// @nodoc
class $ConversationsEventCopyWith<$Res>  {
$ConversationsEventCopyWith(ConversationsEvent _, $Res Function(ConversationsEvent) __);
}


/// Adds pattern-matching-related methods to [ConversationsEvent].
extension ConversationsEventPatterns on ConversationsEvent {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( LoadConversations value)?  loadConversations,TResult Function( StartConversation value)?  startConversation,TResult Function( EndConversation value)?  endConversation,required TResult orElse(),}){
final _that = this;
switch (_that) {
case LoadConversations() when loadConversations != null:
return loadConversations(_that);case StartConversation() when startConversation != null:
return startConversation(_that);case EndConversation() when endConversation != null:
return endConversation(_that);case _:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( LoadConversations value)  loadConversations,required TResult Function( StartConversation value)  startConversation,required TResult Function( EndConversation value)  endConversation,}){
final _that = this;
switch (_that) {
case LoadConversations():
return loadConversations(_that);case StartConversation():
return startConversation(_that);case EndConversation():
return endConversation(_that);case _:
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( LoadConversations value)?  loadConversations,TResult? Function( StartConversation value)?  startConversation,TResult? Function( EndConversation value)?  endConversation,}){
final _that = this;
switch (_that) {
case LoadConversations() when loadConversations != null:
return loadConversations(_that);case StartConversation() when startConversation != null:
return startConversation(_that);case EndConversation() when endConversation != null:
return endConversation(_that);case _:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  loadConversations,TResult Function()?  startConversation,TResult Function( String id)?  endConversation,required TResult orElse(),}) {final _that = this;
switch (_that) {
case LoadConversations() when loadConversations != null:
return loadConversations();case StartConversation() when startConversation != null:
return startConversation();case EndConversation() when endConversation != null:
return endConversation(_that.id);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  loadConversations,required TResult Function()  startConversation,required TResult Function( String id)  endConversation,}) {final _that = this;
switch (_that) {
case LoadConversations():
return loadConversations();case StartConversation():
return startConversation();case EndConversation():
return endConversation(_that.id);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  loadConversations,TResult? Function()?  startConversation,TResult? Function( String id)?  endConversation,}) {final _that = this;
switch (_that) {
case LoadConversations() when loadConversations != null:
return loadConversations();case StartConversation() when startConversation != null:
return startConversation();case EndConversation() when endConversation != null:
return endConversation(_that.id);case _:
  return null;

}
}

}

/// @nodoc


class LoadConversations implements ConversationsEvent {
  const LoadConversations();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LoadConversations);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsEvent.loadConversations()';
}


}




/// @nodoc


class StartConversation implements ConversationsEvent {
  const StartConversation();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is StartConversation);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ConversationsEvent.startConversation()';
}


}




/// @nodoc


class EndConversation implements ConversationsEvent {
  const EndConversation(this.id);
  

 final  String id;

/// Create a copy of ConversationsEvent
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$EndConversationCopyWith<EndConversation> get copyWith => _$EndConversationCopyWithImpl<EndConversation>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is EndConversation&&(identical(other.id, id) || other.id == id));
}


@override
int get hashCode => Object.hash(runtimeType,id);

@override
String toString() {
  return 'ConversationsEvent.endConversation(id: $id)';
}


}

/// @nodoc
abstract mixin class $EndConversationCopyWith<$Res> implements $ConversationsEventCopyWith<$Res> {
  factory $EndConversationCopyWith(EndConversation value, $Res Function(EndConversation) _then) = _$EndConversationCopyWithImpl;
@useResult
$Res call({
 String id
});




}
/// @nodoc
class _$EndConversationCopyWithImpl<$Res>
    implements $EndConversationCopyWith<$Res> {
  _$EndConversationCopyWithImpl(this._self, this._then);

  final EndConversation _self;
  final $Res Function(EndConversation) _then;

/// Create a copy of ConversationsEvent
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? id = null,}) {
  return _then(EndConversation(
null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
