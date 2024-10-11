import React, { useEffect, useState } from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen'
import Doctor from '../../components/global/Doctor'
import CustomText from '../../components/global/CustomText'
import { colors } from '../../components/global/colors'
import { ScrollView, StyleSheet, View } from 'react-native'
import CustomAppButton from '../../components/global/CustomAppButton'
import { infosDoctorRequest, resultRequest } from '../../redux/search/actions'
import { useDispatch, connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearAppointmentData, createAppointmentRequest } from '../../redux/appointment/actions'

const DoctorDetails = ({ route, isLoading, doctorInfos, session }) => {
    const { result } = route.params;
    const fullName = `${result?.civility} ${result?.nom}`;
    const proxy_ville = `${result?.zip} ${result?.city}`;
    const id = result?.id;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        dispatch(clearAppointmentData());
    }, []);

    useEffect(() => {
        const cleanup = () => {
            dispatch({ type: 'CLEAR_INFO_DOCTOR_RESULTS' });  
        };

        return cleanup;
    }, []);

    useEffect(() => {
        dispatch(infosDoctorRequest({ "id": id }));
    }, [id]);

    const handleSearchChange = async () => {
        const proxy_ville = `${result.zip} ${result.city}` ;
        const proxy_nom = result.category ;
        const proxy_ville_id = result.id_city ;
        const proxy_nom_id = result.id ;
        await dispatch(resultRequest({ "proxy_ville": proxy_ville, "proxy_nom": proxy_nom, "proxy_ville_id": proxy_ville_id, "proxy_nom_id": proxy_nom_id, "proxy_search": "", "proxy_page": "1" }));
        navigation.navigate('Résultats', { item: result, isSearchAround: true });
    };

    const handleMotifs = async () => {
        const tokenappointment = doctorInfos?.appointment?.token
        await dispatch(createAppointmentRequest(tokenappointment));

    };

    const CustomButtonComponent = (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <CustomAppButton
                onPress={() => handleMotifs()}
                title="PRENDRE UN RENDEZ-VOUS"
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
    );

    return (
        <ContainerScreen isLoading={isLoading}>
            <ScrollView>
                <View style={{ width: '100%' }}>
                    {doctorInfos && doctorInfos.appointment && doctorInfos.appointment.token !== "" && CustomButtonComponent}
                </View>

                <Doctor
                    texte1={fullName}
                    texte2={result?.category}
                    texte3={result?.address}
                    texte4={proxy_ville}
                    texte5={result?.tel}
                    colorTitle={colors.yellow}
                    colorContain={colors.blue}
                    fontWeight={'bold'}
                    isPhoneIcons
                    isProfileIcon
                    isRightIcons
                    isDetail
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, width: '100%' }}>
                    <CustomAppButton
                        onPress={handleSearchChange}
                        title='CHERCHER AUTOUR'
                        alignSelf="baseline"
                        paddingVertical={16}
                        textColor={colors.white}
                        textfontSize={14}
                        borderRadius={10}
                        bkgroundColor={colors.blue}
                        width='100%'
                        fontWeight='bold'
                        isLoading={isLoading}
                    />
                </View>

                <View style={styles.card}>
                    <CustomText fontSize={15} fontWeight='bold' color={colors.black}>Caractéristiques & Horaires</CustomText>
                    {doctorInfos?.chapters && doctorInfos.chapters.map((doctor, index) => {
                        return (
                            <View key={index}>
                                {doctor.description && (
                                    <>
                                        <CustomText fontSize={15} fontWeight='bold' color={colors.black} style={{ backgroundColor: colors.blue400, borderRadius: 10, padding: 15 }}>
                                            {doctor.title}
                                        </CustomText>
                                        <CustomText fontSize={14} color={colors.black} style={{ marginTop: 15 }}>{doctor.description}</CustomText>
                                    </>
                                )}
                            </View>
                        );
                    })}
                </View>

                <View style={[styles.card, { marginTop: 10 }]}>
                    <CustomText fontSize={15} fontWeight='bold' color={colors.black}>Specialité</CustomText>
                    <CustomText fontSize={15} fontWeight='bold' color={colors.blue100} style={{ backgroundColor: colors.blue400, borderRadius: 10, padding: 15 }}>
                        {result?.category}
                    </CustomText>
                </View>
                <View style={{ width: '100%', marginBottom: 10 }}>
                    {doctorInfos && doctorInfos.appointment && doctorInfos.appointment.token !== "" && CustomButtonComponent}
                </View>
            </ScrollView>
        </ContainerScreen>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        borderColor: colors.gray100,
        padding: 14,
        gap: 5

    }
});

const mapStateToProps = (state) => ({
    results: state.SearchReducer?.results,
    isLoading: state.SearchReducer?.isLoading,
    doctorInfos: state.SearchReducer?.doctorInfos,
    session: state.AppointmentReducer?.session,
});

export default connect(mapStateToProps)(DoctorDetails);
