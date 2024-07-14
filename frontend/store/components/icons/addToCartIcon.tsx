import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const AddToCartIcon = () => {
  return (
    <TouchableOpacity onPress={() => { }}>
      <View>
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <Path d="M0 8C0 3.58172 3.58172 0 8 0H40V32C40 36.4183 36.4183 40 32 40H0V8Z" fill="#FF9F24" />
          <Rect x="19" y="13" width="2" height="14" rx="1" fill="white" />
          <Rect x="13" y="21" width="2" height="14" rx="1" transform="rotate(-90 13 21)" fill="white" />
        </Svg>
      </View>
    </TouchableOpacity>
  );
};

export default AddToCartIcon;
