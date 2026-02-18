import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function SkeletonCard() {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-400, 400]
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4 mx-4 overflow-hidden">
      <View className="w-full aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        <Animated.View style={[{ width: 400, height: '100%' }, animatedStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
      </View>

      <View className="p-4">
        <View className="mb-3">
          <View className="h-5 bg-gray-200 dark:bg-gray-600 rounded-md mb-2 w-full" />
          <View className="h-5 bg-gray-200 dark:bg-gray-600 rounded-md w-3/4" />
        </View>
        <View className="h-4 bg-gray-200 dark:bg-gray-600 rounded-md w-24" />
      </View>
    </View>
  );
}
