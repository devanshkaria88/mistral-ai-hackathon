import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/theme.dart';
import '../../../../core/widgets/widgets.dart';
import '../../../../core/di/injection.dart';
import '../../../../core/router/routes.dart';
import '../../../../core/router/app_router.dart';
import '../../../conversations/presentation/bloc/conversations_bloc.dart';
import '../../../conversations/presentation/bloc/conversations_event.dart';
import '../../../conversations/presentation/bloc/conversations_state.dart';

class FamilyMember {
  final String id;
  final String name;
  final String? photoUrl;
  final String relationship;
  final bool hasVoiceClone;
  final int storiesCount;

  const FamilyMember({
    required this.id,
    required this.name,
    this.photoUrl,
    required this.relationship,
    this.hasVoiceClone = false,
    this.storiesCount = 0,
  });

  factory FamilyMember.fromJson(Map<String, dynamic> json) {
    return FamilyMember(
      id: json['id'] as String,
      name: json['displayName'] as String,
      photoUrl: json['photoUrl'] as String?,
      relationship: json['relationship'] as String,
      hasVoiceClone: json['hasVoiceClone'] as bool? ?? false,
      storiesCount: json['storiesCount'] as int? ?? 0,
    );
  }
}

class FamilyPage extends StatelessWidget {
  const FamilyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<ConversationsBloc>(),
      child: const _FamilyPageContent(),
    );
  }
}

class _FamilyPageContent extends StatefulWidget {
  const _FamilyPageContent();

  @override
  State<_FamilyPageContent> createState() => _FamilyPageContentState();
}

class _FamilyPageContentState extends State<_FamilyPageContent> {
  List<FamilyMember> _familyMembers = [];
  bool _isLoadingFamily = true;
  String? _error;
  String _familyName = 'My Family';
  String? _callingMemberName; // Track which member is being called

  @override
  void initState() {
    super.initState();
    _loadFamilyMembers();
  }

  Future<void> _loadFamilyMembers() async {
    try {
      final dio = getIt<Dio>();
      final response = await dio.get('/api/family/my-family');

      final data = response.data as Map<String, dynamic>;
      final members = (data['members'] as List<dynamic>)
          .map((m) => FamilyMember.fromJson(m as Map<String, dynamic>))
          .toList();

      setState(() {
        _familyMembers = members;
        _familyName = data['familyName'] as String? ?? 'My Family';
        _isLoadingFamily = false;
      });
    } catch (e) {
      debugPrint('Failed to load family members: $e');
      setState(() {
        _error = 'Failed to load family members';
        _isLoadingFamily = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<ConversationsBloc, ConversationsState>(
      listener: (context, state) {
        state.maybeWhen(
          sessionStarted:
              (conversationId, conversationToken, dynamicVariables) {
                // For persona mode, pass persona-specific dynamic variables
                final vars = <String, String>{};

                // Add persona mode variables if present
                if (dynamicVariables.elderlyName != null) {
                  vars['elderly_name'] = dynamicVariables.elderlyName!;
                }
                if (dynamicVariables.personalityBlock != null) {
                  vars['personality_block'] =
                      dynamicVariables.personalityBlock!;
                }
                if (dynamicVariables.knowledgeGraph != null) {
                  vars['knowledge_graph'] = dynamicVariables.knowledgeGraph!;
                }
                if (dynamicVariables.peopleBlock != null) {
                  vars['people_block'] = dynamicVariables.peopleBlock!;
                }
                if (dynamicVariables.speechPatterns != null) {
                  vars['speech_patterns'] = dynamicVariables.speechPatterns!;
                }

                // Also include companion mode vars for fallback/display
                vars['user_name'] = dynamicVariables.userName;
                vars['context_block'] = dynamicVariables.contextBlock;
                vars['stories_summary'] = dynamicVariables.storiesSummary;
                vars['exploration_suggestions'] =
                    dynamicVariables.explorationSuggestions;

                context.push(
                  Routes.conversationSessionPath(conversationId),
                  extra: ConversationSessionData(
                    conversationToken: conversationToken,
                    dynamicVariables: vars,
                    personaName: _callingMemberName,
                  ),
                );
              },
          error: (message) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(message), backgroundColor: Colors.red),
            );
          },
          orElse: () {},
        );
      },
      child: Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          title: Text(_familyName, style: AppTypography.headlineMedium),
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Text(
                'Talk to your loved ones',
                style: AppTypography.bodyLarge.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
            ),
            Expanded(child: _buildContent()),
          ],
        ),
      ),
    );
  }

  Widget _buildContent() {
    if (_isLoadingFamily) {
      return const Center(
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
        ),
      );
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.error_outline,
              size: 48,
              color: AppColors.textSecondary,
            ),
            const SizedBox(height: AppSpacing.md),
            Text(_error!, style: AppTypography.bodyMedium),
            const SizedBox(height: AppSpacing.md),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _isLoadingFamily = true;
                  _error = null;
                });
                _loadFamilyMembers();
              },
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    if (_familyMembers.isEmpty) {
      return const AppEmptyState(
        icon: Icons.family_restroom,
        title: 'No family members yet',
        message: 'Invite family members to join your family group',
      );
    }

    return _buildFamilyGrid();
  }

  Widget _buildFamilyGrid() {
    return BlocBuilder<ConversationsBloc, ConversationsState>(
      builder: (context, state) {
        final isStartingSession = state.maybeWhen(
          startingSession: () => true,
          orElse: () => false,
        );

        return GridView.builder(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: AppSpacing.md,
            mainAxisSpacing: AppSpacing.md,
            childAspectRatio: 0.75,
          ),
          itemCount: _familyMembers.length,
          itemBuilder: (context, index) {
            final member = _familyMembers[index];
            return _FamilyMemberCard(
              member: member,
              isLoading: isStartingSession,
              onCall: () => _startPersonaCall(member),
              onViewHistory: () => _viewPersonaHistory(member),
            );
          },
        );
      },
    );
  }

  void _startPersonaCall(FamilyMember member) {
    setState(() {
      _callingMemberName = member.name;
    });
    context.read<ConversationsBloc>().add(
      ConversationsEvent.startPersonaMode(member.id),
    );
  }

  void _viewPersonaHistory(FamilyMember member) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (ctx) => _PersonaHistoryPage(member: member)),
    );
  }
}

