import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import CustomText from '../../components/global/CustomText'
import CustomAppButton from '../../components/global/CustomAppButton'
import { colors } from '../../components/global/colors'

const ModalDelete = ({ visible, onCancel, onConfirm, message }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalBackground}></View>
            <View style={styles.centeredView}>
                <View
                    style={[styles.modalView,
                    {
                        borderRadius: 8
                    }]}
                >
                    <View style={styles.body}>
                        <CustomText fontSize={14} fontWeight='bold' color={colors.black}>
                            {message}
                        </CustomText>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                            <CustomAppButton
                                onPress={onCancel}
                                title="Annuler"
                                alignSelf="baseline"
                                paddingVertical={16}
                                paddingHorizontal={40}
                                textColor={colors.white}
                                textfontSize={14}
                                borderRadius={5}
                                bkgroundColor={colors.blue}
                                userIcon
                                display='none'
                            />
                            <CustomAppButton
                                onPress={onConfirm}
                                title="Confirmer"
                                alignSelf="baseline"
                                paddingVertical={16}
                                paddingHorizontal={30}
                                textColor={colors.white}
                                textfontSize={14}
                                borderRadius={5}
                                bkgroundColor={colors.red}
                                userIcon
                                display='none'
                            />
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
    },
    compartment: {
        marginTop: -10,
        marginHorizontal: -10
    },
    body: {
        flexDirection: 'column',
        marginVertical: 16,
        gap: 12
    },
    containButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 8,
        marginTop: 14
    },
    modalBackground: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default ModalDelete
