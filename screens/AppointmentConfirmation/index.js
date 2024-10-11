import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { colors } from '../../components/global/colors'
import CustomText from '../../components/global/CustomText'
import CustomAppButton from '../../components/global/CustomAppButton'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { createAppointmentRequest, listAppointmentsRequest } from '../../redux/appointment/actions';

const ConfirmationAppointmentScreen = ({ route, isLoadingAppointment, dataValided, headerMessage, session }) => {
  const { tokenappointment } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBackToHome = async () => {
    navigation.navigate('Mes rendez-vous');
    await dispatch(listAppointmentsRequest({ "id": 1 }));
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
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
              <Image source={require('../../assets/images/success.png')} style={styles.circleUser} />
              <CustomText color={colors.blue} fontSize={20} fontWeight={"bold"}>Rdv Validé</CustomText>
            </View>
            <View style={styles.message}>
              <CustomText
                color={colors.black}
                fontSize={16}
                fontWeight={500}
                style={{textAlign: 'justify'}}
              >
                {headerMessage}

              </CustomText>
            </View >
            <View style={styles.button}>
              <CustomAppButton
                onPress={() => handleBackToAppointment(dataValided[0]?.onclick_week, dataValided[0]?.onclick_data, dataValided[0]?.onclick_action)}
                title={dataValided[0]?.label}
                bkgroundColor={colors.blue}
                textColor={colors.white}
                paddingHorizontal={20}
                paddingVertical={10}
                borderRadius={8}
                textfontSize={14}
              />
              <CustomAppButton
                onPress={handleBackToHome}
                title="Quitter"
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
    backgroundColor: colors.blue400, 
    // opacity: 0.5
  },
  content: {
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 18,
    backgroundColor: colors.white,
    flexDirection: 'column',
    gap: 8
  },
  message: {
    paddingHorizontal: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 12,
    marginTop: 12
  },
  circleUser: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginRight: 4
  },
})
const mapStateToProps = (state) => ({
  dataValided: state.AppointmentReducer?.dataValided,
  headerMessage: state.AppointmentReducer?.headerMessage,
  navigationAppointment: state.AppointmentReducer?.navigation,
  session: state.AppointmentReducer?.session,
  isLoadingAppointment: state.AppointmentReducer?.isLoading,
});

export default connect(mapStateToProps)(ConfirmationAppointmentScreen);