class _FamilyMemberCard extends StatelessWidget {
  final FamilyMember member;
  final bool isLoading;
  final VoidCallback onCall;
  final VoidCallback onViewHistory;

  const _FamilyMemberCard({
    required this.member,
    required this.isLoading,
    required this.onCall,
    required this.onViewHistory,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.lg),
      ),
      child: InkWell(
        onTap: (isLoading || !member.hasVoiceClone) ? null : onCall,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.sm),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              Stack(
                children: [
                  AppAvatar(
                    name: member.name,
                    imageUrl: member.photoUrl,
                    size: 64,
                  ),
                  if (member.hasVoiceClone)
                    Positioned(
                      right: 0,
                      bottom: 0,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: AppColors.success,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: AppColors.surface,
                            width: 2,
                          ),
                        ),
                        child: const Icon(
                          Icons.mic,
                          size: 12,
                          color: Colors.white,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                member.name,
                style: AppTypography.titleSmall,
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                member.relationship,
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.textSecondary,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.xs),
              if (isLoading)
                const SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
                  ),
                )
              else if (member.hasVoiceClone)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md,
                    vertical: AppSpacing.xs,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.accent,
                    borderRadius: BorderRadius.circular(AppRadius.full),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.call, size: 16, color: Colors.white),
                      const SizedBox(width: 4),
                      Text(
                        'Call',
                        style: AppTypography.labelMedium.copyWith(
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                )
              else
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md,
                    vertical: AppSpacing.xs,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVariant,
                    borderRadius: BorderRadius.circular(AppRadius.full),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.mic_off,
                        size: 16,
                        color: AppColors.textSecondary,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        'No Voice',
                        style: AppTypography.labelMedium.copyWith(
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              GestureDetector(
                onTap: onViewHistory,
                child: Text(
                  'History',
                  style: AppTypography.labelSmall.copyWith(
                    color: AppColors.textSecondary,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PersonaHistoryPage extends StatefulWidget {
  final FamilyMember member;

  const _PersonaHistoryPage({required this.member});

  @override
  State<_PersonaHistoryPage> createState() => _PersonaHistoryPageState();
}

class _PersonaHistoryPageState extends State<_PersonaHistoryPage> {
  List<Map<String, dynamic>> _conversations = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadConversations();
  }

  Future<void> _loadConversations() async {
    try {
      final dio = getIt<Dio>();
      final response = await dio.get(
        '/api/conversations/persona/${widget.member.id}',
      );

      final data = response.data as List<dynamic>;
      setState(() {
        _conversations = data.cast<Map<String, dynamic>>();
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Failed to load persona conversations: $e');
      setState(() {
        _error = 'Failed to load conversations';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: Text('Calls with ${widget.member.name}')),
      body: _buildContent(),
    );
  }

  Widget _buildContent() {
    if (_isLoading) {
      return const Center(
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
        ),
      );
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.error_outline,
              size: 48,
              color: AppColors.textSecondary,
            ),
            const SizedBox(height: AppSpacing.md),
            Text(_error!, style: AppTypography.bodyMedium),
            const SizedBox(height: AppSpacing.md),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _isLoading = true;
                  _error = null;
                });
                _loadConversations();
              },
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    if (_conversations.isEmpty) {
      return AppEmptyState(
        icon: Icons.history,
        title: 'No conversations yet',
        message: 'Call ${widget.member.name} to start a conversation',
      );
    }

    return ListView.builder(
      padding: AppSpacing.paddingAllMd,
      itemCount: _conversations.length,
      itemBuilder: (context, index) {
        final conv = _conversations[index];
        final createdAt =
            DateTime.tryParse(conv['createdAt'] ?? '') ?? DateTime.now();
        final formattedDate =
            '${createdAt.day}/${createdAt.month}/${createdAt.year}';
        final formattedTime =
            '${createdAt.hour.toString().padLeft(2, '0')}:${createdAt.minute.toString().padLeft(2, '0')}';
        final recordingUrl = conv['recordingUrl'] as String?;

        return AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.call, size: 20, color: AppColors.accent),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Call on $formattedDate',
                          style: AppTypography.bodyMedium,
                        ),
                        Text(
                          'at $formattedTime',
                          style: AppTypography.bodySmall.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (recordingUrl != null)
                    IconButton(
                      icon: const Icon(
                        Icons.play_circle_outline,
                        color: AppColors.accent,
                      ),
                      onPressed: () => _playRecording(recordingUrl),
                    ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  void _playRecording(String url) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Call Recording', style: AppTypography.titleMedium),
              AppSpacing.verticalMd,
              AppAudioPlayer(audioUrl: url),
              AppSpacing.verticalLg,
            ],
          ),
        );
      },
    );
  }
}
