import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/FontAwesome6';
import CustomText from '../global/CustomText';

const Motif = ({
    labelplace,
    color,
    description,
}) => {

    return (
        <View style={styles.card}>
                <View style={[styles.compartment, { flexDirection: 'row' }]}>
                    <View style={[styles.circle, { backgroundColor: color, marginTop: 6 }]} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "85%" }}>
                        <View style={styles.compartmentContainer}>
                            <CustomText fontSize={14} fontWeight={'bold'} color={colors.black}>{description}</CustomText>
                            <CustomText fontSize={12} color={colors.black}>{labelplace}</CustomText>
                        </View>
                        <Icon name="chevron-right" size={18} color={colors.gray100} />
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
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    compartmentContainer: {
        paddingLeft: 30,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 15
    },
});

export default Motif;
