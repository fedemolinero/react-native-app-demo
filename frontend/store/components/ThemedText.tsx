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
  type?: 'default' | 'title' | 'titleAlt' | 'itemTitle' | 'subtitle' | 'toptitle';
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
        type === 'itemTitle' ? styles.itemTitle : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'toptitle' ? styles.toptitle : undefined,
        type === 'titleAlt' ? styles.titleAlt : undefined,
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
  title: {
    fontFamily: 'DMSans-Regular',
    fontStyle: 'normal',
    color: '#323232',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 31,
  },
  titleAlt: {
    fontFamily: 'DMSans-Regular',
    fontStyle: 'normal',
    color: '#0F0D23',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 31,
  },
  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 18,
    color: '#323232',
    lineHeight: 23,
  },
  toptitle: {
    fontFamily: 'DMSans-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 21,
    color: '#646464',
    opacity: 0.6,
  },
  itemTitle: {
    fontFamily: 'DMSans-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
    color: '#323232'
  }
});