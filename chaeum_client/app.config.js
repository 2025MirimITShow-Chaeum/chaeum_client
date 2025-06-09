import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      webClientId: process.env.WEB_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID
    },
  };
};