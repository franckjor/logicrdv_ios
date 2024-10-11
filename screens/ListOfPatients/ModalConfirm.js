import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import CustomText from '../../components/global/CustomText'
import CustomAppButton from '../../components/global/CustomAppButton'
import { colors } from '../../components/global/colors'

const ModalConfirm = ({ visible, onCancel, onConfirm, message }) => {
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
                        {
                        
                            message === "Vous ne pouvez pas prendre RDV par internet dans l'immédiat. Votre praticien ne prend pas de nouveau patient pour le moment. Votre inscription est valide mais vos coordonnées n'ont pas été reconnues. Si ce praticien est votre médecin traitant merci de le confirmer en appuyant sur le bouton suivant afin de débloquer la prise de rdv. Si besoin, pour de plus amples informations, veuillez contacter le secrétariat au 0176310099." ? (
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                            <CustomAppButton
                                onPress={onCancel}
                                title="Retour"
                                alignSelf="baseline"
                                paddingVertical={10}
                                paddingHorizontal={15}
                                textColor={colors.white}
                                textfontSize={14}
                                borderRadius={5}
                                bkgroundColor={colors.blue}
                                userIcon
                                display='none'
                            />
                            <CustomAppButton
                                onPress={onConfirm}
                                title={"Je confirme être patient"}
                                alignSelf="baseline"
                                paddingVertical={10}
                                paddingHorizontal={15}
                                textColor={colors.white}
                                textfontSize={14}
                                borderRadius={5}
                                bkgroundColor={colors.blue}
                                userIcon
                                display='none'
                            />
                        </View>
                            ) : (
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                            <CustomAppButton
                                onPress={onCancel}
                                title="OK"
                                alignSelf="baseline"
                                paddingVertical={10}
                                paddingHorizontal={50}
                                textColor={colors.white}
                                textfontSize={14}
                                borderRadius={5}
                                bkgroundColor={colors.blue}
                                userIcon
                                display='none'
                            />
                           
                        </View>
                            )
                        }

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
        width: "85%",
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

export default ModalConfirm
