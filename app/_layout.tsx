import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// #region agent log
const runId = 'post-fix';
fetch('http://127.0.0.1:7249/ingest/6c7428a1-eb6f-4814-9976-39d6a66064e5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/_layout.tsx:RootLayout',message:'React version at runtime',data:{reactVersion:React.version,runId},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
// #endregion

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
