import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendRequest } from './api';
import { showMessage } from 'react-native-flash-message';
export const HeaderIcons = {
  SEARCH: 'magnify',
  GO_BACK: 'arrow-back-ios',
  ACCOUNT: 'account-circle',
  MENU: 'menu',
  PLUS: 'plus-circle'
};

export const getToken = async () => {
  return AsyncStorage.getItem('tokenLogicRdv');
};

const setToken = async (token) => {
  AsyncStorage.setItem('tokenLogicRdv', token);
};

export const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    } else {
      console.log('Aucune donnée utilisateur trouvée.');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return null;
  }
};

export const getInstallationId = async () => {
  try {
    const installationIdString = await AsyncStorage.getItem('installationId');
    if (installationIdString) {
      return installationIdString;
    } else {
      console.log('Aucune installationId trouvée.');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de installationId:', error);
    return null;
  }
}

export const setInstallationId = async (installationId) => {
  try {
    if(installationId) {
      await AsyncStorage.setItem('installationId', JSON.stringify(installationId));
    } 
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de installationId:', error);
  }
}

export const isSubscribedNotification = async () => {
  try {
    const isSubscribe = await AsyncStorage.getItem('isSubscribe');
    if (isSubscribe) {
      return isSubscribe;
    } else {
      console.log('Aucune isSubscribe trouvée.');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de isSubscribe:', error);
    return null;
  }
}

export const setIsSubscribeNotification = async (value) => {
  try {
    await AsyncStorage.setItem('isSubscribe', value.toString());
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de isSubscribe:', error);
  }
}

export const setUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des informations utilisateur:', error);
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    showMessage({
      message: 'Déconnexion réussie',
      description: 'Vous êtes maintenant déconnecté.',
      type: 'success',
      duration: 3500,
    });
  } catch (error) {
    console.error('Erreur lors de la suppression des informations utilisateur:', error);
    throw error;
  }
};


export const generateToken = async () => {
  try {
    dataToken = {
      client_project: 'cf6c306bab',
      client_secret: '043a348ddcb9031c4a192f2ae4917cf096c799a4'
    };
    const response = await sendRequest('POST', 'token/get/', dataToken );

    const authorizationHeader = response.data.authorization;
    const token = authorizationHeader.split(' ')[1];
    await setToken(token);
    return token;
  } catch (error) {
    console.error('Erreur lors de la génération du token:', error);
    throw error;
  }
};

export const checkTokenValidity = async () => {
  try {
    const endpoint = 'token/check/'
    const response = await sendRequest('POST', endpoint, null);
    if (response.httpstatut === 200) {
      return true;
    } else if (response.httpstatut === 401) {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const isAuth = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};


export const initializeApp = async () => {

  try {
    const token = await getToken();
    if (!token) {
      const newToken = await generateToken();
      return newToken;
    } else {
      const tokenIsValid = await checkTokenValidity();
      if (!tokenIsValid) {
        const newToken = await generateToken();
        return newToken;
      } else {
        return token;
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application:", error);
    throw error;
  }
};