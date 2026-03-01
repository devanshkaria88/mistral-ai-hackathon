abstract final class ApiEndpoints {
  static const String baseUrl =
      'https://supercerebellar-nonmaritally-harris.ngrok-free.dev';

  // Auth
  static const String authGoogle = '/api/auth/google';
  static const String authRefresh = '/api/auth/refresh';
  static const String authMe = '/api/auth/me';

  // Conversations
  static const String conversations = '/api/conversations';
  static String conversationById(String id) => '/api/conversations/$id';
  static String endConversation(String id) => '/api/conversations/$id/end';
  static String personaConversations(String personaUserId) =>
      '/api/conversations/persona/$personaUserId';

  // Stories
  static const String stories = '/api/stories';
  static const String storiesSearch = '/api/stories/search';
  static const String storiesTimeline = '/api/stories/timeline';
  static String storyById(String id) => '/api/stories/$id';
  static String bookmarkStory(String id) => '/api/stories/$id/bookmark';

  // Persona
  static const String personaAsk = '/api/persona/ask';
  static const String personaHistory = '/api/persona/history';

  // Family
  static const String familyInvite = '/api/family/invite';
  static const String familyMembers = '/api/family/members';
  static const String familyVault = '/api/family/vault';

  // Voice
  static const String voiceProfile = '/api/voice/profile';
  static const String voiceCloneUpdate = '/api/voice/update-clone';
  static const String voiceSamples = '/api/voice/samples';
}
