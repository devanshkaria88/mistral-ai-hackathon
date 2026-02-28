// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'persona_event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$PersonaEvent {

 String get elderlyUserId;
/// Create a copy of PersonaEvent
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PersonaEventCopyWith<PersonaEvent> get copyWith => _$PersonaEventCopyWithImpl<PersonaEvent>(this as PersonaEvent, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PersonaEvent&&(identical(other.elderlyUserId, elderlyUserId) || other.elderlyUserId == elderlyUserId));
}


@override
int get hashCode => Object.hash(runtimeType,elderlyUserId);

@override
String toString() {
  return 'PersonaEvent(elderlyUserId: $elderlyUserId)';
}


}

/// @nodoc
abstract mixin class $PersonaEventCopyWith<$Res>  {
  factory $PersonaEventCopyWith(PersonaEvent value, $Res Function(PersonaEvent) _then) = _$PersonaEventCopyWithImpl;
@useResult
$Res call({
 String elderlyUserId
});




}
/// @nodoc
class _$PersonaEventCopyWithImpl<$Res>
    implements $PersonaEventCopyWith<$Res> {
  _$PersonaEventCopyWithImpl(this._self, this._then);

  final PersonaEvent _self;
  final $Res Function(PersonaEvent) _then;

/// Create a copy of PersonaEvent
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? elderlyUserId = null,}) {
  return _then(_self.copyWith(
elderlyUserId: null == elderlyUserId ? _self.elderlyUserId : elderlyUserId // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [PersonaEvent].
extension PersonaEventPatterns on PersonaEvent {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( LoadPersonaHistory value)?  loadHistory,TResult Function( AskPersonaQuestion value)?  askQuestion,required TResult orElse(),}){
final _that = this;
switch (_that) {
case LoadPersonaHistory() when loadHistory != null:
return loadHistory(_that);case AskPersonaQuestion() when askQuestion != null:
return askQuestion(_that);case _:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( LoadPersonaHistory value)  loadHistory,required TResult Function( AskPersonaQuestion value)  askQuestion,}){
final _that = this;
switch (_that) {
case LoadPersonaHistory():
return loadHistory(_that);case AskPersonaQuestion():
return askQuestion(_that);case _:
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( LoadPersonaHistory value)?  loadHistory,TResult? Function( AskPersonaQuestion value)?  askQuestion,}){
final _that = this;
switch (_that) {
case LoadPersonaHistory() when loadHistory != null:
return loadHistory(_that);case AskPersonaQuestion() when askQuestion != null:
return askQuestion(_that);case _:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function( String elderlyUserId)?  loadHistory,TResult Function( String elderlyUserId,  String question)?  askQuestion,required TResult orElse(),}) {final _that = this;
switch (_that) {
case LoadPersonaHistory() when loadHistory != null:
return loadHistory(_that.elderlyUserId);case AskPersonaQuestion() when askQuestion != null:
return askQuestion(_that.elderlyUserId,_that.question);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function( String elderlyUserId)  loadHistory,required TResult Function( String elderlyUserId,  String question)  askQuestion,}) {final _that = this;
switch (_that) {
case LoadPersonaHistory():
return loadHistory(_that.elderlyUserId);case AskPersonaQuestion():
return askQuestion(_that.elderlyUserId,_that.question);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function( String elderlyUserId)?  loadHistory,TResult? Function( String elderlyUserId,  String question)?  askQuestion,}) {final _that = this;
switch (_that) {
case LoadPersonaHistory() when loadHistory != null:
return loadHistory(_that.elderlyUserId);case AskPersonaQuestion() when askQuestion != null:
return askQuestion(_that.elderlyUserId,_that.question);case _:
  return null;

}
}

}

/// @nodoc


class LoadPersonaHistory implements PersonaEvent {
  const LoadPersonaHistory(this.elderlyUserId);
  

@override final  String elderlyUserId;

/// Create a copy of PersonaEvent
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$LoadPersonaHistoryCopyWith<LoadPersonaHistory> get copyWith => _$LoadPersonaHistoryCopyWithImpl<LoadPersonaHistory>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LoadPersonaHistory&&(identical(other.elderlyUserId, elderlyUserId) || other.elderlyUserId == elderlyUserId));
}


@override
int get hashCode => Object.hash(runtimeType,elderlyUserId);

@override
String toString() {
  return 'PersonaEvent.loadHistory(elderlyUserId: $elderlyUserId)';
}


}

/// @nodoc
abstract mixin class $LoadPersonaHistoryCopyWith<$Res> implements $PersonaEventCopyWith<$Res> {
  factory $LoadPersonaHistoryCopyWith(LoadPersonaHistory value, $Res Function(LoadPersonaHistory) _then) = _$LoadPersonaHistoryCopyWithImpl;
@override @useResult
$Res call({
 String elderlyUserId
});




}
/// @nodoc
class _$LoadPersonaHistoryCopyWithImpl<$Res>
    implements $LoadPersonaHistoryCopyWith<$Res> {
  _$LoadPersonaHistoryCopyWithImpl(this._self, this._then);

  final LoadPersonaHistory _self;
  final $Res Function(LoadPersonaHistory) _then;

/// Create a copy of PersonaEvent
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? elderlyUserId = null,}) {
  return _then(LoadPersonaHistory(
null == elderlyUserId ? _self.elderlyUserId : elderlyUserId // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

/// @nodoc


class AskPersonaQuestion implements PersonaEvent {
  const AskPersonaQuestion({required this.elderlyUserId, required this.question});
  

@override final  String elderlyUserId;
 final  String question;

/// Create a copy of PersonaEvent
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AskPersonaQuestionCopyWith<AskPersonaQuestion> get copyWith => _$AskPersonaQuestionCopyWithImpl<AskPersonaQuestion>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AskPersonaQuestion&&(identical(other.elderlyUserId, elderlyUserId) || other.elderlyUserId == elderlyUserId)&&(identical(other.question, question) || other.question == question));
}


@override
int get hashCode => Object.hash(runtimeType,elderlyUserId,question);

@override
String toString() {
  return 'PersonaEvent.askQuestion(elderlyUserId: $elderlyUserId, question: $question)';
}


}

/// @nodoc
abstract mixin class $AskPersonaQuestionCopyWith<$Res> implements $PersonaEventCopyWith<$Res> {
  factory $AskPersonaQuestionCopyWith(AskPersonaQuestion value, $Res Function(AskPersonaQuestion) _then) = _$AskPersonaQuestionCopyWithImpl;
@override @useResult
$Res call({
 String elderlyUserId, String question
});




}
/// @nodoc
class _$AskPersonaQuestionCopyWithImpl<$Res>
    implements $AskPersonaQuestionCopyWith<$Res> {
  _$AskPersonaQuestionCopyWithImpl(this._self, this._then);

  final AskPersonaQuestion _self;
  final $Res Function(AskPersonaQuestion) _then;

/// Create a copy of PersonaEvent
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? elderlyUserId = null,Object? question = null,}) {
  return _then(AskPersonaQuestion(
elderlyUserId: null == elderlyUserId ? _self.elderlyUserId : elderlyUserId // ignore: cast_nullable_to_non_nullable
as String,question: null == question ? _self.question : question // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
