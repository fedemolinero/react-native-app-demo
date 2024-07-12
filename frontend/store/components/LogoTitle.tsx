import React from 'react';
import { Image, View } from 'react-native';

const LogoTitle = () => {
  return (
    <View>
      <Image
        style={{ width: 50, height: 50, borderRadius:30, marginRight:20 }}
        source={require('@/assets/profile-img.jpg')}
      />
    </View>
  );
};

export default LogoTitle;
