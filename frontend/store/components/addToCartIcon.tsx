import React from 'react';
import { TouchableHighlight, View } from 'react-native';

const addToCartIcon = () => {
  return (
    <TouchableHighlight onPress={() => { }}>
      <View>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 8C0 3.58172 3.58172 0 8 0H40V32C40 36.4183 36.4183 40 32 40H0V8Z" fill="#FF9F24" />
          <rect x="19" y="13" width="2" height="14" rx="1" fill="white" />
          <rect x="13" y="21" width="2" height="14" rx="1" transform="rotate(-90 13 21)" fill="white" />
        </svg>
      </View>
    </TouchableHighlight>
  );
};

export default addToCartIcon;
