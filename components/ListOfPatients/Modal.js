import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import CustomText from '../global/CustomText';
import { colors } from '../global/colors';
import CustomAppButton from '../global/CustomAppButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalPatient = ({
    isEdit = false,
    user,
    nom,
    prenom,
    email,
    telephone,
    handleNomChange,
    handlePrenomChange,
    handleEmailChange,
    handleTelephoneChange,
    handleEditPatient,
    handleAddPatient
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalBackground}></View>
                <View style={styles.centeredView}>
                    <View
                        style={[styles.modalView,
                        {
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8
                        }]}
                    >

                        <View
                            style={[styles.compartment,
                            {
                                backgroundColor: colors.black100,
                                paddingVertical: 20,
                                paddingTop: 15,
                            }]} >
                            {isEdit ? (
                                <View style={{ paddingHorizontal: 20 }}>
                                    <CustomText fontSize={20} color={colors.white} fontWeight='bold' style={{ textAlign: 'center' }}>
                                        Modifier un patient
                                    </CustomText>
                                </View>
                            ) : (
                                <View style={{ paddingHorizontal: 20 }}>
                                    <CustomText fontSize={20} color={colors.white} fontWeight='bold' style={{ textAlign: 'center' }}>
                                        Ajouter un patient
                                    </CustomText>
                                </View>

                            )}
                        </View>

                        <View style={styles.body}>
                            <View style={{ marginHorizontal: 5 }}>
                                <ScrollView>
                                    <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                                        <View style={styles.containInput}>
                                            <CustomText fontSize={17} fontWeight='bold' color={colors.gray300}>
                                                Nom du patient
                                            </CustomText>
                                            <TextInput
                                                style={styles.inputModal}
                                                value={nom}
                                                onChangeText={handleNomChange}
                                                placeholder='Entrez le nom '
                                                placeholderTextColor={colors.gray}
                                            />
                                        </View>
                                        <View style={styles.containInput}>
                                            <CustomText fontSize={17} fontWeight='bold' color={colors.gray300}>
                                                Prénom du patient
                                            </CustomText>
                                            <TextInput
                                                style={styles.inputModal}
                                                value={prenom}
                                                onChangeText={handlePrenomChange}
                                                placeholder='Entrez le prénom'
                                                placeholderTextColor={colors.gray}
                                            />
                                        </View>

                                        <View style={styles.containInput}>
                                            <CustomText fontSize={17} fontWeight='bold' color={colors.gray300}>
                                                Email du patient
                                            </CustomText>
                                            <TextInput
                                                style={styles.inputModal}
                                                value={email}
                                                onChangeText={handleEmailChange}
                                                placeholder="Entrez l'adresse email"
                                                placeholderTextColor={colors.gray}
                                                keyboardType='email-address'
                                            />
                                        </View>

                                        <View style={styles.containInput}>
                                            <CustomText fontSize={17} fontWeight='bold' color={colors.gray300}>
                                                Téléphone du patient
                                            </CustomText>
                                            <TextInput
                                                style={styles.inputModal}
                                                value={telephone}
                                                onChangeText={handleTelephoneChange}
                                                placeholder="Entrez le numéro du patient"
                                                placeholderTextColor={colors.gray}
                                                keyboardType='numeric'
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.containButton,]}>
                                        <CustomAppButton
                                            onPress={() => setModalVisible(!modalVisible)}
                                            title='Annuler'
                                            alignSelf="baseline"
                                            paddingVertical={10}
                                            paddingHorizontal={55}
                                            textColor={colors.white}
                                            textFontSize={15}
                                            borderWidth={1}
                                            borderRadius={5}
                                            borderColor={colors.white}
                                            bkgroundColor={colors.blue200}
                                        />
                                        <CustomAppButton
                                            onPress={isEdit ?
                                                () => {
                                                    handleEditPatient(user);
                                                    setModalVisible(true);
                                                } :
                                                () => {
                                                    handleAddPatient(nom, prenom, email, telephone);
                                                    setModalVisible(false);
                                                }}
                                            title='Valider'
                                            alignSelf="baseline"
                                            paddingVertical={10}
                                            paddingHorizontal={55}
                                            textColor={colors.white}
                                            textFontSize={15}
                                            borderWidth={1}
                                            borderRadius={5}
                                            borderColor={colors.white}
                                            bkgroundColor={colors.blue}
                                        />
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1 }}>
                {isEdit ? (
                    <MaterialCommunityIcons
                        onPress={() => {
                            // handleEditPatient(user); // Utilisez la fonction handleEditPatient pour pré-remplir les champs
                            setModalVisible(true); // Ouvrir la modal
                        }}
                        name="pencil-circle"
                        size={25}
                        color={colors.blue}
                        marginRight={5}
                        style={{ marginTop: -15 }}
                    />
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomAppButton
                            onPress={() => setModalVisible(!modalVisible)}
                            title="AJOUTER UN PATIENT"
                            alignSelf="baseline"
                            paddingVertical={16}
                            paddingHorizontal={20}
                            textColor={colors.white}
                            textfontSize={14}
                            borderRadius={10}
                            bkgroundColor={colors.blue}
                            width='100%'
                            fontWeight='bold'
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
    },
    compartment: {
        marginTop: -10,
    },
    body: {
        flexDirection: 'column',
        marginVertical: 16,
        gap: 12,
    },
    containInput: {
        flexDirection: 'column',
        gap: 8
    },
    containButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 14,
    },
    input: {
        marginVertical: 10,
        padding: 10,
        color: colors.black,
        fontSize: 18,
        textAlignVertical: 'center',
        backgroundColor: colors.white,
        height: 50,
    },
    inputProfession: {
        marginVertical: 10,
        padding: 10,
        color: colors.black,
        fontSize: 13,
        borderRadius: 10,
        textAlignVertical: 'center',
        backgroundColor: colors.white,
        height: 40
    },
    inputModal: {
        borderWidth: 0.5,
        borderColor: colors.gray,
        borderRadius: 5,
        color: colors.black,
        padding: 10,
        marginVertical: 3,
        textAlignVertical: 'center',
        width: "95%"
    },
    modalBackground: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de fond semi-transparente
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

});

export default ModalPatient;