/*
  LoadingComponent:

  This component displays a loading indicator with spinning animations. It includes customizable
  properties such as the text to display and the color of the spinner. The spinner consists of
  two parts spinning in opposite directions, providing a visually appealing effect.

  Props:
  - nom (string, optional): The text to display alongside the loading indicator.
  
  Usage:
  <LoadingComponent nom="Loading..." />

*/

import React from 'react';
import { View, Dimensions, Animated, Easing, StyleSheet, Text } from 'react-native';
import CustomActivityIndicator from './CustumActivatir';

const LoadingComponent = ({ nom }) => {
   const spinValue = new Animated.Value(0);
   
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

   const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
   const spin2 = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });
 
  return (
    <View style={styles.overlay}>
      <View style={styles.loadingContainer}>
        <View style={styles.spinnerContainer}>
          <CustomActivityIndicator spin={spin} style={styles.spinner} />
          <CustomActivityIndicator spin = {spin2} style={[styles.spinner, styles.spinnerInner]} color='#f04d6c'  />
        </View>
        {nom && <Text style={styles.text}>{nom}</Text>}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff', 
    height: 80,
    width:260,
    borderRadius: 10, 
  },
  spinnerContainer: {
    width: 90,
    height: 80,
    justifyContent: 'center',
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spinnerInner: { 
    transform: [{ scale: 0.8 }], 
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4b7ab8'
  },
});

export default LoadingComponent;
