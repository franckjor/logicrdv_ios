/*
  This React Native component, ValidationPaymentForm, is designed for validating payment information in a form.
  It includes fields for entering card number, expiry date, and CVV.

  FloatingLabelInput Component Structure:
  - View: Main container for the component.
    - Animated.Text: Label for the input field with floating animation.
    - TextInput: Input field for entering text.

  Functionality:
  - FloatingLabelInput: Handles input for card number, expiry date, and CVV.
    - Displays floating label animation when input is focused or has text.
    - Automatically formats expiry date input to "MM/YY" format.
  
  Props:
  - label: Label text for the input field.
  - value: Current value of the input field.
  - onChangeText: Function to handle text input changes.
  - keyboardType: Type of keyboard to be displayed.
  - maxLength: Maximum length of text allowed in the input field.
  - width: Width of the input field.

  ValidationPaymentForm Component Structure:
  - SafeAreaView: Container for ensuring content renders within safe area boundaries.
    - View: Main container for the form content.
      - View: Container for the form elements, such as FloatingLabelInput components.

  Styles:
  - Styles are defined for each individual component, including input fields, labels, and containers, providing consistent appearance and layout.
*/

import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Animated,
} from 'react-native';
import {colors} from '../global/colors';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  width,
  keyboardType,
  maxLength,
  ...rest
}) => {
  const backgroundColor = colors.blue300;
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
    left: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 14],
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

  return (
    <View style={[styles.container, {width: width}]}>
      <Animated.Text
        onPress={handleLabelPress}
        style={[labelStyle, styles.label, {backgroundColor}]}>
        {label}
      </Animated.Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        maxLength={maxLength}
        {...rest}
      />
    </View>
  );
};

const ValidationPaymentForm = ({pricemessage}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handleCardNumber = (text) => {
    // Supprimer tout sauf les chiffres
    const formattedText = text.replace(/[^\d]/g, '');

    // Diviser la chaîne en blocs de 4 caractères
    const blocks = formattedText.match(/.{1,4}/g);

    // Rejoindre les blocs avec un espace entre chaque groupe de 4 chiffres
    const formattedNumber = blocks ? blocks.join(' ') : '';

    // Mettre à jour l'état avec le numéro de carte formaté
    setCardNumber(formattedNumber);
  };

  const handleExpiryDateChange = text => {
    // Supprimer tout sauf les chiffres et le caractère "/"
    const formattedText = text.replace(/[^\d/]/g, '');

    // Vérifier si la longueur est inférieure à 5 pour correspondre au format "MM/YY"
    if (formattedText.length <= 5) {
      // Si la longueur est de 2, ajouter automatiquement le "/"
      if (formattedText.length === 2 && expiryDate.length === 1) {
        setExpiryDate(formattedText + '/');
      } else {
        setExpiryDate(formattedText);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.compartment}>
        <FloatingLabelInput
          label="Numéro de la carte"
          value={cardNumber}
          onChangeText={handleCardNumber}
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <View style={styles.containe}>
          <FloatingLabelInput
            label="Date expiration"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
            placeholderTextColor="gray"
            maxLength={5}
            keyboardType="numeric"
            width={50 + '%'}
          />
          <FloatingLabelInput
            label="cvv"
            value={cvv}
            onChangeText={setCVV}
            placeholderTextColor="gray"
            maxLength={3}
            keyboardType="numeric"
            width={45 + '%'}
          />
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compartment: {
    paddingVertical: 25,
    marginHorizontal:10,
    gap: 10,
  },
  container: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    color: colors.black,
    fontSize: 12,
    borderRadius: 6,
    textAlignVertical: 'center',
  },
  label: {
    zIndex: 1,
    paddingHorizontal: 5,
    fontSize: 12,
  },
  myText:{
    backgroundColor:colors.white,
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
    marginHorizontal:10,
  },
});

export default ValidationPaymentForm;
