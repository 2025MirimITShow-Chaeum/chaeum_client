// app.config.js
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    // Firebase 세팅
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
    webClientId: process.env.WEB_CLIENT_ID,
    iosClientId: process.env.IOS_CLIENT_ID,

    // 백엔드 베이스 URL (iOS 시뮬레이터에선 localhost:8080)
    BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  },
});
