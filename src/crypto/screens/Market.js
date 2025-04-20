import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import MainLayout from '../screens/MainLayout';
import {connect} from 'react-redux';
import {getCoinMarket} from '../stores/market/marketActions';
import {COLORS, SIZES, constants, icons, FONTS} from '../constants';
import {HeaderBar, TextButton} from '../components';
import {LineChart} from 'react-native-chart-kit';
import {measure} from 'react-native-reanimated';

const marketTabs = constants.marketTabs.map(marketTab => ({
  ...marketTab,
  ref: React.createRef(),
}));

const Market = ({getCoinMarket, coins}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrolllViewRef=useRef();
  const marketTabPress=useCallback(marketTabIndex=>{
    marketTabScrolllViewRef.current.scrollToOffset({
      offset:marketTabIndex* SIZES.width 
    })
  })
  useEffect(() => {
    getCoinMarket();
  }, []);
  const TabIndicator = ({measureLayout, scrollX}) => {
    const inputRange = marketTabs.map((_, i) => i * SIZES.width);
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map(measure => measure.x),
    });
    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          height: '100%',
          width: (SIZES.width - SIZES.radius * 2) / 2,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray,
          transform: [{translateX}],
        }}></Animated.View>
    );
  };
  const Tabs = ({scrollX,marketTabPress}) => {
    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = React.useRef();
    useEffect(() => {
      let ml = [];
      marketTabs.map(marketTab => {
        marketTab.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            ml.push({
              x,
              y,
              width,
              height,
            });
            if (ml.length == marketTabs.length) {
              setMeasureLayout(ml);
            }
          },
        );
      });
    }, [containerRef.current]);
    return (
      <View style={{flexDirection: 'row'}} ref={containerRef}>
        {/* Tab Indicator start */}
        {measureLayout.length > 0 && (
          <TabIndicator
            measureLayout={measureLayout}
            scrollX={scrollX}></TabIndicator>
        )}
        {/* Tab Indicator end */}

        {/* Tabs start */}
        {marketTabs.map((item, index) => {
          return (
            <TouchableOpacity key={`MarketTab-${index}`} style={{flex: 1}}
                  onPress={()=>marketTabPress(index)}
            >
              <View
                ref={item.ref}
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.h3}}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {/* Tabs End */}
      </View>
    );
  };

  const renderTabBar = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.radius,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs scrollX={scrollX}
              marketTabPress={marketTabPress}
        ></Tabs>
      </View>
    );
  };
  const renderButtons = () => {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.radius,
          flexDirection: 'row',
        }}>
        <TextButton label={'USD'}></TextButton>
        <TextButton
          label={'% (7d)'}
          containerStyle={{marginLeft: SIZES.base}}></TextButton>
        <TextButton
          label={'Top'}
          containerStyle={{marginLeft: SIZES.base}}></TextButton>
      </View>
    );
  };
  const renderList = () => {
    return (
      <Animated.FlatList
      ref={marketTabScrolllViewRef}
        data={marketTabs}
        containerStyle={{marginTop: SIZES.padding}}
        horizontal
        scrollEventThrottle={16}
        paddingEnabled
        keyExtractor={item => item.id}
        snapToAlignment="center"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          return (
            <View style={{flex: 1, width: SIZES.width}}>
              <FlatList
                data={coins}
                keyExtractor={item => item.index}
                renderItem={({item, index}) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  return (
                    <View
                      style={{
                        paddingHorizontal: SIZES.padding,
                        flexDirection: 'row',
                        marginBottom: SIZES.radius,
                      }}>
                      {/* start coins */}
                      <View
                        style={{
                          flex: 1.5,
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{height: 20, width: 20}}></Image>
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      {/* end coins */}

                      {/* Line chart start */}
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{paddingRight: 0}}></LineChart>
                      </View>
                      {/* Line chart end */}

                      {/* Figure start */}
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          flex: 1,
                        }}>
                        <Text style={{color: COLORS.white, ...FONTS.h4}}>
                          ${item.current_price}
                        </Text>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {item.price_change_percentage_7d_in_currency != 0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{rotate: '45deg'}]
                                    : [{rotate: '125deg'}],
                              }}></Image>
                          )}
                          <Text
                            style={{
                              color: priceColor,
                              marginLeft: 5,
                              ...FONTS.h5,
                            }}>
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2,
                            )}{' '}
                            %
                          </Text>
                        </View>
                      </View>
                      {/* Figure end */}
                    </View>
                  );
                }}></FlatList>
            </View>
          );
        }}></Animated.FlatList>
    );
  };

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header start */}
        <HeaderBar title="Market"></HeaderBar>
        {/* Header End */}

        {/* TabBar start */}
        {renderTabBar()}
        {/* TabBar End */}
        {renderButtons()}
        {/* Buttons start */}
        {/* Buttons End */}

        {/* Market List start */}
        {renderList()}
        {/* Market List End */}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkLine,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkLine,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
