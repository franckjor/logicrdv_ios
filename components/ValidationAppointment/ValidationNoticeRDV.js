/*
  This React Native component, ValidationNoticeRDV, is used to display a validation notice related to a medical appointment.
  It typically contains a message or information regarding the appointment.

  Component Structure:
  - View: Main container for the component.
    - View: Container for the validation notice content.
      - CustomText: Displays the notice content with specified styling.

  Props:
  - container: Content of the validation notice.
  - fontWeight: Font weight for the notice content.

  Styles:
  - Styles are defined for the main container and the compartment, providing consistent appearance and layout.
*/

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../global/colors';
import CustomText from '../global/CustomText';

const ValidationNoticeRDV = ({container, fontWeight}) => {
  return (
    <View style={styles.card}>
      <View style={styles.compartment}>
        <CustomText fontSize={14} color={colors.black} fontWeight={fontWeight}>
          {container}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 5,
  },
  compartment: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default ValidationNoticeRDV;
