import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderIcons } from "../utils/helpers"
import Home from '../screens/Home';
import Notifications from '../screens/Notification';
import Inscription from '../screens/Inscription';
import UserLogin from '../screens/Login';
import ResultatRecherche from '../screens/Resultat';
import DoctorDetails from '../screens/DoctorDetails';
import SearchResult from '../screens/Resultat';
import Motifs from '../screens/Motifs';
import AppointmentPlanification from '../screens/AppointmentPlanification';
import ValidationAppointment from '../screens/ValidationAppointment';
import AppointmentConfirmation from '../screens/AppointmentConfirmation';
import ListOfDoctor from '../screens/ListOfDoctor';

const Stack = createStackNavigator();

const pageOption = { headerShown: false, gestureDirection: 'horizontal' };


const UnauthenticatedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={pageOption} component={Home} initialParams={{ right: HeaderIcons.MENU }} />
      <Stack.Screen name="Inscription rapide" options={pageOption} component={Inscription} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Se connecter" options={pageOption} component={UserLogin} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Résultat" options={pageOption} component={ResultatRecherche} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Détail du médécin" options={pageOption} component={DoctorDetails} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Notifications" options={pageOption} component={Notifications} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Résultats" options={pageOption} component={SearchResult} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Motif du Rendez-vous" options={pageOption} component={Motifs} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Jour et Heure du Rdv" options={pageOption} component={AppointmentPlanification} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.MENU }} />
      <Stack.Screen name="Valider le Rendez-vous" options={pageOption} component={ValidationAppointment} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
      <Stack.Screen name="Confirmation rdv" options={pageOption} component={AppointmentConfirmation} />
      <Stack.Screen name="Fixez rendez-vous" options={pageOption} component={ListOfDoctor} initialParams={{ left: HeaderIcons.GO_BACK, right: HeaderIcons.ACCOUNT }} />
    </Stack.Navigator>
  );
};

export default UnauthenticatedNavigator;
