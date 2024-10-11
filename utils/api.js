import { getToken } from "./helpers";
import { showMessage } from "react-native-flash-message";

const json = 'application/json; charset=utf-8';
const remoteUrl = "https://www.logicrdv.fr/api/";

export const request = async (method, url, data, headers = {}) => {
  try {
    const token = await getToken();
    if (token) {
      headers['X-LOGICRDV-AUTH'] = token;
    }

    const response = await fetch(remoteUrl + url, {
      method,
      headers: {
        'Content-Type': json,
        ...headers,
      },
      body: JSON.stringify(data),
      timeout: 15000,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      let description = errorBody?.message || 'Erreur lors de la requête';
      showMessage({
        message: 'Erreur',
        description: `Erreur  : ${description}`,
        type: 'danger',
        duration: 3500,
      });
      throw new Error('Erreur lors de la requête: ' + response.status);
    }

    return await response.json();
  } catch (error) {
    if (error.message.includes("Network request failed")) {
      showMessage({
        message: 'Erreur de connexion',
        description: `Veuillez vérifier votre connexion Internet`,
        type: 'danger',
        duration: 3500,
      });
    } else {
      // throw error;
    }
  }
  
};


export const sendRequest = async (method, url, data) => {
  try {
    return await request(method, url, data);
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    throw error;
  }
};
