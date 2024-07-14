import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

const DotsIcon = () => {
  return (
    <TouchableHighlight onPress={() => { }}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Rect width="40" height="40" rx="12" fill="white" />
        <Circle cx="13.5" cy="19.5" r="1.5" fill="#323232" />
        <Circle cx="20.5" cy="19.5" r="1.5" fill="#323232" />
        <Circle cx="27.5" cy="19.5" r="1.5" fill="#323232" />
      </Svg>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  }
});

export default DotsIcon;
