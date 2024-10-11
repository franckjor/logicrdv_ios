import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Switch, ActivityIndicator,BackHandler,AppState,Platform  } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { colors } from '../components/global/colors';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/auth/actions';  
import { isSubscribedNotification, removeUserData, setIsSubscribeNotification } from '../utils/helpers';
import CustomText from '../components/global/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { showMessage } from 'react-native-flash-message';
import { listNotificationsRequest,manageNotificationRequest } from '../redux/notification/actions';
import { clearAppointmentData, createAppointmentRequest } from '../redux/appointment/actions';

const DrawerContent = ({ navigation, isAuth,userData }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const subscriptionStatus = await isSubscribedNotification();
      setIsSubscribed(subscriptionStatus === 'true'); // Convertit la chaîne en booléen
    };
    getSubscriptionStatus();
  }, []);


  const toggleNotification = async (value, callback) => {
  
    try {
      await setIsSubscribeNotification(value.toString());
      await setIsSubscribed(value);
  
      if (callback) {
        callback(value);
      }
      if (value) {
        dispatch(listNotificationsRequest());
        dispatch(manageNotificationRequest(true));
      } else {
        dispatch(manageNotificationRequest(false));
      }

     
    } catch (error) {
      console.error('Erreur lors du basculement des notifications:', error);
      throw error;
    }
  };
  

  const handleExitApp = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
      navigation.closeDrawer();
    } else if (Platform.OS === 'ios') {
      if (AppState.exitApp) {
        AppState.exitApp();
      } 
    }
  };

  const navigateToScreen = (screenName) => () => {
    navigation.navigate(screenName);
  };

  const disconnect = async () => {
    try {
      setLoading(true);
      await removeUserData();
      navigation.closeDrawer();
      dispatch(setLoggedIn(false,null));
      dispatch(clearAppointmentData());
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      showMessage({
        message: 'Erreur',
        description: 'Une erreur est survenue lors de la déconnexion.',
        type: 'danger',  
        duration: 3500,
      });
    }
    finally {
      dispatch(clearAppointmentData());
      setLoading(false);
    }
  };

  const renderHeader = () => {
    if (isAuth) {
      return (
        <View style={styles.containerHeader}>
          <View style={styles.header}>
          <Image source={require('../assets/images/user.png')} style={styles.circleUserAuth} />
            <TouchableOpacity onPress={handleExitApp} >
              <CustomText fontSize={14} fontWeight={'700'} color={colors.white} style={styles.drawerItem}>
                Quitter
              </CustomText>
            </TouchableOpacity>
          </View>
          <View>
            <CustomText fontSize={14} fontWeight={'700'} color={colors.white} style={styles.drawerItem}>
            {`${userData?.nom} ${userData?.prenom}`}
            </CustomText>
            <CustomText fontSize={14} fontWeight={'700'} color={colors.white} style={{ paddingHorizontal: 10, }}>
              {userData?.email}
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 1 }}>
            <CustomText fontSize={8} fontWeight={'700'} color={colors.white} style={styles.drawerItem}>
              V 1.0.4
            </CustomText>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <View style={styles.circle}>
              <View style={styles.containeImage}>
                <Image source={require('../assets/images/Logo.png')} style={styles.image} />
              </View>
            </View>
            <TouchableOpacity onPress={handleExitApp} >
              <CustomText fontSize={14} fontWeight={'700'} color={colors.white} style={styles.drawerItem}>
                Quitter
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, marginBottom: 5 }}>
            <CustomText fontSize={8} fontWeight={'700'} color={colors.white} style={styles.drawerItem}>
              V 1.0.4
            </CustomText>
          </View>
        </View>
      );
    }
  };

  const renderMenuItems = () => {
    if (isAuth) {
      return (
        <>
          <TouchableOpacity onPress={navigateToScreen('Mes rendez-vous')} style={styles.menuItem}>
            <Entypo name="home" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Mes rendez-vous
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen('Fixez rendez-vous')} style={styles.menuItem}>
            <Icon name="magic" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Fixez rendez-vous
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen('Message')} style={styles.menuItem}>
            <MaterialIcons name="message" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Documents et messages
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen('Gestion des patients')} style={styles.menuItem}>
            <MaterialIcons name="folder-shared" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Gestion de la famille
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen('Profil')} style={styles.menuItem}>
            <FontAwesome name="user-large" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Mon compte
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen("Recherche d'un praticien")} style={styles.menuItem}>
            <MaterialIcons name="search" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Recherche d'un praticien
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen('Notifications')} style={styles.menuItem}>
            <MaterialIcons name="notifications" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Mes notifications
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={disconnect} style={styles.menuItem}>
            <MaterialIcons name="logout" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Déconnexion
            </CustomText>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={navigateToScreen('Home')} style={styles.menuItem}>
            <Entypo name="home" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Accueil
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToScreen('Notifications')} style={styles.menuItem}>
            <MaterialIcons name="notifications" size={20} color={colors.blue} />
            <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
              Notification
            </CustomText>
          </TouchableOpacity>
        </>
      );
    }
  };

  const renderFooter = () => {
    if (isAuth) {
      return (
        <View style={styles.version}>
          <View style={[styles.containerToggle, { justifyContent: 'space-between' }]}>
            <TouchableOpacity onPress={navigateToScreen('Home')} style={styles.menuItem}>
              {isSubscribed ? <MaterialIcons name="notifications-on" size={20} color={colors.blue} /> : <MaterialIcons name="notifications-off" size={20} color={colors.blue} />}
              <CustomText fontSize={14} fontWeight={'700'} color={colors.black} style={styles.drawerItem}>
                Notification
              </CustomText>
            </TouchableOpacity>
            <Switch
              trackColor={{ false: colors.gray300, true: colors.blue }}
              thumbColor={isSubscribed ? colors.blue : colors.gray100}
              ios_backgroundColor={colors.gray200}
              onValueChange={toggleNotification}
              value={isSubscribed}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <CustomText fontSize={14} fontWeight={'700'} color={colors.blue} style={styles.drawerItem}>
              Version 1.0.4
            </CustomText>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.version}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <CustomText fontSize={14} fontWeight={'700'} color={colors.blue} style={styles.drawerItem}>
              Version 1.0.4
            </CustomText>
          </View>
        </View>
      );
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : (
        <>
          <DrawerContentScrollView style={{ marginBottom: '-35%' }}>
            {renderHeader()}
            {renderMenuItems()}
          </DrawerContentScrollView>
          {renderFooter()}
        </>
      )}
    </>
  );
};


const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.blue,
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginTop: -10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  circle: {
    flexDirection: 'row',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginLeft: 10,
  },
  circleUserAuth: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  containeImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    objectFit: 'contain',
    width: 60,
  },
  containerToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  version:{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    marginTop:10,
  }
});

const mapStateToProps = ({ AuthReducer }) => ({
  userData: AuthReducer.userData,
});

export default connect(mapStateToProps)(DrawerContent);

