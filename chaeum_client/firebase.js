import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Constants from 'expo-constants';

const {
  apiKey,
  authDomain,
  projectId,
  appId,
} = Constants.expoConfig?.extra ?? {};

console.log('Firebase Config:', { apiKey, authDomain, projectId, appId });

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  appId: appId,
};

// Firebase 앱이 이미 초기화되었는지 확인
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();