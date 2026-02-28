import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/router/routes.dart';

class ConversationSessionPage extends StatefulWidget {
  final String conversationId;
  final String sessionUrl;

  const ConversationSessionPage({
    super.key,
    required this.conversationId,
    required this.sessionUrl,
  });

  @override
  State<ConversationSessionPage> createState() =>
      _ConversationSessionPageState();
}

class _ConversationSessionPageState extends State<ConversationSessionPage> {
  late final WebViewController _controller;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) => setState(() => _isLoading = true),
          onPageFinished: (_) => setState(() => _isLoading = false),
        ),
      )
      ..loadRequest(Uri.parse(widget.sessionUrl));
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
            child: const Text('End'),
          ),
        ],
      ),
    );

    if (shouldEnd == true && mounted) {
      // TODO: Call backend to end conversation
      context.go(Routes.conversations);
    }
  }

  @override
  Widget build(BuildContext context) {
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
              style: AppTypography.labelLarge.copyWith(
                color: AppColors.accent,
              ),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          WebViewWidget(controller: _controller),
          if (_isLoading)
            const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
              ),
            ),
        ],
      ),
    );
  }
}
