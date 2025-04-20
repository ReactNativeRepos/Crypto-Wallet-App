import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {COLORS, SIZES, icons} from '../constants';
import IconTextButton from '../components/IconTextButton';
import {connect} from 'react-redux';

const MainLayout = ({children, isTradeModalVisible}) => {
  const modalAnimaterValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimaterValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimaterValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimaterValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 50 : 10}}>
      {children}

      {isTradeModalVisible && (
        <Animated.View
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'absolute',
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimaterValue}></Animated.View>
      )}
      <Animated.View
        style={{
          top: modalY,
          padding: SIZES.padding,
          width: '100%',
          left: 0,
          position: 'absolute',
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          onPress={() => {
            console.log('Transfer');
          }}
          icon={icons.send}
          label="Transfer"></IconTextButton>
        <IconTextButton
          onPress={() => {
            console.log('Withdraw');
          }}
          icon={icons.withdraw}
          label="Withdraw"
          containerStyle={{marginTop: SIZES.base}}></IconTextButton>
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // setTradeModalVisibility: (isVisible) => {
    //     return dispatch(setTradeModalVisibility(isVisible))
    // }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
