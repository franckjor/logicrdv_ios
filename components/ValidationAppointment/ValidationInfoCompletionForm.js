/*
  This React Native component, ValidationInfoCompletionForm, is used for validating and completing information in a form.
  It includes three FloatingLabelInput components for entering date of birth, social security number, and reason for appointment.

  FloatingLabelInput Component Structure:
  - View: Main container for the component.
    - Animated.Text: Label for the input field with floating animation.
    - View: Container for TextInput and optional clear icon.
      - TextInput: Input field for entering text.
      - TouchableOpacity: Touchable area for clearing text (if enabled).
        - Icon: Cross icon for clearing text.

  Functionality:
  - FloatingLabelInput: Handles input for date of birth, social security number, and reason for appointment.
    - Displays floating label animation when input is focused or has text.
    - Automatically formats date of birth input to "dd/mm/yyyy" format.
    - Provides option to clear text with a cross icon.
  
  Props:
  - label: Label text for the input field.
  - value: Current value of the input field.
  - onChangeText: Function to handle text input changes.
  - multiline: Boolean indicating whether the input field supports multiple lines.
  - keyboardType: Type of keyboard to be displayed.
  - maxLength: Maximum length of text allowed in the input field.
  - showCrossIcon: Boolean indicating whether to display a clear icon.

  ValidationInfoCompletionForm Component Structure:
  - SafeAreaView: Container for ensuring content renders within safe area boundaries.
    - View: Main container for the form content.
      - View: Container for the form elements, such as FloatingLabelInput components.

  Styles:
  - Styles are defined for each individual component, including input fields, labels, and icons, providing consistent appearance and layout.
*/

import React, { useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/Entypo';
import CustomText from '../global/CustomText';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType,
  maxLength,
  showCrossIcon = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  Animated.timing(animatedIsFocused, {
    toValue: isFocused || value !== '' ? 1 : 0,
    duration: 200,
    useNativeDriver: false,
  }).start();

  const labelStyle = {
    position: 'absolute',
    left: 20,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 10],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  const handleLabelPress = () => {
    setIsFocused(true);
    // Focus the input field programmatically
    inputRef.current.focus();
  };

  const inputRef = useRef(null);

  const clearText = () => {
    onChangeText(''); // Effacer le texte
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        onPress={handleLabelPress}
        style={[labelStyle, styles.label]}>
        {label}
      </Animated.Text>
      <View>
        <TextInput
          ref={inputRef}
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          keyboardType={keyboardType}
          maxLength={maxLength}
          {...rest}
        />
        {showCrossIcon && value !== '' && (
          <TouchableOpacity onPress={clearText}>
            <Icon name="cross" size={24} color={colors.red} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const ValidationInfoCompletionForm = ({title}) => {
  const [securityNumber, setSecurityNumber] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');



  // const handleSelectDate = (date) => {
  //   // Convertir la date sélectionnée en format de chaîne souhaité et l'affecter à l'état
  //   const formattedDate = formatDateToString(date);
  //   setDateOfBirth(formattedDate);
  //   setIsCalendarVisible(false); // Fermer la modal après avoir sélectionné une date
  // };

  // const formatDateToString = (date) => {
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; 
  //   const year = date.getFullYear();
  
  //   // Ajoutez un zéro initial si nécessaire pour garantir un format "dd"
  //   const formattedDay = day < 10 ? `0${day}` : day;
  //   // Ajoutez un zéro initial si nécessaire pour garantir un format "mm"
  //   const formattedMonth = month < 10 ? `0${month}` : month;
  
  //   // Format final "dd/mm/yyyy"
  //   return `${formattedDay}/${formattedMonth}/${year}`;
  // };  

  const clearText = () => {
    setDateOfBirth('');
    setSecurityNumber('');
  };


  return (
    <SafeAreaView>
      <View style={styles.card}>
      <View style={styles.titleRDV}>
          <CustomText
            fontSize={15}
            fontWeight={700}
            color={colors.black}
            style={styles.title}>
            {title}
          </CustomText>
        </View>

        <View style={styles.compartment}>
          <FloatingLabelInput
            label="Date de naissance"
            value={thisDate} 
            onChange={formatDateToString}
            onFocus={showDatePicker} 
            placeholderTextColor="gray"
            maxLength={10}
            showCrossIcon
          />
          <FloatingLabelInput
            label="Numéro de sécurité social"
            value={securityNumber}
            onChangeText={setSecurityNumber}
            placeholderTextColor="gray"
            showCrossIcon
          />
          <FloatingLabelInput
            label="Motif du Rdv"
            value={reasonForAppointment}
            onChangeText={setReasonForAppointment}
            placeholderTextColor="gray"
            numberOfLines={6}
            maxLength={40}
            multiline
          />
        </View>
      </View>

      <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                theme={{
                    backgroundColor: "blue",
                    headerTextColor: "white",
                    headerBackgroundColor: "blue",
                    accentColor: "white",
                    textDayFontSize: 18,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 16,
                    textDayFontWeight: "bold",
                }}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical:15,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical:10,
    marginLeft: 10,
    marginRight: 10,
   
  },
  compartment: {
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    position: 'relative',
  },
  input: {
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
    color: colors.black,
    fontSize: 12,
    borderRadius: 6,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 150,
    fontWeight: '500',
  },
  label: {
    zIndex: 1,
    backgroundColor: 'white',
    fontSize: 12,
  },
  icon: {
    position: 'absolute',
    marginRight: 10,
    right: 10,
    top: '10%',
    transform: [{ translateY: -35 }]
  },
  titleRDV: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
  },
});

export default ValidationInfoCompletionForm;
