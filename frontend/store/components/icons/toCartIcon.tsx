import React from 'react';
import { TouchableHighlight } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const ToCartIcon = () => {
  return (
    <TouchableHighlight onPress={() => { }}>
      <Svg width="54" height="54" viewBox="0 0 54 54" fill="none">
        <Rect x="0.4" y="0.4" width="53.2" height="53.2" rx="11.6" stroke="#FF9F24" strokeWidth="0.8" />
        <Circle cx="27" cy="21" r="4.25" stroke="#FF9F24" strokeWidth="1.5" />
        <Path d="M19.3062 24.5969C19.5095 22.9705 20.8921 21.75 22.5311 21.75H31.4689C33.1079 21.75 34.4905 22.9705 34.6938 24.5969L35.6938 32.5969C35.9362 34.5367 34.4237 36.25 32.4689 36.25H21.5311C19.5763 36.25 18.0638 34.5367 18.3062 32.5969L19.3062 24.5969Z" fill="white" stroke="#FF9F24" strokeWidth="1.5" />
        <Circle cx="24.75" cy="25.75" r="0.75" fill="#FF9F24" />
        <Circle cx="28.75" cy="25.75" r="0.75" fill="#FF9F24" />
      </Svg>
    </TouchableHighlight>
  );
};

export default ToCartIcon;
