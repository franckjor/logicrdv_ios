import React, { useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Doctor from '../../components/global/Doctor';
import { useNavigation } from '@react-navigation/native';
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import { colors } from '../../components/global/colors';
import { useDispatch, connect } from 'react-redux';
import { listDoctorRequest } from '../../redux/appointment/actions';
import CustomText from '../../components/global/CustomText';

function PatientManagement({ listDoctor, isLoading }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDoctorRequest());
  }, []);

  const handleListPatient = (doctor) => {
    const tokenappointment = doctor?.appointment?.token
    navigation.navigate('Liste des patients', { tokenappointment });
  };

  return (
    <ContainerScreen isLoading={isLoading}>
      {listDoctor.length > 0 ? (
        <ScrollView>
          {
            listDoctor.map((doctor, index) => (
              <TouchableOpacity key={doctor.id} onPress={() => handleListPatient(doctor)}>
                <Doctor
                  texte2={doctor.category}
                  texte3={doctor.address}
                  texte4={`${doctor.zip} ${doctor.city}`}
                  texte1={doctor.civility ? `${doctor.civility} ${doctor.nom}` : doctor.nom}
                  texte5={doctor.tel}
                  colorTitle={colors.yellow}
                  colorContain={colors.blue}
                  fontWeight={'bold'}
                  isArrowIcon
                  isProfileIcon
                />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      ) : (
        <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/images/favicon.jpg')} style={{ width: 25, height: 25, borderRadius: 5 }} />
          <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
        </View>
      )}
    </ContainerScreen>
  );
}
const mapStateToProps = ({ AppointmentReducer }) => ({
  listDoctor: AppointmentReducer.listDoctor,
  isLoading: AppointmentReducer.isLoading,
});

export default connect(mapStateToProps)(PatientManagement);
