import React, { useEffect, useState } from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen'
import { ScrollView, ImageBackground, StyleSheet, View,Linking } from 'react-native'
import PatientDetailsThree from '../../components/Prepaiement/PatientDetailsThree'
import PatientdetailsTwo from '../../components/Prepaiement/PatientdetailsTwo'
import CustomText from '../../components/global/CustomText'
import { colors } from '../../components/global/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { paiementApptRequest } from '../../redux/appointment/actions'
import CustomAppButton from '../../components/global/CustomAppButton'
import { CardField, createPaymentMethod, confirmPayment, } from '@stripe/stripe-react-native';
import { makePaiementRequest } from '../../redux/paiement/actions'

const Paiement = (
  {
    isLoading,
    paiement,
    route,
  }
) => {
  const { tokentelecons } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cardDetails, setCardDetails] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  
  const makePhoneCall = (phoneNumber) => {
    let phoneNumberString = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneNumberString)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumberString);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  
  useEffect(() => {
    if (cardDetails?.complete) {
      createPaymentMethod({ paymentMethodType: 'Card', card: cardDetails })
        .then(paymentMethodResponse => {
          if (paymentMethodResponse.error) {
            console.log('Error creating payment method:', paymentMethodResponse.error);
            return;
          }
          console.log("paymentMethodResponse", paymentMethodResponse)
          const paymentId = paymentMethodResponse.paymentMethod.id;
          setPaymentMethodId(paymentId)
        })
        .catch(error => {
          console.error('Error catch  creating payment method:', error);
        });
    }
  }, [cardDetails]);

  const handleVideocall = () => {
    navigation.navigate("Video Call", { paiement })
  }

  const handlePrepaiement = () => {
    const paiementIntent = paiement?.payment?.stripeClientSecret
    dispatch(makePaiementRequest(paymentMethodId, paiementIntent, false))
    dispatch(paiementApptRequest(tokentelecons));
  }

  useEffect(() => {
    dispatch(paiementApptRequest(tokentelecons));
  }, []);

  return (
    <ContainerScreen isLoading={isLoading}>
      <ImageBackground source={require('../../assets/images/background_tc.png')} style={styles.backgroundImage}>
        <ScrollView >
          <View style={styles.screenContainer}>
            <View style={styles.container}>
              <CustomText fontSize={18} color={colors.black} fontWeight={'bold'} >
                {paiement?.etablissement?.nom}
              </CustomText>
              <CustomText fontSize={16} color={colors.black} style={{ fontStyle: 'italic' }}>
                {paiement?.etablissement?.zip}
              </CustomText>
              <CustomText fontSize={16} color={colors.black} style={{ fontStyle: 'italic' }}>
                {paiement?.etablissement?.address}
              </CustomText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CustomText fontSize={16} color={colors.black}>
                  {paiement?.etablissement?.tel}
                </CustomText>
                <View style={[styles.circle, { backgroundColor: colors.blue, marginLeft: 15, }]}>
                  <Icon name="phone" onPress={() => makePhoneCall(paiement?.etablissement?.tel)} size={18} color={colors.white} />
                </View>
              </View>
            </View>
            <PatientdetailsTwo
              detailsTitle={paiement?.appt?.description}
              doctorName={paiement?.appt?.doctor}
              patientName={paiement?.appt?.patient}
              dateTime={paiement?.appt?.date} />
            <PatientDetailsThree
              motif={paiement?.payment?.title}
              paragraph1={paiement?.payment?.statuslabel}
              paragraph2={paiement?.payment?.text}
              textBottom={paiement?.payment?.history !== '' ? paiement?.payment?.history : null}
            />
            {paiement?.payment?.stripeClientSecret !== '' && (
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
            )}

            {paiement?.appt?.buttoncancel === "1" && (
              <View style={{ width: '100%', marginTop: 15 }}>
                <CustomAppButton
                  onPress={paiement?.payment?.stripeClientSecret !== '' ? handlePrepaiement : handleVideocall}
                  iconComponent={paiement?.infos?.buttonstartteleconsdisabled === '1' ? (<MaterialIcons name="credit-card" size={18} color={colors.white} style={{ marginRight: 5 }} />) : (<MaterialIcons name="featured-video" size={18} color={colors.white} style={{ marginRight: 5 }} />)}
                  title={paiement?.payment?.stripeClientSecret !== '' ? 'Prépaiement' : 'Lancer la Téléconsultation'}
                  alignSelf="center"
                  paddingVertical={15}
                  textColor={colors.white}
                  textfontSize={14}
                  borderRadius={10}
                  bkgroundColor={colors.blue}
                  width='100%'
                  disabled={paiement?.payment?.stripeClientSecret !== '' ? !cardDetails?.complete : false}
                />
              </View>
            )}

          </View>
        </ScrollView>
      </ImageBackground>
    </ContainerScreen>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'repeat',
    width: '100%',
    height: '100%',
  },
  screenContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 12,
    marginVertical: 25
  },
  container: {
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    borderColor: "#00B35C",
    borderWidth: 1,
    padding: 15,
    paddingVertical: 35,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  paiement: state.AppointmentReducer?.paiement,
  isLoading: state.AppointmentReducer?.isLoading,
});

export default connect(mapStateToProps)(Paiement);
