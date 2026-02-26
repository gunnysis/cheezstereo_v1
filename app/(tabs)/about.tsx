import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { BAND_INFO } from '../../constants/about';
import { ALBUMS } from '../../constants/catalog';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row py-3 border-b border-gray-100 dark:border-gray-800">
      <Text className="text-gray-500 dark:text-gray-400 text-sm w-24">{label}</Text>
      <Text className="text-gray-900 dark:text-gray-100 text-sm flex-1 font-medium">{value}</Text>
    </View>
  );
}

export default function AboutScreen() {
  const totalTracks = ALBUMS.reduce((sum, a) => sum + a.tracks.length, 0);

  const openYouTube = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Linking.openURL(BAND_INFO.youtubeUrl);
    } catch {
      Alert.alert('오류', '링크를 열 수 없습니다.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900" contentContainerStyle={{ paddingBottom: 88 }}>
      {/* 히어로 */}
      <View className="bg-yellow-200 dark:bg-gray-800 items-center py-10 px-6">
        <View className="w-24 h-24 bg-red-500 rounded-full items-center justify-center mb-4">
          <Ionicons name="musical-notes" size={40} color="#ffffff" />
        </View>
        <Text className="text-gray-900 dark:text-gray-100 text-3xl font-extrabold tracking-tight">
          {BAND_INFO.name}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-base mt-1">{BAND_INFO.nameEn}</Text>
        <View className="flex-row items-center mt-3 bg-white/60 dark:bg-gray-700/60 rounded-full px-4 py-1.5">
          <Ionicons name="time-outline" size={14} color="#6b7280" />
          <Text className="text-gray-600 dark:text-gray-400 text-sm ml-1.5">
            {BAND_INFO.activeYears}
          </Text>
        </View>
      </View>

      {/* 통계 */}
      <View className="flex-row bg-white dark:bg-gray-800 mx-4 mt-4 rounded-2xl overflow-hidden shadow-sm">
        {[
          { value: String(ALBUMS.length), label: '앨범' },
          { value: String(totalTracks), label: '트랙' },
          { value: String(BAND_INFO.stats.videos), label: '영상' },
        ].map((stat, i, arr) => (
          <View
            key={stat.label}
            className={`flex-1 items-center py-4${i < arr.length - 1 ? ' border-r border-gray-100 dark:border-gray-700' : ''}`}
          >
            <Text className="text-red-500 text-2xl font-extrabold">{stat.value}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* 밴드 소개 */}
      <View className="bg-white dark:bg-gray-800 mx-4 mt-4 rounded-2xl p-4 shadow-sm">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-base mb-2">밴드 소개</Text>
        <Text className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {BAND_INFO.bio}
        </Text>
      </View>

      {/* 멤버 */}
      <View className="bg-white dark:bg-gray-800 mx-4 mt-4 rounded-2xl p-4 shadow-sm">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-base mb-3">멤버</Text>
        {BAND_INFO.members.map((member, i) => (
          <View
            key={member.name}
            className={`flex-row items-center py-2.5${i < BAND_INFO.members.length - 1 ? ' border-b border-gray-100 dark:border-gray-700' : ''}`}
          >
            <View className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name="person" size={18} color="#ef4444" />
            </View>
            <View>
              <Text className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                {member.name}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">{member.role}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 정보 */}
      <View className="bg-white dark:bg-gray-800 mx-4 mt-4 rounded-2xl p-4 shadow-sm">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-base mb-1">정보</Text>
        <InfoRow label="장르" value={BAND_INFO.genre} />
        <InfoRow label="레이블" value={BAND_INFO.labels.join(' · ')} />
        <InfoRow label="활동 기간" value={BAND_INFO.activeYears} />
      </View>

      {/* 링크 */}
      <View className="bg-white dark:bg-gray-800 mx-4 mt-4 rounded-2xl overflow-hidden shadow-sm">
        <TouchableOpacity
          onPress={openYouTube}
          activeOpacity={0.7}
          className="flex-row items-center px-4 py-4"
          accessibilityRole="link"
          accessibilityLabel="YouTube 채널 열기"
        >
          <View className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg mr-3">
            <Ionicons name="logo-youtube" size={22} color="#ef4444" />
          </View>
          <Text className="text-gray-900 dark:text-gray-100 font-medium flex-1">YouTube 채널</Text>
          <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* 앱 정보 */}
      <View className="items-center py-8">
        <Text className="text-gray-400 dark:text-gray-600 text-xs">CheezStereo App v1.3.0</Text>
        <Text className="text-gray-400 dark:text-gray-600 text-xs mt-0.5">
          Made with ♥ for CheezStereo fans
        </Text>
      </View>
    </ScrollView>
  );
}
