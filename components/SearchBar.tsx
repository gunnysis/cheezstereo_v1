import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: isFocused ? '#ef4444' : 'transparent',
      borderWidth: 2,
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSpring(1.02);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBlur = () => {
    setIsFocused(false);
    scale.value = withSpring(1);
  };

  const handleClear = () => {
    onClear();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-white rounded-xl shadow-md flex-row items-center px-4 py-3 min-h-[48px]"
      accessibilityRole="search"
    >
      <Ionicons name="search" size={22} color={isFocused ? '#ef4444' : '#9ca3af'} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="flex-1 ml-3 text-base text-gray-900"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel={placeholder}
        accessibilityHint="검색어를 입력하세요. 입력 시 목록이 자동으로 필터됩니다."
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          activeOpacity={0.7}
          className="p-2 -m-2 min-w-[44px] min-h-[44px] items-center justify-center"
          accessibilityLabel="검색어 지우기"
          accessibilityRole="button"
        >
          <Ionicons name="close-circle" size={22} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
