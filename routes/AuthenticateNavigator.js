import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderIcons } from '../utils/helpers';
import Motifs from '../screens/Motifs';
import AppointmentPlanification from '../screens/AppointmentPlanification';
import ValidationAppointment from '../screens/ValidationAppointment';
import AppointmentConfirmation from '../screens/AppointmentConfirmation';
import PatientManagement from '../screens/PatientManagment';
import Message from '../screens/Message';
import ListOfPatients from '../screens/ListOfPatients';
import ListOfDoctor from '../screens/ListOfDoctor';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Paiement from '../screens/Paiement';
import EditProfileOption from '../screens/EditProfileOption';
import EditProfile from '../screens/EditProfile';
import ConditionOfUse from '../screens/ConditionOfUse';
import DoctorDetails from '../screens/DoctorDetails';
import Notifications from '../screens/Notification';
import SearchResult from '../screens/Resultat';
import VideoCall from '../screens/Video_Call';
import PatientConfirmation from '../screens/PatientConfirmation';
import Home from '../screens/Home';


const Stack = createStackNavigator();
const pageOption = { headerShown: false, gestureDirection: 'horizontal' };


const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Mes rendez-vous" >
      <Stack.Screen name="Détail du médécin" options={pageOption} component={DoctorDetails} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Mes rendez-vous" options={pageOption} component={Appointments} initialParams={{ left: HeaderIcons.SEARCH, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Recherche d'un praticien" options={pageOption} component={Search} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Résultats" options={pageOption} component={SearchResult} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Fixez rendez-vous" options={pageOption} component={ListOfDoctor} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Motif du Rendez-vous" options={pageOption} component={Motifs} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Jour et Heure du Rdv" options={pageOption} component={AppointmentPlanification} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Confirmation rdv" options={pageOption} component={AppointmentConfirmation} />
      <Stack.Screen name="Confirmation patient" options={pageOption} component={PatientConfirmation} />
      <Stack.Screen name="Valider le Rendez-vous" options={pageOption} component={ValidationAppointment} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Paiement" options={pageOption} component={Paiement} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Message" options={pageOption} component={Message} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Gestion des patients" options={pageOption} component={PatientManagement} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Liste des patients" options={pageOption} component={ListOfPatients} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Profil" options={pageOption} component={EditProfileOption} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Modification du profil" options={pageOption} component={EditProfile} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Notifications" options={pageOption} component={Notifications} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Conditions Générales d'utilisation" options={pageOption} component={ConditionOfUse} initialParams={{ left: HeaderIcons.GO_BACK }} />
      <Stack.Screen name="Video Call" options={pageOption} component={VideoCall} initialParams={{ left: HeaderIcons.GO_BACK }} />
      <Stack.Screen name="Home" options={pageOption} component={Home} initialParams={{ right: HeaderIcons.MENU }} />

    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
