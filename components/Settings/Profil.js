import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../global/colors';
import CustomText from '../global/CustomText';

const Profil = ({
    username,
    email
}) => {
    return (  
        <View style={styles.container}>
            <Image source={require('../../assets/images/user.png')} style={styles.circleUser} />
            <View style={styles.containerID} >
                <CustomText fontSize={15} fontWeight='bold' color={colors.blue100}>{username}</CustomText>
                <CustomText fontSize={14} color={colors.blue100}>{email}</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginVertical: 25
    },
    circleUser: {
        width: 95,
        height: 95,
    },
    containerID: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Profil
