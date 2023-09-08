import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {useExampleContext} from '../../hooks/useExampleContext';
import {SliderTypes} from './types';

const Slider = ({onEnded}: SliderTypes) => {
  const {sharedSliderValue} = useExampleContext();

  const slideHandler = useAnimatedGestureHandler({
    onStart: (_ev: any, ctx: any) => {
      ctx.startX = sharedSliderValue.value;
    },
    onActive: (_ev, ctx) => {
      sharedSliderValue.value = ctx.startX + _ev.translationX;
    },
    onEnd: () => {
      runOnJS(onEnded)();
    },
  });
  const animatedSliderStyle = useAnimatedStyle(
    () => ({
      transform: [{translateX: sharedSliderValue.value}],
    }),
    [],
  );

  return (
    <GestureHandlerRootView>
      <View style={sliderStyle.sliderContainer}>
        <View style={sliderStyle.sliderInactive}>
          <PanGestureHandler onGestureEvent={slideHandler}>
            <Animated.View
              style={[
                animatedSliderStyle,
                sliderStyle.sliderDefault,
              ]}></Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const sliderStyle = StyleSheet.create({
  sliderDefault: {
    backgroundColor: 'black',
    width: 20,
    height: 20,
    borderRadius: 20,
    position: 'absolute',
    bottom: -8,
  },
  sliderInactive: {
    height: 3,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#ccc',
    display: 'flex',
  },
  sliderContainer: {
    height: '5%',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
  },
});
export default Slider;
