/*
  Usage of CustomActivityIndicator:

  This component renders a custom activity indicator with customizable properties such as color,
  thickness, size, and gap space. It can be used to display loading or processing states in
  applications.

  Props:
  - color (string, optional): The color of the spinner (default: '#ff935c').
  - thickness (number, optional): The thickness of the spinner lines (default: 5).
  - size (number, optional): The size of the spinner (default: 60).
  - gapSpace (number, optional): The gap space between the spinner lines (default: 10).
  - style (object, optional): Additional styles to apply to the component.
  - spin (Animated.Value, optional): The animation value for controlling the rotation of the spinner.

  Example usage:
  <CustomActivityIndicator
    color="#ff0000"
    thickness={4}
    size={50}
    gapSpace={8}
    style={{ marginVertical: 20 }}
  />
*/



import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const CustomActivityIndicator = ({ color, thickness, size, gapSpace, style, spin }) => {
 

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.spinnerContainer, { width: size, height: size }]}>
        <Animated.View
          style={[
            styles.spinner,
            {
              borderTopColor: color,
              borderBottomColor: color,
              borderLeftColor: color,
              borderTopWidth: thickness,
              borderBottomWidth: thickness,
              borderLeftWidth: thickness,
              width: size,
              height: size,
              transform: [{ rotate: spin }],
            },
          ]}
        />
        <View style={[styles.gap, { width: size - thickness * 2, height: gapSpace }]} />
      </View>
    </View>
  );
};

CustomActivityIndicator.defaultProps = {
  color: '#ff935c',
  thickness: 5,
  size: 60,
  gapSpace: 10,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderRadius: 50,
  },
});

export default CustomActivityIndicator;
