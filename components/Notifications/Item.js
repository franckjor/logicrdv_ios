import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from '../global/colors';
import CustomText from '../global/CustomText';

const Item = (props) => {
  const { date, username, message, nameIcon } = props; 
  const isNotification = () => {
    if (nameIcon === "Notification") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.entete} >
        <View style={styles.element}>
          <Icon color={colors.blue} name= {isNotification() ? "notifications" : "message"} size={18} />
          <CustomText fontSize={14} color={colors.black}>{username}</CustomText>
        </View>
        <View style={styles.element}>
          <Icon color={colors.blue} name="calendar-today" size={18} />
          <CustomText fontSize={14} color={colors.black}>{date}</CustomText>
        </View>
      </View>
      <View>
        <CustomText fontSize={14} color={colors.black}>{message}</CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        marginVertical:3,
        paddingHorizontal:10,
        paddingBottom:10,
        borderRadius: 5
    },
    entete:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical:10,
    },
    element:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4

    },
   
})
export default Item;
