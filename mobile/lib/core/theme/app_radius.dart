import 'package:flutter/material.dart';

abstract final class AppRadius {
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 24;
  static const double full = 999;

  // BorderRadius helpers
  static const BorderRadius borderRadiusSm = BorderRadius.all(Radius.circular(sm));
  static const BorderRadius borderRadiusMd = BorderRadius.all(Radius.circular(md));
  static const BorderRadius borderRadiusLg = BorderRadius.all(Radius.circular(lg));
  static const BorderRadius borderRadiusXl = BorderRadius.all(Radius.circular(xl));
  static const BorderRadius borderRadiusFull = BorderRadius.all(Radius.circular(full));

  // Rounded rectangle helpers
  static RoundedRectangleBorder get shapeSm =>
      const RoundedRectangleBorder(borderRadius: borderRadiusSm);
  static RoundedRectangleBorder get shapeMd =>
      const RoundedRectangleBorder(borderRadius: borderRadiusMd);
  static RoundedRectangleBorder get shapeLg =>
      const RoundedRectangleBorder(borderRadius: borderRadiusLg);
  static RoundedRectangleBorder get shapeXl =>
      const RoundedRectangleBorder(borderRadius: borderRadiusXl);
}
