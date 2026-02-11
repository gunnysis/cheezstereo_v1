import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-6">
      {/* 아이콘 */}
      <View className="bg-red-50 p-6 rounded-full mb-6">
        <Ionicons name={icon} size={64} color="#ef4444" />
      </View>

      {/* 제목 */}
      <Text className="text-gray-900 text-2xl font-bold text-center mb-3">
        {title}
      </Text>

      {/* 설명 */}
      <Text className="text-gray-600 text-base text-center leading-relaxed mb-8">
        {description}
      </Text>

      {/* 액션 버튼 */}
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-red-500 px-8 py-4 rounded-xl shadow-lg min-h-[48px] justify-center"
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text className="text-white font-bold text-base">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
