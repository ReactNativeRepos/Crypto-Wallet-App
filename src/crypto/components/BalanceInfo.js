import React from 'react';
import { Text, View, Image } from 'react-native';
import { SIZES, COLORS, FONTS, icons } from '../constants';


const BalanceInfo = ({ title, changePct, containerStyle, displayAmount }) => {
    return (
        <View style={{ ...containerStyle }}>
            {/* Title */}
            <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>{title}</Text>

            {/* Figures */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>$</Text>
                <Text style={{ color: COLORS.white, ...FONTS.h2, marginLeft: SIZES.base }}>{displayAmount}</Text>
                <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}> USD</Text>
            </View>
            {/* Change Percentage */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>{
                changePct !== 0 &&
                <Image source={icons.upArrow}
                    style={{
                        height: 10,
                        width: 10,
                        alignItems: 'center',
                        tintColor: (changePct > 0) ? COLORS.lightGreen : COLORS.red,
                        transform: (changePct > 0) ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                    }}
                ></Image>
            }
                <Text style={{
                    marginLeft: SIZES.base,
                    alignSelf: 'flex-end',
                    color: (changePct === 0 ? COLORS.lightGray3 : changePct > 0 ?
                        COLORS.lightGreen : COLORS.red), ...FONTS.h4
                }}>{changePct.toFixed(2)} % </Text>


                <Text style={{
                    marginLeft: SIZES.radius,
                    alignSelf: 'flex-end',
                    color:COLORS.lightGray3 , 
                    ...FONTS.h5
                }}>7d change</Text>

            </View>
        </View>
    )
}

export default BalanceInfo;

