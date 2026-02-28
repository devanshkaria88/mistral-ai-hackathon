// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'auth_event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$AuthEvent {





@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AuthEvent);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthEvent()';
}


}

/// @nodoc
class $AuthEventCopyWith<$Res>  {
$AuthEventCopyWith(AuthEvent _, $Res Function(AuthEvent) __);
}


/// Adds pattern-matching-related methods to [AuthEvent].
extension AuthEventPatterns on AuthEvent {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>({TResult Function( CheckAuthStatus value)?  checkAuthStatus,TResult Function( SignInWithGoogle value)?  signInWithGoogle,TResult Function( SignOut value)?  signOut,TResult Function( TokenRefreshFailed value)?  tokenRefreshFailed,required TResult orElse(),}){
final _that = this;
switch (_that) {
case CheckAuthStatus() when checkAuthStatus != null:
return checkAuthStatus(_that);case SignInWithGoogle() when signInWithGoogle != null:
return signInWithGoogle(_that);case SignOut() when signOut != null:
return signOut(_that);case TokenRefreshFailed() when tokenRefreshFailed != null:
return tokenRefreshFailed(_that);case _:
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

@optionalTypeArgs TResult map<TResult extends Object?>({required TResult Function( CheckAuthStatus value)  checkAuthStatus,required TResult Function( SignInWithGoogle value)  signInWithGoogle,required TResult Function( SignOut value)  signOut,required TResult Function( TokenRefreshFailed value)  tokenRefreshFailed,}){
final _that = this;
switch (_that) {
case CheckAuthStatus():
return checkAuthStatus(_that);case SignInWithGoogle():
return signInWithGoogle(_that);case SignOut():
return signOut(_that);case TokenRefreshFailed():
return tokenRefreshFailed(_that);case _:
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>({TResult? Function( CheckAuthStatus value)?  checkAuthStatus,TResult? Function( SignInWithGoogle value)?  signInWithGoogle,TResult? Function( SignOut value)?  signOut,TResult? Function( TokenRefreshFailed value)?  tokenRefreshFailed,}){
final _that = this;
switch (_that) {
case CheckAuthStatus() when checkAuthStatus != null:
return checkAuthStatus(_that);case SignInWithGoogle() when signInWithGoogle != null:
return signInWithGoogle(_that);case SignOut() when signOut != null:
return signOut(_that);case TokenRefreshFailed() when tokenRefreshFailed != null:
return tokenRefreshFailed(_that);case _:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>({TResult Function()?  checkAuthStatus,TResult Function()?  signInWithGoogle,TResult Function()?  signOut,TResult Function()?  tokenRefreshFailed,required TResult orElse(),}) {final _that = this;
switch (_that) {
case CheckAuthStatus() when checkAuthStatus != null:
return checkAuthStatus();case SignInWithGoogle() when signInWithGoogle != null:
return signInWithGoogle();case SignOut() when signOut != null:
return signOut();case TokenRefreshFailed() when tokenRefreshFailed != null:
return tokenRefreshFailed();case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>({required TResult Function()  checkAuthStatus,required TResult Function()  signInWithGoogle,required TResult Function()  signOut,required TResult Function()  tokenRefreshFailed,}) {final _that = this;
switch (_that) {
case CheckAuthStatus():
return checkAuthStatus();case SignInWithGoogle():
return signInWithGoogle();case SignOut():
return signOut();case TokenRefreshFailed():
return tokenRefreshFailed();case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>({TResult? Function()?  checkAuthStatus,TResult? Function()?  signInWithGoogle,TResult? Function()?  signOut,TResult? Function()?  tokenRefreshFailed,}) {final _that = this;
switch (_that) {
case CheckAuthStatus() when checkAuthStatus != null:
return checkAuthStatus();case SignInWithGoogle() when signInWithGoogle != null:
return signInWithGoogle();case SignOut() when signOut != null:
return signOut();case TokenRefreshFailed() when tokenRefreshFailed != null:
return tokenRefreshFailed();case _:
  return null;

}
}

}

/// @nodoc


class CheckAuthStatus implements AuthEvent {
  const CheckAuthStatus();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is CheckAuthStatus);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthEvent.checkAuthStatus()';
}


}




/// @nodoc


class SignInWithGoogle implements AuthEvent {
  const SignInWithGoogle();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SignInWithGoogle);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthEvent.signInWithGoogle()';
}


}




/// @nodoc


class SignOut implements AuthEvent {
  const SignOut();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SignOut);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthEvent.signOut()';
}


}




/// @nodoc


class TokenRefreshFailed implements AuthEvent {
  const TokenRefreshFailed();
  






@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is TokenRefreshFailed);
}


@override
int get hashCode => runtimeType.hashCode;

@override
String toString() {
  return 'AuthEvent.tokenRefreshFailed()';
}


}




// dart format on
