import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

/// Service to handle app permissions
class PermissionsService {
  /// Request microphone permission for voice conversations
  /// Returns true if permission is granted
  static Future<bool> requestMicrophonePermission({
    BuildContext? context,
    bool showRationale = true,
  }) async {
    final status = await Permission.microphone.status;

    if (status.isGranted) {
      return true;
    }

    if (status.isDenied) {
      final result = await Permission.microphone.request();
      return result.isGranted;
    }

    if (status.isPermanentlyDenied) {
      if (context != null && context.mounted && showRationale) {
        final shouldOpenSettings = await _showPermissionDeniedDialog(
          context,
          'Microphone Permission Required',
          'Resurrect needs microphone access for voice conversations. '
              'Please enable it in Settings.',
        );
        if (shouldOpenSettings) {
          await openAppSettings();
        }
      }
      return false;
    }

    // For restricted or limited status
    final result = await Permission.microphone.request();
    return result.isGranted;
  }

  /// Request speech recognition permission
  /// Returns true if permission is granted
  static Future<bool> requestSpeechPermission({
    BuildContext? context,
    bool showRationale = true,
  }) async {
    final status = await Permission.speech.status;

    if (status.isGranted) {
      return true;
    }

    if (status.isDenied) {
      final result = await Permission.speech.request();
      return result.isGranted;
    }

    if (status.isPermanentlyDenied) {
      if (context != null && context.mounted && showRationale) {
        final shouldOpenSettings = await _showPermissionDeniedDialog(
          context,
          'Speech Recognition Permission Required',
          'Resurrect needs speech recognition access to transcribe your conversations. '
              'Please enable it in Settings.',
        );
        if (shouldOpenSettings) {
          await openAppSettings();
        }
      }
      return false;
    }

    final result = await Permission.speech.request();
    return result.isGranted;
  }

  /// Request all permissions needed for voice conversations
  /// Returns true if all required permissions are granted
  static Future<bool> requestVoiceConversationPermissions({
    BuildContext? context,
    bool showRationale = true,
  }) async {
    // Microphone is required
    final micGranted = await requestMicrophonePermission(
      context: context,
      showRationale: showRationale,
    );

    if (!micGranted) {
      return false;
    }

    // Speech recognition is optional but recommended
    // We don't block if it's not granted
    if (context != null && context.mounted) {
      await requestSpeechPermission(
        context: context,
        showRationale: false, // Don't show dialog for optional permission
      );
    }

    return true;
  }

  /// Check if microphone permission is granted
  static Future<bool> isMicrophoneGranted() async {
    return await Permission.microphone.isGranted;
  }

  /// Check if speech recognition permission is granted
  static Future<bool> isSpeechGranted() async {
    return await Permission.speech.isGranted;
  }

  /// Show a dialog explaining why permission is needed and offer to open settings
  static Future<bool> _showPermissionDeniedDialog(
    BuildContext context,
    String title,
    String message,
  ) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Open Settings'),
          ),
        ],
      ),
    );
    return result ?? false;
  }

  /// Show a pre-permission dialog to explain why we need the permission
  /// This is shown before the system permission dialog
  static Future<bool> showMicrophoneRationale(BuildContext context) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Voice Conversation'),
        content: const Text(
          'To have a conversation, Resurrect needs access to your microphone.\n\n'
          'Your voice is processed securely and used only for the conversation.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Not Now'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Continue'),
          ),
        ],
      ),
    );
    return result ?? false;
  }
}
