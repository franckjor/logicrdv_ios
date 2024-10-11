import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors } from './colors';
import CustomText from './CustomText';

const CustomAppButton = ({
  title,
  onPress,
  bkgroundColor = '#009688',
  borderWidth,
  alignSelf,
  borderColor = 'blue',
  textColor = colors.black,
  textFontSize = 15,
  paddingHorizontal,
  paddingVertical,
  borderRadius,
  iconComponent,
  marginHorizontal,
  fontWeight,
  width,
  disabled=false
}) => {
  const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
      backgroundColor: bkgroundColor,
      borderRadius: borderRadius,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      alignSelf: alignSelf,
      borderWidth: borderWidth,
      borderColor: borderColor,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: width
    },
    appButtonText: {
      alignSelf: 'center',
      marginHorizontal: marginHorizontal,
      fontWeight: fontWeight,
      opacity: disabled ? 0.5 : 1
    },
    icon: {
      opacity: disabled ? 0.5 : 1
    },
  });
  return (
      <TouchableOpacity onPress={onPress} style={styles.appButtonContainer} disabled={disabled}>
        {iconComponent && (
          <View style={styles.icon}> 
            {iconComponent}
          </View>
        )}
        <CustomText
          fontSize={textFontSize}
          color={textColor}
          style={styles.appButtonText}>
          {title}
        </CustomText>
      </TouchableOpacity>
  );
};

export default CustomAppButton;
