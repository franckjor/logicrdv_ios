/*
  This React Native component is used to display the availability of appointments for a particular date.
  It takes two props as input: 'date' for the date and 'appointments' for an array of appointment objects.
  The component splits the 'date' prop into 'day' and 'dateString' for better formatting.

  Component Structure:
  - View: Main container for the component.
    - View: Container for displaying the day and date.
      - CustomText: Displays the day with specific formatting.
      - CustomText: Displays the date with specific formatting.
    - ScrollView: Enables horizontal scrolling.
      - Appointment_Disponibility_Hours: Renders each appointment's availability time and doctor.

  Styles:
  - container: Layout styles for the main container.
  - day: Layout styles for the container displaying the day and date.
*/
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Appointment_Disponibility_Hours from './Appointment_Disponibility_Hours';
import { colors } from '../global/colors';
import CustomText from '../global/CustomText';

const Appointment_Disponibility = ({ label, label2, creneaux, message, handleValidationAppointment }) => {

  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <View style={styles.leftnow} >
          <CustomText fontSize={14} fontWeight={700} style={{ color: colors.black }}>
            {label}
          </CustomText>
          <CustomText fontSize={12} fontWeight={700} style={{ color: colors.blue }}>
            {label2}
          </CustomText>
        </View  >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {creneaux?.map((creneau, index) => (
            <TouchableOpacity key={index} onPress={() => handleValidationAppointment(creneau)}>
              <Appointment_Disponibility_Hours
                time={creneau.fromhour}
                doctor={creneau.doctor}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {creneaux?.length === 0 && (
          <View style={[styles.fullWidth, { padding: 15, backgroundColor: colors.gray }]}>
            <CustomText fontSize={12} color={colors.gray500} style={{ marginRight: 35, textAlign: "center" }}>
              {message}
            </CustomText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  day: {
    flexDirection: 'row',
    //justifyContent: "space-between",
    marginVertical: 2,
  },
  leftnow: {
    width: 84,
    alignItems: "center",
    marginRight:4,

  },
  fullWidth: {
    width: '90%',
  },
  rigthnow: {
    justifyContent: "space-between",
    alignContent: "flex-start"
  }

});

export default Appointment_Disponibility;
