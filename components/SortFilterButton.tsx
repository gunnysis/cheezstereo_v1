import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export interface SortOption {
  label: string;
  value: 'date' | 'viewCount' | 'relevance' | 'title';
}

interface SortFilterButtonProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
  options: SortOption[];
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SortFilterButton({
  currentSort,
  onSortChange,
  options,
}: SortFilterButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useSharedValue(1);

  const currentLabel =
    options.find((opt) => opt.value === currentSort)?.label || '정렬';

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setModalVisible(true);
  };

  const handleSortSelect = (value: string) => {
    onSortChange(value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(false);
  };

  return (
    <>
      <AnimatedTouchable
        onPress={handlePress}
        style={animatedButtonStyle}
        className="flex-row items-center bg-white px-4 py-3 rounded-xl shadow-md min-h-[44px]"
        activeOpacity={0.9}
        accessibilityLabel={`정렬: ${currentLabel}. 두 번 탭하여 변경`}
        accessibilityRole="button"
        accessibilityHint="정렬 옵션을 엽니다"
      >
        <Text className="text-gray-700 text-base font-semibold mr-1">
          {currentLabel}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#374151" />
      </AnimatedTouchable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          className="flex-1 bg-black/50 justify-center items-center"
        >
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <Animated.View
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown.duration(200)}
            className="bg-white rounded-2xl w-4/5 max-w-sm overflow-hidden shadow-2xl"
          >
            <View className="bg-red-500 px-6 py-4">
              <Text className="text-white text-xl font-bold">정렬 옵션</Text>
            </View>
            <ScrollView className="max-h-96">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleSortSelect(option.value)}
                  className={`px-6 py-4 border-b border-gray-100 flex-row items-center justify-between ${
                    currentSort === option.value ? 'bg-red-50' : ''
                  }`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-base ${
                      currentSort === option.value
                        ? 'text-red-500 font-bold'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                  {currentSort === option.value && (
                    <Ionicons name="checkmark-circle" size={24} color="#ef4444" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="px-6 py-4 border-t border-gray-200"
              activeOpacity={0.7}
            >
              <Text className="text-center text-gray-600 text-base font-semibold">닫기</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
}
