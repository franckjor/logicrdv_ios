/*
  This React Native component represents a profile option item, typically used in a settings or profile screen.
  It allows users to toggle notifications on or off for certain options and provides a customizable icon and option name.

  Component Structure:
  - TouchableOpacity: Wrapper component to make the option clickable.
    - View: Main container for the option.
      - Conditional Rendering: Displays either the provided icon or a notification icon based on the notification toggle state.
      - CustomText: Displays the option name with bold formatting.
      - Switch: Toggle switch for notifications (if enabled), positioned at the right side of the option.

  Functionality:
  - Toggle Switch: Toggles the notification state when pressed.

  Props:
  - icon: Custom icon to be displayed for the option.
  - optionName: Name of the option.
  - onPressAction: Action to be performed when the option is pressed.
  - isRightNotificationToggle: Boolean flag indicating whether to display a notification toggle switch on the right side.

  Styles:
  - container: Layout styles for the main container, providing padding, border radius, background color, and alignment.
*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../global/CustomText';
import { colors } from '../global/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { listNotificationsRequest, manageNotificationRequest } from '../../redux/notification/actions';
import { isSubscribedNotification, setIsSubscribeNotification } from '../../utils/helpers';

const ProfileOptions = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleAccountParams = () => {
    navigation.navigate('Modification du profil');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate("Conditions Générales d'utilisation");
  };

  const handleNotification = () => {
    navigation.navigate("Notifications");
  };

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const subscriptionStatus = await isSubscribedNotification();
      setIsSubscribed(subscriptionStatus === 'true'); 
    };
    getSubscriptionStatus();
  }, []);


  const toggleNotification = async (value, callback) => {

    try {
      await setIsSubscribeNotification(value.toString());
      await setIsSubscribed(value);

      if (callback) {
        callback(value);
      }
      if (value) {
        dispatch(listNotificationsRequest());
        dispatch(manageNotificationRequest(true));
      } else {
        dispatch(manageNotificationRequest(false));
      }


    } catch (error) {
      console.error('Erreur lors du basculement des notifications:', error);
      throw error;
    }
  };


  const options = [
    { icon: <Ionicons name="settings-sharp" size={18} style={styles.icon} />, text: "Paramètres du compte", onPress: handleAccountParams },
    { icon: <MaterialIcons name="notifications" size={18} style={styles.icon} />, text: "Notifications", onPress: handleNotification },
    { icon: <MaterialIcons name="policy" size={18} style={styles.icon} />, text: "Polices de confidentialité", onPress: handlePrivacyPolicy },
  ];

  return (
    <View style={styles.optionContainer}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={option.onPress}>
          <View style={styles.container}>
            {option.icon}
            <CustomText
              fontSize={14}
              fontWeight={'bold'}
              color={colors.blue100}
              style={{ marginLeft: 3 }}>
              {option.text}
            </CustomText>
          </View>
        </TouchableOpacity>
      ))}
      <View style={[styles.container, { justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isSubscribed ? <MaterialIcons name="notifications-on" size={18} style={styles.icon} /> : <MaterialIcons name="notifications-off" size={18} style={styles.icon} />}
          <CustomText
            fontSize={14}
            fontWeight={'bold'}
            color={colors.blue100}
            style={{ marginLeft: 3 }}>
            Notifications
          </CustomText>
        </View>
        <Switch
          trackColor={{ false: colors.gray300, true: colors.blue }}
          thumbColor={isSubscribed ? colors.blue : colors.gray100}
          ios_backgroundColor={colors.gray200}
          onValueChange={toggleNotification}
          value={isSubscribed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'column',
    gap: 15
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  icon: {
    color: colors.gray,
    marginRight: 15
  },
});

export default ProfileOptions;
