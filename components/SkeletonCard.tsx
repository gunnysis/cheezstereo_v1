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
    <View className="bg-white rounded-2xl shadow-lg mb-4 mx-4 overflow-hidden">
      {/* 썸네일 스켈레톤 */}
      <View className="w-full aspect-video bg-gray-200 relative overflow-hidden">
        <Animated.View style={[{ width: 400, height: '100%' }, animatedStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
      </View>

      {/* 정보 영역 스켈레톤 */}
      <View className="p-4">
        {/* 제목 스켈레톤 (2줄) */}
        <View className="mb-3">
          <View className="h-5 bg-gray-200 rounded-md mb-2 w-full" />
          <View className="h-5 bg-gray-200 rounded-md w-3/4" />
        </View>

        {/* 날짜 스켈레톤 */}
        <View className="h-4 bg-gray-200 rounded-md w-24" />
      </View>
    </View>
  );
}
