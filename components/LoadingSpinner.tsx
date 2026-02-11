import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = '로딩 중...' }: LoadingSpinnerProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      className="flex-1 items-center justify-center bg-gray-50"
    >
      <View className="bg-white p-8 rounded-2xl shadow-lg items-center">
        <ActivityIndicator size="large" color="#ef4444" />
        <Text className="mt-4 text-gray-700 text-base font-medium">{message}</Text>
      </View>
    </Animated.View>
  );
}
