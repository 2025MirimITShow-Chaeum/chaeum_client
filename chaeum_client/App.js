import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TestScreen from './screens/testScreen';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 스플래시 화면 계속 보여주기
        await SplashScreen.preventAutoHideAsync();

        // 폰트 로딩
        await Font.loadAsync({
          'Pretendard-Light': require('./assets/fonts/Pretendard-Light.ttf'),
          'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.ttf'),
          'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.ttf'),
          'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.ttf'),
          'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // 준비 완료되면 상태 변경
        setAppIsReady(true);
        // 스플래시 화면 숨기기
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;  // 스플래시 화면 보여지는 중이므로 빈 화면 반환
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Pretendard-Bold', fontSize: 24 }}>폰트 로딩 완료!</Text>
      <TestScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
