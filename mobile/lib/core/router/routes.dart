abstract final class Routes {
  static const String login = '/login';
  static const String home = '/home';
  static const String vault = '/home/vault';
  static const String conversations = '/home/conversations';
  static const String persona = '/home/persona';
  static const String profile = '/home/profile';
  
  static const String storyDetail = '/vault/story/:id';
  static String storyDetailPath(String id) => '/vault/story/$id';
  
  static const String conversationDetail = '/conversations/:id';
  static String conversationDetailPath(String id) => '/conversations/$id';
  
  static const String conversationSession = '/conversations/:id/session';
  static String conversationSessionPath(String id) => '/conversations/$id/session';
}
