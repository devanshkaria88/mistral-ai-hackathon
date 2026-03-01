// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'profile_event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$ProfileEvent {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ProfileEvent);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ProfileEvent()';
}


}

/// @nodoc
class $ProfileEventCopyWith<$Res>  {
$ProfileEventCopyWith(ProfileEvent _, $Res Function(ProfileEvent) __);
}


/// Adds pattern-matching-related methods to [ProfileEvent].
extension ProfileEventPatterns on ProfileEvent {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( LoadProfile value)?  loadProfile,TResult Function( ProfileSignOut value)?  signOut,TResult Function( DeleteAudioSample value)?  deleteAudioSample,required TResult orElse(),}){
final _that = this;
switch (_that) {
case LoadProfile() when loadProfile != null:
return loadProfile(_that);case ProfileSignOut() when signOut != null:
return signOut(_that);case DeleteAudioSample() when deleteAudioSample != null:
return deleteAudioSample(_that);case _:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( LoadProfile value)  loadProfile,required TResult Function( ProfileSignOut value)  signOut,required TResult Function( DeleteAudioSample value)  deleteAudioSample,}){
final _that = this;
switch (_that) {
case LoadProfile():
return loadProfile(_that);case ProfileSignOut():
return signOut(_that);case DeleteAudioSample():
return deleteAudioSample(_that);case _:
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( LoadProfile value)?  loadProfile,TResult? Function( ProfileSignOut value)?  signOut,TResult? Function( DeleteAudioSample value)?  deleteAudioSample,}){
final _that = this;
switch (_that) {
case LoadProfile() when loadProfile != null:
return loadProfile(_that);case ProfileSignOut() when signOut != null:
return signOut(_that);case DeleteAudioSample() when deleteAudioSample != null:
return deleteAudioSample(_that);case _:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  loadProfile,TResult Function()?  signOut,TResult Function( String sampleKey)?  deleteAudioSample,required TResult orElse(),}) {final _that = this;
switch (_that) {
case LoadProfile() when loadProfile != null:
return loadProfile();case ProfileSignOut() when signOut != null:
return signOut();case DeleteAudioSample() when deleteAudioSample != null:
return deleteAudioSample(_that.sampleKey);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  loadProfile,required TResult Function()  signOut,required TResult Function( String sampleKey)  deleteAudioSample,}) {final _that = this;
switch (_that) {
case LoadProfile():
return loadProfile();case ProfileSignOut():
return signOut();case DeleteAudioSample():
return deleteAudioSample(_that.sampleKey);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  loadProfile,TResult? Function()?  signOut,TResult? Function( String sampleKey)?  deleteAudioSample,}) {final _that = this;
switch (_that) {
case LoadProfile() when loadProfile != null:
return loadProfile();case ProfileSignOut() when signOut != null:
return signOut();case DeleteAudioSample() when deleteAudioSample != null:
return deleteAudioSample(_that.sampleKey);case _:
  return null;

}
}

}

/// @nodoc


class LoadProfile implements ProfileEvent {
  const LoadProfile();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LoadProfile);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ProfileEvent.loadProfile()';
}


}




/// @nodoc


class ProfileSignOut implements ProfileEvent {
  const ProfileSignOut();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ProfileSignOut);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'ProfileEvent.signOut()';
}


}




/// @nodoc


class DeleteAudioSample implements ProfileEvent {
  const DeleteAudioSample(this.sampleKey);
  

 final  String sampleKey;

/// Create a copy of ProfileEvent
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$DeleteAudioSampleCopyWith<DeleteAudioSample> get copyWith => _$DeleteAudioSampleCopyWithImpl<DeleteAudioSample>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is DeleteAudioSample&&(identical(other.sampleKey, sampleKey) || other.sampleKey == sampleKey));
}


@override
int get hashCode => Object.hash(runtimeType,sampleKey);

@override
String toString() {
  return 'ProfileEvent.deleteAudioSample(sampleKey: $sampleKey)';
}


}

/// @nodoc
abstract mixin class $DeleteAudioSampleCopyWith<$Res> implements $ProfileEventCopyWith<$Res> {
  factory $DeleteAudioSampleCopyWith(DeleteAudioSample value, $Res Function(DeleteAudioSample) _then) = _$DeleteAudioSampleCopyWithImpl;
@useResult
$Res call({
 String sampleKey
});




}
/// @nodoc
class _$DeleteAudioSampleCopyWithImpl<$Res>
    implements $DeleteAudioSampleCopyWith<$Res> {
  _$DeleteAudioSampleCopyWithImpl(this._self, this._then);

  final DeleteAudioSample _self;
  final $Res Function(DeleteAudioSample) _then;

/// Create a copy of ProfileEvent
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') $Res call({Object? sampleKey = null,}) {
  return _then(DeleteAudioSample(
null == sampleKey ? _self.sampleKey : sampleKey // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
