import React from 'react';
import { TouchableHighlight, View } from 'react-native';

const DotsIcon = () => {
  return (
    <TouchableHighlight onPress={() => { }}>
      <View>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="12" fill="white" />
          <circle cx="13.5" cy="19.5" r="1.5" fill="#323232" />
          <circle cx="20.5" cy="19.5" r="1.5" fill="#323232" />
          <circle cx="27.5" cy="19.5" r="1.5" fill="#323232" />
        </svg>
      </View>
    </TouchableHighlight>
  );
};

export default DotsIcon;
