import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 50,
                borderRadius: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image resizeMode='contain' source={icon} style={{ width: 20, height: 20 }} ></Image>
            <Text style={{ marginLeft: SIZES.base, ...FONTS.h3 }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default IconTextButton;
