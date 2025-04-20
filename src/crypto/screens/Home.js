import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, Image} from 'react-native';
import MainLayout from './MainLayout';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/marketActions';
import {useFocusEffect} from '@react-navigation/native';
import {SIZES, COLORS, FONTS, dummyData, icons} from '../constants';
import {BalanceInfo, IconTextButton, Chart} from '../components';

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, []),
  );

  let totalWallet = myHoldings?.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let perChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={perChange}
          coniatnerStyle={{
            marginTop: 50,
          }}
        />

        <View
          style={{
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
            flexDirection: 'row',
          }}>
          <IconTextButton
            icon={icons.send}
            onPress={() => console.log('Transfer')}
            label="Transfer"
            containerStyle={{
              marginRight: SIZES.radius,
              flex: 1,
              height: 40,
            }}></IconTextButton>

          <IconTextButton
            icon={icons.withdraw}
            onPress={() => {
              console.log('Withdraw');
            }}
            label="Withdraw"
            containerStyle={{
              flex: 1,
              height: 40,
            }}></IconTextButton>
        </View>
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          backgroundColor: COLORS.black,
          flex: 1
        }}>
        {/* Header Section */}
        {renderWalletInfoSection()}
        {/* Chart start */}
        <Chart
          containerStyle={{marginTop: SIZES.padding * 2}}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }></Chart>
        {/* Chart end */}

        {/* Top Crypto Currency */}
        <FlatList
          data={coins}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            marginTop: 30,
          }}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
                Top Cryptocurrency
              </Text>
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
                onPress={() => {
                  setSelectedCoin(item);
                }}
                style={{
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{width: 35}}>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 20, width: 20}}></Image>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{color: COLORS.white, ...FONTS.h3}}>
                    {item.name}
                  </Text>
                </View>

                {/* Figure */}
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                      textAlign: 'right',
                    }}>
                    $ {item.current_price}
                  </Text>

                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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

                    <Text
                      style={{
                        marginLeft: 5,
                        ...FONTS.body5,
                        color: priceColor,
                        lineHeight: 15,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View style={{marginBottom: 50}}></View>
          }></FlatList>
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
