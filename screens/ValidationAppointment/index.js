import { View, ScrollView, Modal, Pressable, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen'
import ValidationInfoRDV from '../../components/ValidationAppointment/ValidationInfoRDV'
import ValidationNoticeRDV from '../../components/ValidationAppointment/ValidationNoticeRDV'
import CustomAppButton from '../../components/global/CustomAppButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../components/global/colors'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { SafeAreaView, StyleSheet, TextInput, Animated, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomText from '../../components/global/CustomText'
import { cancelAppointmentRequest, createAppointmentRequest } from '../../redux/appointment/actions'
import AppointmentDetails from '../../components/MyAppointment/Appointment_Details'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CardField, createPaymentMethod, confirmPayment, } from '@stripe/stripe-react-native';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType,
  maxLength,
  numberOfLines,
  showCrossIcon = false,
  required,
  onFocusDate,
  editable,
  showDatePicker,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);

  const handleFocus = () => {
    if (label === 'Date de naissance' && onFocusDate) {
      onFocusDate(); // Si le champ de la date est focus, appeler onFocusDate
    } else {
      setIsFocused(true); // Sinon, utiliser la logique d'origine
    }
  };
  const handleBlur = () => setIsFocused(false);

  Animated.timing(animatedIsFocused, {
    toValue: isFocused || value !== '' ? 1 : 0,
    duration: 200,
    useNativeDriver: false,
  }).start();

  const labelStyle = {
    position: 'absolute',
    left: 40,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 10],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  const handleLabelPress = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const inputRef = useRef(null);

  const clearText = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        onPress={handleLabelPress}
        style={[labelStyle, styles.label]}>
        {label}
      </Animated.Text>
      <View>
      {editable === false ? (
        <Pressable onPress={showDatePicker} style={[styles.input, styles.dateInput]}>
          <Text>{value ? String(value) : "jj/mm/aaaa"}</Text>
        </Pressable>
      ) : (
        <TextInput
          ref={inputRef}
          style={[styles.input, multiline && styles.multilineInput]}
          value={String(value)}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          keyboardType={keyboardType}
          maxLength={maxLength}
          required={required}
          editable={editable}
          {...rest}
        />
      )}
      {showCrossIcon && value !== '' && (
        <Icon name="cross" size={24} color={colors.black} style={styles.icon} onPress={clearText} />
      )}
    </View>
    </View>
  );
};

