import React, { useEffect } from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import Motif from '../../components/Motif/Motif';
import { useDispatch, connect } from 'react-redux';
import { TouchableOpacity, View, Image } from 'react-native';
import { createAppointmentRequest } from '../../redux/appointment/actions';
import CustomText from '../../components/global/CustomText';
import { colors } from '../../components/global/colors';


const Motifs = ({ isLoadingAppointment, dataMotifs, session, params }) => {
  const tokenappointment = params.tokenappointment;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createAppointmentRequest(tokenappointment));
}, [tokenappointment]);

  const handleCreneaux = async (motif) => {
    await dispatch(createAppointmentRequest(tokenappointment, motif?.onclick_week, motif?.onclick_data, motif?.onclick_action, session, motif?.description));
  };  

  return (
    <ContainerScreen isLoading={isLoadingAppointment}>
      {dataMotifs.length > 0 ?
        dataMotifs?.map((motif, index) => (
          <TouchableOpacity key={index} onPress={() => handleCreneaux(motif)}>
            <Motif
              labelplace={motif?.labelplace}
              color={motif?.color}
              description={motif?.description}
            />
          </TouchableOpacity>
        ))
        :
        <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/images/favicon.jpg')} style={{ width: 25, height: 25, borderRadius: 5 }} />
          <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
        </View>
      }
    </ContainerScreen>
  )
}
const mapStateToProps = (state) => ({
  dataMotifs: state.AppointmentReducer?.dataMotifs,
  session: state.AppointmentReducer?.session,
  isLoadingAppointment: state.AppointmentReducer?.isLoading,
  params: state.AppointmentReducer?.params,
});

export default connect(mapStateToProps)(Motifs);
