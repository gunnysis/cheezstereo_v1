import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type HeaderVariant = 'tabs' | 'player';

type HeaderProps = {
  title: string;
  /** Optional subtitle (e.g. album year and type) */
  subtitle?: string;
  variant?: HeaderVariant;
  /** false when header is inside SafeAreaView (e.g. player screen) */
  safeAreaTop?: boolean;
  /** Override header background color (e.g. album cover color) */
  backgroundColor?: string;
  leftButton?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  rightButton?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel?: string;
  };
};

const TABS_BG = '#FEF08A';
const TABS_BG_DARK = '#1f2937';
const TABS_TITLE_COLOR = '#713f12';
const TABS_TITLE_COLOR_DARK = '#f3f4f6';
const TABS_BUTTON_COLOR = '#854d0e';
const TABS_BUTTON_COLOR_DARK = '#e5e7eb';

const variantStyles: Record<
  HeaderVariant,
  { titleColor: string; borderColor: string; buttonBg?: string; buttonColor: string }
> = {
  tabs: {
    titleColor: TABS_TITLE_COLOR,
    borderColor: 'rgba(120, 63, 18, 0.12)',
    buttonColor: TABS_BUTTON_COLOR,
  },
  player: {
    titleColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.1)',
    buttonBg: 'rgba(255,255,255,0.1)',
    buttonColor: '#ffffff',
  },
};

export function Header({
  title,
  subtitle,
  variant = 'tabs',
  safeAreaTop = true,
  backgroundColor: backgroundColorProp,
  leftButton,
  rightButton,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const style = variantStyles[variant];
  const defaultBg = variant === 'tabs' && isDark ? TABS_BG_DARK : (variant === 'tabs' ? TABS_BG : '#111827');
  const tabsBg = backgroundColorProp ?? defaultBg;
  const tabsTitleColor = variant === 'tabs' && isDark ? TABS_TITLE_COLOR_DARK : style.titleColor;
  const tabsButtonColor = variant === 'tabs' && isDark ? TABS_BUTTON_COLOR_DARK : style.buttonColor;
  const tabsBorderColor = variant === 'tabs' && isDark ? 'rgba(255,255,255,0.08)' : style.borderColor;

  const containerStyle = [
    styles.container,
    {
      paddingTop: safeAreaTop ? insets.top : 12,
      paddingBottom: 14,
      paddingHorizontal: 16,
      borderBottomLeftRadius: variant === 'tabs' ? 20 : 0,
      borderBottomRightRadius: variant === 'tabs' ? 20 : 0,
      borderBottomWidth: 1,
      borderBottomColor: tabsBorderColor,
      backgroundColor: tabsBg,
    },
    Platform.OS === 'android' && variant === 'tabs' && { elevation: 8 },
    Platform.OS === 'ios' &&
      variant === 'tabs' && {
        shadowColor: '#a16207',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
      },
  ];

  const inner = (
    <View style={styles.inner}>
      {leftButton ? (
        <TouchableOpacity
          onPress={leftButton.onPress}
          style={[
            styles.button,
            variant === 'tabs' && styles.buttonTabs,
            style.buttonBg && { backgroundColor: style.buttonBg },
            variant === 'tabs' && isDark && { backgroundColor: 'rgba(255,255,255,0.1)' },
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={leftButton.accessibilityLabel ?? '뒤로 가기'}
          accessibilityHint={leftButton.icon === 'arrow-back' ? '이전 화면으로 돌아갑니다' : leftButton.icon === 'close' ? '플레이어를 닫습니다' : undefined}
        >
          <Ionicons name={leftButton.icon} size={22} color={tabsButtonColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <View style={styles.titleWrap}>
        <Text
          style={[
            styles.title,
            { color: variant === 'tabs' ? tabsTitleColor : style.titleColor },
            variant === 'tabs' && styles.titleTabs,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: variant === 'tabs' ? (isDark ? '#9ca3af' : '#78716c') : 'rgba(255,255,255,0.8)' }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightButton ? (
        <TouchableOpacity
          onPress={rightButton.onPress}
          style={[
            styles.button,
            variant === 'tabs' && styles.buttonTabs,
            style.buttonBg && { backgroundColor: style.buttonBg },
            variant === 'tabs' && isDark && { backgroundColor: 'rgba(255,255,255,0.1)' },
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={rightButton.accessibilityLabel ?? '버튼'}
          accessibilityHint={rightButton.accessibilityLabel === '채널 링크' ? 'YouTube 채널을 엽니다' : rightButton.accessibilityLabel === '공유하기' ? '영상을 공유합니다' : undefined}
        >
          <Ionicons name={rightButton.icon} size={22} color={variant === 'tabs' ? tabsButtonColor : style.buttonColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );

  return (
    <View
      style={containerStyle}
      accessibilityRole="header"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTabs: {
    backgroundColor: 'rgba(120, 63, 18, 0.08)',
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  titleWrap: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  titleTabs: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
});
