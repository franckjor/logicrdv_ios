import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../components/global/colors'
import CustomText from '../../components/global/CustomText'
import CustomAppButton from '../../components/global/CustomAppButton'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { createAppointmentRequest, listPatientRequest } from '../../redux/appointment/actions';

const PatientConfirmation = ({ route, isLoadingAppointment, dataLocked, session }) => {
  const { tokenappointment } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBackToListOfPatient = () => {
    dispatch(listPatientRequest(tokenappointment));
    navigation.navigate('Liste des patients');
  };

  const handleBackToAppointment = async (week, data, action) => {
    await dispatch(createAppointmentRequest(tokenappointment, week, data, action, session));
  };

  return (
    <>
      {isLoadingAppointment ? (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.content} >
            <View style={styles.message}>
              <CustomText
                color={colors.black}
                fontSize={14}
                fontWeight={500}
              >
                Le praticien est mon médecin traitant et je confirme ne pas être un nouveau patient

              </CustomText>
            </View >
            <View style={styles.button}>
            <CustomAppButton
                onPress={handleBackToListOfPatient}
                title="Non"
                bkgroundColor={colors.blue}
                textColor={colors.white}
                paddingHorizontal={45}
                paddingVertical={10}
                borderRadius={8}
                textfontSize={14}
              />
              <CustomAppButton
                onPress={() => handleBackToAppointment(dataLocked[0]?.onclick_week, dataLocked[0]?.onclick_data, dataLocked[0]?.onclick_action)}
                title="Je confirme"
                bkgroundColor={colors.blue}
                textColor={colors.white}
                paddingHorizontal={45}
                paddingVertical={10}
                borderRadius={8}
                textfontSize={14}
              />
            </View>
          </View>
        </View>
      )}
    </>
  )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue300,
  },
  content: {
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: colors.white
  },
  message: {
    paddingHorizontal: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 12,
  },
})
const mapStateToProps = (state) => ({
  dataLocked: state.AppointmentReducer?.dataLocked,
  headerMessage: state.AppointmentReducer?.headerMessage,
  navigationAppointment: state.AppointmentReducer?.navigation,
  session: state.AppointmentReducer?.session,
  isLoadingAppointment: state.AppointmentReducer?.isLoading,
});

export default connect(mapStateToProps)(PatientConfirmation);
