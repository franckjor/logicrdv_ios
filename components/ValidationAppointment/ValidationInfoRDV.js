/*
  This React Native component, ValidationInfoRDV, is used to display validation information related to a medical appointment.
  It includes details such as title, date, doctor's name, place, and patient's name.

  Component Structure:
  - View: Main container for the component.
    - View: Container for the appointment details.
      - CustomText: Displays the title of the appointment with specified styling.
      - MaterialCommunityIcons: Displays an icon for the appointment date.
      - CustomText: Displays the date of the appointment.
      - Icon: Displays an icon for the doctor's name.
      - CustomText: Displays the doctor's name.
      - MaterialIcons: Displays an icon for the appointment place.
      - CustomText: Displays the appointment place.
      - Icon: Displays an icon for the patient's name.
      - CustomText: Displays the patient's name.

  Props:
  - title: Title of the appointment.
  - date: Date of the appointment.
  - doctor: Name of the doctor.
  - place: Place of the appointment.
  - patient: Name of the patient.

  Styles:
  - Styles are defined for each individual component, including the main container, title, details containers, and icons, providing consistent appearance and layout.
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../global/CustomText';

const ValidationInfoRDV = ({ title, date, doctor, place, patient }) => {
  return (
    <View style={styles.card}>
      <View style={styles.compartment}>
        <View style={styles.titleRDV}>
          <CustomText
            fontSize={15}
            fontWeight={700}
            color={colors.black}
            style={styles.title}>
            {title}
          </CustomText>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={18}
            color={colors.blue}
            marginRight={5}
          />
          <CustomText fontSize={14} color={colors.black}>
            {date}
          </CustomText>
        </View>
        <View style={styles.detailsContainer}>
          <Icon
            name="user-large"
            size={16}
            color={colors.blue}
            marginRight={5}
          />
          <CustomText fontSize={14} color={colors.black}>
            {doctor}
          </CustomText>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialIcons
            name="shopping-bag"
            size={16}
            color={colors.blue}
            marginRight={5}
          />
          <CustomText fontSize={14} color={colors.black}>
            {place}
          </CustomText>
        </View>
        <View style={styles.detailsContainer}>
          <Icon
            name="user-group"
            size={16}
            color={colors.blue}
            marginRight={5}
          />
          <CustomText fontSize={14} color={colors.black} style={{ flex: 1 }} numberOfLines={1}>
            {patient}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 10,
  },
  compartment: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'column',
    gap: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
  titleRDV: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
    textAlign: 'center'
  },
});

export default ValidationInfoRDV;
