/*
  Usage of CustumAlert:

  This component displays an alert with an icon, a message, and up to two buttons.

  Props:
  - isSuccess (boolean): Determines whether the alert should display a success or failure icon.
  - message (string): The message to display in the alert.
  - button1 (object): Properties of the first button.
    - title (string): The button text.
    - onPress (function): Function to execute when the button is pressed.
    - textColor (string, optional): The text color of the button (default: white).
    - bkgroundColor (string, optional): The background color of the button (default: blue).
    - paddingVertical (number, optional): The vertical padding of the button (default: 10).
    - paddingHorizontal (number, optional): The horizontal padding of the button (default: 20).
    - borderRadius (number, optional): The border radius of the button (default: 5).
  - button2 (object, optional): Properties of the second button (same structure as button1).
*/



import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import CustomAppButton from '../global/CustomAppButton';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const CustumAlert = ({ isSuccess, message, button1, button2, color, visible, onClose }) => {
  const renderIconName = () => {
    return isSuccess ? 'checkcircleo' : 'closecircleo';
  };

  const renderButtons = () => {
    if (!button1 && !button2) return null;

    if ((button1 || button2) && !(button1 && button2)) {
      return (
        <CustomAppButton
          title={button1.title}
          onPress={button1.onPress}
          textColor={button1.textColor}
          bkgroundColor={button1.bkgroundColor}
          paddingVertical={button1.paddingVertical}
          borderRadius={button1.borderRadius}
          alignSelf='center'
        />
      );
    }

    if (button1 && button2) {
      return (
        <View style={styles.buttonContainer}>
          {button1 && (
            <CustomAppButton
              title={button1.title}
              onPress={button1.onPress}
              textColor={button1.textColor}
              bkgroundColor={button1.bkgroundColor}
              paddingVertical={button1.paddingVertical}
              paddingHorizontal={button1.paddingHorizontal}
              borderRadius={button1.borderRadius}
              alignSelf='flex-start'
            />
          )}
          {button2 && (
            <CustomAppButton
              title={button2.title}
              onPress={button2.onPress}
              textColor={button2.textColor}
              bkgroundColor={button2.bkgroundColor}
              paddingVertical={button2.paddingVertical}
              paddingHorizontal={button2.paddingHorizontal}
              borderRadius={button2.borderRadius}
              alignSelf='flex-end'
            />
          )}
        </View>
      );
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {isSuccess !== undefined && (
            <Icon style={styles.myicon} name={renderIconName()} size={60} color={isSuccess ? 'green' : 'red'} />
          )}
          <View>
            <Text style={[styles.message, { color: color }]}>{message}</Text>
            {renderButtons()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  innerContainer: {
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myicon: {
    margin: 10,
  },
  message: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
    marginBottom: 10,
  }
});

export default CustumAlert;