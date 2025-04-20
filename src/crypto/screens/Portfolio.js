import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import MainLayout from '../screens/MainLayout';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getHoldings} from '../stores/market/marketActions';
import {BalanceInfo, Chart} from '../components';
import {FONTS, COLORS, SIZES, dummyData, icons} from '../constants';

const Portfolio = ({myHoldings, getHoldings}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
    }, []),
  );

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let perChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.gray,
        }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.largeTitle,
          }}>
          Portfolio
        </Text>
        <BalanceInfo
          title={'Current Balance'}
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header - Current Blance */}
        {renderCurrentBalanceSection()}
        {/* Chart */}
        <Chart
          containerStyle={{marginTop: SIZES.radius, flex: 1}}
          chartPrices={
            selectedCoin
              ? selectedCoin.sparkline_in_7d.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }></Chart>

        {/*Your  Asset  */}
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              {/* Section Title */}
              <Text style={{color: COLORS.white, ...FONTS.h2}}>
                Your Assets
              </Text>
              {/* Header label */}
              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                <Text style={{flex: 1, color: COLORS.lightGray3}}>Asset</Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{flexDirection: 'row', height: 55}}
                onPress={() => setSelectedCoin(item)}>
                {/* Assets */}
                <View
                  style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}></Image>
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    {item.name}
                  </Text>
                </View>
                {/* Price */}
                <View style={{justifyContent: 'center', flex: 1}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      lineHeight: 15,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    ${item.current_price.toLocaleString()}
                  </Text>

                  {/* change percenntage  */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          width: 10,
                          height: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{rotate: '45deg'}]
                              : [{rotate: '125deg'}],
                        }}></Image>
                    )}
                    <Text
                      style={{
                        lineHeight: 15,
                        color: priceColor,
                        ...FONTS.body5,
                        marginLeft: 5,
                      }}>
                      ${item.price_change_percentage_7d_in_currency.toFixed(2)}{' '}
                      %
                    </Text>
                  </View>
                </View>
                {/* change percenntage  */}

                {/* Holdings */}
                <View style={{justifyContent: 'center', flex: 1}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      lineHeight: 15,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    ${item.total.toLocaleString()}
                  </Text>

                  <Text
                    style={{
                      textAlign: 'right',
                      lineHeight: 15,
                      color: COLORS.lightGray3,
                      ...FONTS.body5,
                    }}>
                    ${item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}></FlatList>
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkLine,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
