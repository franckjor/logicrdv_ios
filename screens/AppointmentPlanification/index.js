import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import Appointment_Disponibility from '../../components/AppointmentPlanification/Appointment_Disponibility';
import CustomText from '../../components/global/CustomText';
import { colors } from '../../components/global/colors';
import CustomAppButton from '../../components/global/CustomAppButton';
import { createAppointmentRequest } from '../../redux/appointment/actions';
import { setModalVisible } from '../../redux/app/actions';

const DateAppointment = ({ route, session, isLoadingAppointment, dataCreneaux, navigationAppointment, params, navigation }) => {
  const { isAppt, tokenappointment, title } = route.params;
  const [appointmentTitle, setAppointmentTitle] = useState(title);
  const dispatch = useDispatch();


  const loadDataCreneaux = useCallback(() => {
    // dispatch(fetchDataCreneauxAction());
  }, [dispatch]);
  useEffect(
    useCallback(() => {
      loadDataCreneaux();
    }, [loadDataCreneaux])
  );
  const handleButtonWeekPress = async (week, data, action) => {
    await dispatch(createAppointmentRequest(tokenappointment, week, data, action, session));
  };

  const handleValidation = async (item) => {
    if (item.onclick_message == "") {
      const { onclick_week, onclick_data, onclick_action } = item;
      await dispatch(createAppointmentRequest(tokenappointment, onclick_week, onclick_data, onclick_action, session));
    }
    else {
      dispatch(setModalVisible(true, item.onclick_message))
    }
  };

  return (
    <View style={styles.container}>
      <ContainerScreen isLoading={isLoadingAppointment}>
        <View style={styles.title}>
          <CustomText fontSize={14} fontWeight={'bold'} color={colors.black}>
            Date et heure pour:
          </CustomText>
          <CustomText fontSize={14} fontWeight={'bold'} color={colors.blue}>
            {appointmentTitle}
          </CustomText>
        </View>
        <ScrollView>
          {dataCreneaux.length > 0 ?
            dataCreneaux.map((item, index) => (
              <View style={{ display: 'flex', justifyContent: 'flex-start' }} key={index}>
                <Appointment_Disponibility

                  label={item?.label}
                  label2={item?.label2}
                  creneaux={item?.creneaux}
                  message={item?.message}
                  handleValidationAppointment={handleValidation}
                />
              </View>
            )) :
            <CustomText color={colors.black}>Aucun créneau disponible</CustomText>
          }
        </ScrollView>
      </ContainerScreen>
      <View style={[styles.buttonContainer, { justifyContent: navigationAppointment.nextweek && navigationAppointment.prevweek ? 'space-between' : 'flex-end' }]}>
        {navigationAppointment.prevweek && (
          <CustomAppButton
            onPress={() => {
              handleButtonWeekPress(navigationAppointment.prevweek?.onclick_week, navigationAppointment.prevweek?.onclick_data, navigationAppointment.prevweek?.onclick_action);
            }}
            title='sem.préc'
            alignSelf="baseline"
            paddingVertical={16}
            textColor={colors.white}
            textfontSize={12}
            bkgroundColor='transparent'
          />
        )}
        {navigationAppointment.nextweek && navigationAppointment.nextweek?.onclick_week && (
          <CustomAppButton
            onPress={() => {
              handleButtonWeekPress(navigationAppointment.nextweek?.onclick_week, navigationAppointment.nextweek?.onclick_data, navigationAppointment.nextweek?.onclick_action);
            }}
            title='sem.suiv'
            alignSelf="baseline"
            paddingVertical={16}
            textColor={colors.white}
            textfontSize={12}
            bkgroundColor='transparent'
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  title: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 14,
  },
});

const mapStateToProps = (state) => ({
  navigationAppointment: state.AppointmentReducer?.navigation,
  dataCreneaux: state.AppointmentReducer?.dataCreneaux,
  session: state.AppointmentReducer?.session,
  isLoadingAppointment: state.AppointmentReducer?.isLoading,
  params: state.AppointmentReducer?.params,
});

export default connect(mapStateToProps)(DateAppointment);
