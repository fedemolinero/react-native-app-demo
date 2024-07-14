import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

// The expo-splash-screen library provides SplashScreen component that you 
// can use to prevent rendering the app until the font is loaded and ready.
SplashScreen.preventAutoHideAsync();

// define fonts to be loaded
const fetchFonts = async () => {
  await Font.loadAsync({
    'DMSans-Regular': require('@/assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Bold': require('@/assets/fonts/DMSans-Bold.ttf'),
  });
};

// State to control if fonts loaded

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Load fonts 
  useEffect(() => {
    async function loadFonts() {
      await fetchFonts();
      SplashScreen.hideAsync();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
    // Can be changed to a load indicator if needed
  }
  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  defaultSemiBold: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#000000',
  },
  title: {
    fontFamily: 'DMSans-Regular',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  link: {
    fontFamily: 'DMSans-Regular',
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
