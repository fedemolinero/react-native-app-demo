import React from 'react';
import { TouchableHighlight } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const MenuIcon = () => {
  return (
    <TouchableHighlight onPress={() => { }}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Rect width="40" height="40" rx="12" fill="white" />
        <Rect x="12" y="13" width="16" height="1.5" rx="0.75" fill="#0F0D23" />
        <Rect x="12" y="19" width="10" height="1.5" rx="0.75" fill="#0F0D23" />
        <Rect x="12" y="25" width="16" height="1.5" rx="0.75" fill="#0F0D23" />
      </Svg>
    </TouchableHighlight>
  );
};

export default MenuIcon;
