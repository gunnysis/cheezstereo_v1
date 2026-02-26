import React, { memo, useState } from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface VideoThumbnailProps {
  uri: string;
  showGradient?: boolean;
  showPlayIcon?: boolean;
}

function VideoThumbnail({ uri, showGradient = true, showPlayIcon = true }: VideoThumbnailProps) {
  const [error, setError] = useState(false);

  return (
    <View className="w-full aspect-video bg-gray-200 dark:bg-gray-700 relative">
      {!error ? (
        <Image
          source={{ uri }}
          className="w-full h-full"
          resizeMode="cover"
          onError={() => setError(true)}
        />
      ) : (
        <View className="w-full h-full items-center justify-center bg-gray-300 dark:bg-gray-600" />
      )}

      {showGradient && (
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute bottom-0 left-0 right-0 h-20"
        />
      )}

      {showPlayIcon && (
        <View className="absolute inset-0 items-center justify-center">
          <View className="bg-red-500/90 p-4 rounded-full">
            <Ionicons name="play" size={28} color="#ffffff" />
          </View>
        </View>
      )}
    </View>
  );
}

export default memo(VideoThumbnail);