const ValidationAppointment = ({ route, session, dataConfirm, isLoadingAppointment, params, paiementIntent }) => {
  const { tokenappointment } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apptToCancel, setApptToCancel] = useState(null);
  const [showAppointmentList, setShowAppointmentList] = useState(false);
  const [securityNumber, setSecurityNumber] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [thisDate, setThisDate] = useState('');
  const [cardDetails, setCardDetails] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const inputRef = useRef(null); 

  useEffect(() => {
    if (dataConfirm && dataConfirm.apptinput) {
      const securityNumberInput = dataConfirm.apptinput.find(input => input.name === 'client_nir');
      const reasonForAppointmentInput = dataConfirm.apptinput.find(input => input.name === 'note');
      const thisDateInput = dataConfirm.apptinput.find(input => input.name === 'client_birthday');

      if (securityNumberInput) {
        setSecurityNumber(securityNumberInput.value);
      }
      if (reasonForAppointmentInput) {
        setReasonForAppointment(reasonForAppointmentInput.value);
      }
      if (thisDateInput) {
        setThisDate(thisDateInput.value);
      }
    }
  }, [dataConfirm]);

  useEffect(() => {
    if (cardDetails?.complete) {
      createPaymentMethod({ paymentMethodType: 'Card', card: cardDetails })
        .then(paymentMethodResponse => {
          if (paymentMethodResponse.error) {
            return;
          }
          const paymentId = paymentMethodResponse.paymentMethod.id;
          setPaymentMethodId(paymentId)
        })
        .catch(error => {
          console.error('Error catch  creating payment method:', error);
        });
    }
  }, [cardDetails]);



  useEffect(() => {
    if (dataConfirm?.apptsinprogress?.appts.length > 0) {
      setShowAppointmentList(true);
    } else {
      setShowAppointmentList(false);
    }
  }, [dataConfirm]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const formatDateToString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const cleardate = () => {
    setThisDate("")
  }


  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setThisDate(formatDateToString(date));
    hideDatePicker();
    inputRef.current.blur();
  };

  const dispatch = useDispatch();

  const handleSecurityNumberChange = text => {
    setSecurityNumber(text);
  };

  const handleReasonForAppointmentChange = text => {
    setReasonForAppointment(text)
  };

  const handleCancelAppt = async () => {
    if (apptToCancel) {
      const tokenappointment = apptToCancel?.token
      await dispatch(cancelAppointmentRequest({ tokenappointment: tokenappointment }));
      await dispatch(createAppointmentRequest(params.tokenappointment, params.week, params.data, params.action, params.session));
      setApptToCancel(null);
      setShowDeleteModal(false);
    }
  }

  const mandatoryFields = [
    { label: 'Date de naissance', mandatory: '1', name: 'client_birthday', value: thisDate },
    { label: 'Numéro de sécurité social', mandatory: '0', name: 'client_nir', value: securityNumber },
    { label: 'Motif du Rdv', mandatory: '1', name: 'note', value: reasonForAppointment }
  ];

  const handleConfirmationAppointment = async (week, data, action) => {
    const replacedData = data
      .replace('#BIRTHDAY#', thisDate)
      .replace('#NIR#', securityNumber)
      .replace('#NOTE#', reasonForAppointment);

    const filledMandatoryFields = mandatoryFields.filter((field) => field?.value.trim() !== '');
    if (mandatoryFields.length === filledMandatoryFields.length) {
      await dispatch(createAppointmentRequest(tokenappointment, week, replacedData, action, session, {paymentMethodId}));

    }
  };

  const areAllMandatoryFieldsFilled = mandatoryFields
    .filter(field => field.mandatory === "1")
    .every(field => field.value.trim() !== '');

  return (
    <ContainerScreen isLoading={isLoadingAppointment}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
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
              <CustomText fontSize={14} fontWeight='bold' color={colors.black}>Êtes-vous sûr de vouloir annuler ce rendez-vous ?</CustomText>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                <CustomAppButton
                  onPress={() => setShowDeleteModal(false)}
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
                  onPress={() => handleCancelAppt(apptToCancel)}
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

      {showAppointmentList ? (
        <ScrollView keyboardShouldPersistTaps='handled'>
          <CustomText fontSize={12} color={colors.black} style={{ marginVertical: 12 }}>
            {dataConfirm?.apptsinprogress?.message}
          </CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <CustomAppButton
              onPress={() => setShowAppointmentList(false)}
              title='POURSUIVRE LA PRISE DE RDV'
              alignSelf="baseline"
              paddingVertical={16}
              paddingHorizontal={20}
              textColor={colors.white}
              textfontSize={12}
              borderRadius={10}
              bkgroundColor={colors.blue}
              fontWeight='bold'
              userIcon
              display='none'
            />
          </View>
          {dataConfirm?.apptsinprogress?.appts.map((appt, index) => (
            <AppointmentDetails
              key={index}
              date={appt?.date}
              doctor={appt?.doctor}
              appointmentType={appt?.label}
              buttonBorderColor={colors.red}
              buttonTextColor={colors.red}
              cancelButton='Annuler'
              firstCompartmentBackgroundColor={colors.blue}
              userIcon={true}
              display='flex'
              handleCancelAppt={() => {
                setApptToCancel(appt);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView keyboardShouldPersistTaps='handled'>
          <ValidationInfoRDV
            title={dataConfirm?.messagenbperson}
            date={dataConfirm?.appttovalid?.date}
            doctor={dataConfirm?.appttovalid?.doctor}
            place={dataConfirm?.appttovalid?.description}
            patient={dataConfirm?.appttovalid?.patient}
          />

          <SafeAreaView>
            <View style={styles.card}>
              <View style={styles.titleRDV}>
                <CustomText
                  fontSize={15}
                  fontWeight={700}
                  color={colors.black}
                  style={styles.title}>
                  INFORMATIONS A COMPLETER
                </CustomText>
              </View>

              <View style={styles.compartment}>
                {dataConfirm?.apptinput &&
                  dataConfirm?.apptinput.map((input, index) => {
                    return (
                      <FloatingLabelInput
                        key={index}
                        label={input?.label}
                        value={input?.name === 'client_birthday' ? thisDate : input?.name === 'client_nir' ? securityNumber : input?.name === 'note' ? reasonForAppointment : input?.value}
                        onChangeText={input?.name === 'client_birthday' ? cleardate : input?.name === 'client_nir' ? handleSecurityNumberChange : handleReasonForAppointmentChange}
                        onFocus={input?.name === 'client_birthday' ? showDatePicker : null}
                        placeholderTextColor="gray"
                        maxLength={input?.name === 'note' ? 40 : 10}
                        keyboardType={input?.name === 'note' ? 'default' : 'numeric'}
                        numberOfLines={input?.name === 'note' ? 6 : 1}
                        multiline={input?.name === 'note'}
                        showCrossIcon={input?.name !== 'client_birthday'}
                        required={input?.mandatory === "1"}
                        editable={input?.name !== 'client_birthday'}
                        showDatePicker = {input?.name === 'client_birthday' ? showDatePicker : null}
                        // ref={inputRef}
                      />
                    );
                  })}

              </View>
            </View>
          </SafeAreaView>

          {dataConfirm?.payment && Object.keys(dataConfirm.payment).length > 0 && (
            <View style={styles.cardPaiement}>
              <CardField
                postalCodeEnabled={false}
                expiry
                placeholders={{
                  number: '**** **** **** ****',
                }}
                cardStyle={{
                  placeholderColor: "grey",
                  textColor: '#000000',
                  borderRadius: 12,
                  fontSize: 12
                }}
                style={{
                  height: 70,
                  marginBottom: 16,
                  marginTop: 4,
                }}
                onCardChange={(newCardDetails) => {
                  setCardDetails(newCardDetails);
                }}
              // onFocus={(focusedField) => {
              //   console.log('focusField', focusedField);
              // }}
              />
            </View>

          )}

          {dataConfirm?.payment && Object.keys(dataConfirm.payment).length > 0 && (
            <ValidationNoticeRDV
              container={`${dataConfirm.payment.amountlabel}: ${dataConfirm.payment.amount}`}
              fontWeight='bold'
            />
          )}

          <View style={{ marginVertical: 12 }}>
            <ValidationNoticeRDV
              container={dataConfirm?.messageglobalinternet}
            />
          </View>

          {dataConfirm?.payment && Object.keys(dataConfirm.payment).length > 0 && (
            <ValidationNoticeRDV
              container={dataConfirm?.payment?.infos}
            />
          )}

          <View style={{ width: '100%', marginVertical: 10 }}>
            <CustomAppButton
              onPress={() => handleConfirmationAppointment(dataConfirm.apptbuttonvalidation.onclick_week, dataConfirm.apptbuttonvalidation.onclick_data, dataConfirm.apptbuttonvalidation.onclick_action)}
              iconComponent={<MaterialIcons name="save" size={18} color={colors.white} style={{ marginRight: 5 }} />}
              title={dataConfirm?.apptbuttonvalidation?.label}
              alignSelf="center"
              paddingVertical={15}
              textColor={colors.white}
              textfontSize={12}
              borderRadius={10}
              bkgroundColor={colors.blue}
              width='100%'
              disabled={dataConfirm?.payment && Object.keys(dataConfirm.payment).length > 0 ? (!areAllMandatoryFieldsFilled || !paymentMethodId) : !areAllMandatoryFieldsFilled }
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            theme={{
              backgroundColor: "blue",
              headerTextColor: "white",
              headerBackgroundColor: "blue",
              accentColor: "white",
              textDayFontSize: 18,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16,
              textDayFontWeight: "bold",
            }}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </ScrollView>
      )}

    </ContainerScreen>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10,

  },
  compartment: {
    paddingHorizontal: 15,
    gap: 25,
  },
  container: {
    position: 'relative',
    marginVertical: 10
  },
  input: {
    marginLeft: 24,
    marginRight: 24,
    borderWidth: 1,
    paddingLeft: 15,
    paddingTop: 15,
    color: colors.black,
    fontSize: 12,
    borderRadius: 6,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  dateInput:{
    paddingBottom: 15,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 150,
    fontWeight: '500',
  },
  label: {
    zIndex: 1,
    backgroundColor: 'white',
    fontSize: 12,
  },
  icon: {
    position: 'absolute',
    marginRight: 15,
    right: 20,
    top: '30%',
  },
  titleRDV: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
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

const mapStateToProps = (state) => ({
  dataConfirm: state.AppointmentReducer?.dataConfirm,
  session: state.AppointmentReducer?.session,
  isLoadingAppointment: state.AppointmentReducer?.isLoading,
  params: state.AppointmentReducer?.params,
  paiementIntent: state.AppointmentReducer?.paiementIntent
});

export default connect(mapStateToProps)(ValidationAppointment);