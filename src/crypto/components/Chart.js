import React from 'react';
import {View, Text} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import {COLORS, FONTS, SIZES} from '../constants';
import moment from 'moment';

const Chart = ({chartPrices, containerStyle}) => {
  let startUnixTimeStamp = moment().subtract(7, 'day').unix();
  let data = chartPrices
    ? chartPrices.map((item, index) => {
        return {
          x: startUnixTimeStamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({data, range: 40});

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    let selectedDate = new Date(value * 1000);
    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);

    return `${date} / ${month}`;
  };
  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}k`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };
  const getYAxisLabelValues = () => {
    if (chartPrices !== undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);
      let midValue = (minValue + maxValue) / 2;
      let higherMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (midValue + minValue) / 2;
      let roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };
  return (
    <View style={containerStyle}>
      {/* Y axes label  */}
      <View
        style={{
          justifyContent: 'space-between',
          top: 0,
          bottom: 0,
          position: 'absolute',
          left: SIZES.padding,
        }}>
        {getYAxisLabelValues().map((item, index) => {
          return (
            <Text
              key={index}
              style={{color: COLORS.lightGray3, ...FONTS.body4}}>
              {item}
            </Text>
          );
        })}
      </View>

      {/* chart */}
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: 'bezier',
          }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}></ChartPath>

          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                alignItems: 'center',
                backgroundColor: COLORS.transparentBlack1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 25,
                  width: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}></View>
              </View>
              {/* Y label start */}
              <ChartYLabel
                format={formatUSD}
                style={{color: COLORS.white, ...FONTS.body5}}></ChartYLabel>
              {/* X label start */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  color: COLORS.lightGray3,
                  ...FONTS.body5,
                  marginTop: 3,
                  lineHeight: 15,
                }}></ChartXLabel>
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
