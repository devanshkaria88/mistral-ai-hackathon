import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:elevenlabs_agents/elevenlabs_agents.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/router/routes.dart';
import '../../../../core/services/permissions_service.dart';
import '../../../../core/di/injection.dart';

class ConversationSessionPage extends StatefulWidget {
  final String conversationId;
  final String conversationToken;
  final Map<String, String> dynamicVariables;
  final String? personaName; // For persona calls, the name of the family member

  const ConversationSessionPage({
    super.key,
    required this.conversationId,
    required this.conversationToken,
    required this.dynamicVariables,
    this.personaName,
  });

  @override
  State<ConversationSessionPage> createState() =>
      _ConversationSessionPageState();
}

class _ConversationSessionPageState extends State<ConversationSessionPage> {
  late ConversationClient _client;
  final List<String> _messages = [];
  void Function()? _clientListener;

  @override
  void initState() {
    super.initState();
    _requestMicrophonePermission();
    _initializeClient();
  }

  Future<void> _requestMicrophonePermission() async {
    final granted =
        await PermissionsService.requestVoiceConversationPermissions(
          context: context,
          showRationale: true,
        );
    if (!granted && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Microphone permission is required for voice conversations',
          ),
          backgroundColor: Colors.red,
        ),
      );
      // Navigate back if permission not granted
      if (mounted) {
        context.go(Routes.conversations);
      }
    }
  }

  void _initializeClient() {
    _client = ConversationClient(
      callbacks: ConversationCallbacks(
        onConnect: ({required conversationId}) {
          debugPrint('✅ Connected: $conversationId');
          // Update backend with ElevenLabs conversation ID for webhook linking
          _updateElevenLabsId(conversationId);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: const Text('Connected! Start speaking...'),
                backgroundColor: AppColors.success,
                duration: const Duration(seconds: 2),
              ),
            );
          }
        },
        onDisconnect: (details) {
          debugPrint('❌ Disconnected: ${details.reason}');
        },
        onMessage: ({required message, required source}) {
          debugPrint('💬 ${source.name}: $message');
          final agentName = widget.personaName ?? 'Evie';
          setState(() {
            _messages.add(
              '${source == Role.user ? "You" : agentName}: $message',
            );
          });
        },
        onModeChange: ({required mode}) {
          debugPrint('🔊 Mode: ${mode.name}');
          setState(() {});
        },
        onStatusChange: ({required status}) {
          debugPrint('📡 Status: ${status.name}');
          setState(() {});
        },
        onError: (message, [context]) {
          debugPrint('❌ Error: $message');
          if (mounted) {
            ScaffoldMessenger.of(this.context).showSnackBar(
              SnackBar(
                content: Text('Error: $message'),
                backgroundColor: Colors.red,
              ),
            );
          }
        },
      ),
    );

    _clientListener = () {
      if (mounted) setState(() {});
    };
    _client.addListener(_clientListener!);

    // Start the session with the signed URL
    _startSession();
  }

  Future<void> _startSession() async {
    try {
      // The signedUrl from backend is a signed URL from ElevenLabs
      // The Flutter SDK can use it as a conversationToken
      // Pass dynamic variables so it's available in webhooks for voice cloning
      await _client.startSession(
        conversationToken: widget.conversationToken,
        dynamicVariables: widget.dynamicVariables,
      );
    } catch (e) {
      debugPrint('Failed to start session: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to connect: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  /// Update backend with ElevenLabs conversation ID so webhooks can be linked
  Future<void> _updateElevenLabsId(String elevenLabsConversationId) async {
    try {
      debugPrint(
        'Updating ElevenLabs ID: $elevenLabsConversationId for conversation: ${widget.conversationId}',
      );
      final dio = getIt<Dio>();
      await dio.patch(
        '/api/conversations/${widget.conversationId}/elevenlabs-id',
        data: {'elevenLabsConversationId': elevenLabsConversationId},
      );
      debugPrint('Successfully linked ElevenLabs conversation ID');
    } catch (e) {
      debugPrint('Failed to update ElevenLabs ID: $e');
      // Non-critical error, don't show to user
    }
  }

  @override
  void dispose() {
    if (_clientListener != null) {
      _client.removeListener(_clientListener!);
    }
    _client.endSession();
    _client.dispose();
    super.dispose();
  }

  Future<void> _endSession() async {
    final shouldEnd = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('End Conversation?'),
        content: const Text(
          'This will end the current conversation and begin processing your stories.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            style: TextButton.styleFrom(foregroundColor: AppColors.error),
            child: const Text('End'),
          ),
        ],
      ),
    );

    if (shouldEnd == true && mounted) {
      await _client.endSession();
      // TODO: Call backend to end conversation and trigger processing
      if (mounted) {
        context.go(Routes.conversations);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final isConnected = _client.status == ConversationStatus.connected;
    final isConnecting = _client.status == ConversationStatus.connecting;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Conversation'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: _endSession,
        ),
        actions: [
          TextButton(
            onPressed: _endSession,
            child: Text(
              'End',
              style: AppTypography.labelLarge.copyWith(color: AppColors.accent),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Status indicator
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
            color: _getStatusColor(_client.status).withValues(alpha: 0.1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 10,
                  height: 10,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _getStatusColor(_client.status),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  _getStatusText(_client.status),
                  style: AppTypography.bodyMedium.copyWith(
                    color: _getStatusColor(_client.status),
                  ),
                ),
              ],
            ),
          ),

          // Main content area
          Expanded(
            child: isConnecting
                ? _buildConnectingState()
                : isConnected
                ? _buildConversationUI()
                : _buildDisconnectedState(),
          ),

          // Mute button (only when connected)
          if (isConnected)
            SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    FloatingActionButton.large(
                      onPressed: () => _client.toggleMute(),
                      backgroundColor: _client.isMuted
                          ? AppColors.error
                          : AppColors.accent,
                      child: Icon(
                        _client.isMuted ? Icons.mic_off : Icons.mic,
                        size: 32,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildConnectingState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
          ),
          const SizedBox(height: 24),
          Text(
            'Connecting to ${widget.personaName ?? 'Evie'}...',
            style: AppTypography.titleMedium,
          ),
          const SizedBox(height: 8),
          Text(
            'Please wait while we establish the connection',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConversationUI() {
    return Column(
      children: [
        // Speaking indicator
        Expanded(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Animated speaking indicator
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        (_client.isSpeaking
                                ? AppColors.accent
                                : AppColors.textSecondary)
                            .withValues(alpha: 0.2),
                        Colors.transparent,
                      ],
                    ),
                  ),
                  child: Container(
                    padding: const EdgeInsets.all(32),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _client.isSpeaking
                          ? AppColors.accent
                          : AppColors.surfaceVariant,
                    ),
                    child: Icon(
                      _client.isSpeaking ? Icons.graphic_eq : Icons.mic,
                      size: 64,
                      color: _client.isSpeaking
                          ? Colors.white
                          : AppColors.textSecondary,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                Text(
                  _client.isSpeaking
                      ? '${widget.personaName ?? 'Evie'} is speaking...'
                      : 'Listening to you...',
                  style: AppTypography.headlineSmall.copyWith(
                    color: AppColors.primary,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  _client.isMuted ? 'Microphone is muted' : 'Speak naturally',
                  style: AppTypography.bodyMedium.copyWith(
                    color: _client.isMuted
                        ? AppColors.error
                        : AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ),

        // Recent messages
        if (_messages.isNotEmpty)
          Container(
            height: 120,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: ListView.builder(
              reverse: true,
              itemCount: _messages.length > 3 ? 3 : _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[_messages.length - 1 - index];
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Text(
                    message,
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.textSecondary,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                );
              },
            ),
          ),
      ],
    );
  }

  Widget _buildDisconnectedState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.cloud_off, size: 64, color: AppColors.textSecondary),
          const SizedBox(height: 16),
          Text('Disconnected', style: AppTypography.titleMedium),
          const SizedBox(height: 8),
          Text(
            'The conversation has ended',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => context.go(Routes.conversations),
            child: const Text('Back to Conversations'),
          ),
        ],
      ),
    );
  }

  Color _getStatusColor(ConversationStatus status) {
    switch (status) {
      case ConversationStatus.connected:
        return AppColors.success;
      case ConversationStatus.connecting:
      case ConversationStatus.disconnecting:
        return AppColors.warning;
      case ConversationStatus.disconnected:
        return AppColors.textSecondary;
    }
  }

  String _getStatusText(ConversationStatus status) {
    switch (status) {
      case ConversationStatus.connected:
        return 'Connected';
      case ConversationStatus.connecting:
        return 'Connecting...';
      case ConversationStatus.disconnecting:
        return 'Disconnecting...';
      case ConversationStatus.disconnected:
        return 'Disconnected';
    }
  }
}
