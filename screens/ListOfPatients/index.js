import React, { useEffect, useState } from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen'
import { Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import CustomText from '../../components/global/CustomText'
import { colors } from '../../components/global/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalPatient from '../../components/ListOfPatients/Modal'
import Doctor from '../../components/global/Doctor'
import { useDispatch, connect } from 'react-redux';
import { addPatientRequest, clearAppointmentData, clearPatientList, createAppointmentRequest, listPatientRequest, removePatientRequest } from '../../redux/appointment/actions'

import ModalDelete from './ModalDelete'
import ModalConfirm from './ModalConfirm'

const ListOfPatients = ({ route, listPatient, isLoading, session, user, dataPatients }) => {
    const { tokenappointment } = route.params;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const patients = dataPatients.length > 1 ? dataPatients : listPatient;

    const dispatch = useDispatch();

    const truncateText = (text, maxLength) => {
        if (!text) {
            return '';
        }

        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength - 1) + '...';
        }
    };

    useEffect(() => {
        dispatch(listPatientRequest(tokenappointment));
    }, [tokenappointment]);

    const handleAppt = async (patient) => {
        if (dataPatients.length > 0) {
            if (patient.locked === "1" && patient.lockmessage !== "Vous ne pouvez pas prendre RDV par internet dans l'immédiat. Votre inscription est valide mais la prise de rdv par internet est suspendue. Pour prendre Rdv, veuillez contacter le secrétariat au 0146650660") {
                setPatientToDelete(patient);
                setShowConfirmModal(true);
            }  else if (patient.locked === "1" && patient.lockmessage !== "Vous ne pouvez pas prendre RDV par internet dans l'immédiat. Votre praticien ne prend pas de nouveau patient pour le moment. Votre inscription est valide mais vos coordonnées n'ont pas été reconnues. Si ce praticien est votre médecin traitant merci de le confirmer en appuyant sur le bouton suivant afin de débloquer la prise de rdv. Si besoin, pour de plus amples informations, veuillez contacter le secrétariat au 0176310099.")  {
                setPatientToDelete(patient);
                setShowConfirmModal(true);
            }
            else{
                const action = patient?.onclick_action;
                const data = patient?.onclick_data;
                const week = patient?.onclick_week;
                await dispatch(createAppointmentRequest(tokenappointment, week, data, action, session));
                await dispatch(clearPatientList());
            }
        } else {
            await dispatch(clearAppointmentData());
        }
    }

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    useEffect(() => {
        if (user) {
            setNom(user.nom || '');
            setPrenom(user.prenom || '');
            setEmail(user.email || '');
            setTelephone(user.phone || '');
        }
    }, [user]);

    const handleNomChange = (text) => {
        setNom(text);
    };

    const handlePrenomChange = (text) => {
        setPrenom(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleTelephoneChange = (text) => {
        setTelephone(text);
    };

    const handleAddPatient = async () => {
        await dispatch(addPatientRequest(email, nom, telephone, prenom, tokenappointment));
    }

    const handleRemovePatient = async () => {
        if (patientToDelete) {
            const tokenpatient = patientToDelete.token
            await dispatch(removePatientRequest(tokenappointment, tokenpatient));
            setPatientToDelete(null);
            setShowDeleteModal(false);
        }
    };

    return (
        <ContainerScreen isLoading={isLoading}>
            <ModalDelete
                visible={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleRemovePatient}
                message="Êtes-vous sûr de vouloir supprimer ce patient ?"
            />
            <ModalConfirm
                visible={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={async () => { // Si l'utilisateur confirme, dispatch et effectuez les actions nécessaires
                    setShowConfirmModal(false); // Fermez la modal de confirmation
                    const action = patientToDelete?.onclick_action;
                    const data = patientToDelete?.onclick_data;
                    const week = patientToDelete?.onclick_week;
                    await dispatch(createAppointmentRequest(tokenappointment, week, data, action, session));
                }}
                message={patientToDelete?.lockmessage || ''}
            />
            {patients.length > 0 ? (
                <ScrollView>
                    {dataPatients.length <= 1 && (
                        <>
                            {listPatient.length < 10 && (
                                <ModalPatient
                                    nom={nom}
                                    prenom={prenom}
                                    email={email}
                                    telephone={telephone}
                                    handleNomChange={handleNomChange}
                                    handlePrenomChange={handlePrenomChange}
                                    handleEmailChange={handleEmailChange}
                                    handleTelephoneChange={handleTelephoneChange}
                                    isEdit={false}
                                    handleAddPatient={handleAddPatient}
                                    
                                />
                            )}
                        </>
                    )}

                    {patients.map((patient, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAppt(patient)}>
                            <Doctor
                                key={index}
                                texte1={`${patient.nom} ${patient.prenom}`}
                                texte2= {truncateText(patient.email, 25)}
                                texte3={patient.dob}
                                texte4= {patient.phone}
                                colorTitle={colors.black}
                                colorContain={colors.black}
                                marginBottom={10}
                                isIcon
                                urlphoto={patient.photo}
                                isLock={patient.locked === "1"}
                                isUpdate
                                isDelete={index > 0 && patients.length > 1}
                                isProfileIcon
                                user={patient}
                                tokenappointment={tokenappointment}
                                handleDelete={() => {
                                    setPatientToDelete(patient);
                                    setShowDeleteModal(true);
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/favicon.jpg')} style={{ width: 25, height: 25, borderRadius: 5 }} />
                    <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
                </View>
            )}
        </ContainerScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        gap: 12,
        marginTop: 12
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    circleUser: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 999,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: colors.white,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    info: {
        fontSize: 16,
        color: '#666',
    },
    edit: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        top: -20
    },
    divider: {
        borderLeftWidth: 1,
        borderStyle: 'dashed',
        height: '100%',
    },
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de fond semi-transparente
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

const mapStateToProps = ({ AppointmentReducer }) => ({
    listPatient: AppointmentReducer.listPatient,
    dataPatients: AppointmentReducer.dataPatients,
    session: AppointmentReducer.session,
    isLoading: AppointmentReducer.isLoading,
});

export default connect(mapStateToProps)(ListOfPatients);
