import React from 'react';
import { TouchableHighlight, View } from 'react-native';

const MenuIcon = () => {
  return (
    <TouchableHighlight onPress={() => { }}>
      <View>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="12" fill="white" />
          <rect x="12" y="13" width="16" height="1.5" rx="0.75" fill="#0F0D23" />
          <rect x="12" y="19" width="10" height="1.5" rx="0.75" fill="#0F0D23" />
          <rect x="12" y="25" width="16" height="1.5" rx="0.75" fill="#0F0D23" />
        </svg>
      </View>
    </TouchableHighlight>
  );
};

export default MenuIcon;
