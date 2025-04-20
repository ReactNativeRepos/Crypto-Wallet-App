import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants';

const TextButton = ({label,containerStyle,onPress}) => {
  return (
    <TouchableOpacity
      style={{
        height: 100,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:3,
        borderRadius:15,
        backgroundColor:COLORS.gray,
        ...containerStyle
      }}>
      <Text style={{color: COLORS.white, ...FONTS.h3}}>{label}</Text>
    </TouchableOpacity>
  )
}

export default TextButton;
