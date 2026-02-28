abstract final class ApiEndpoints {
  static const String baseUrl = 'http://localhost:3000/api/v1';

  // Auth
  static const String authGoogle = '/auth/google';
  static const String authRefresh = '/auth/refresh';
  static const String authMe = '/auth/me';

  // Conversations
  static const String conversations = '/conversations';
  static String conversationById(String id) => '/conversations/$id';
  static String endConversation(String id) => '/conversations/$id/end';

  // Stories
  static const String stories = '/stories';
  static const String storiesSearch = '/stories/search';
  static const String storiesTimeline = '/stories/timeline';
  static String storyById(String id) => '/stories/$id';
  static String bookmarkStory(String id) => '/stories/$id/bookmark';

  // Persona
  static const String personaAsk = '/persona/ask';
  static const String personaHistory = '/persona/history';

  // Family
  static const String familyInvite = '/family/invite';
  static const String familyMembers = '/family/members';
  static const String familyVault = '/family/vault';

  // Voice
  static const String voiceProfile = '/voice/profile';
  static const String voiceCloneUpdate = '/voice/clone/update';
}
