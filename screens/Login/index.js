import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity,TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import CustomText from '../../components/global/CustomText'
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import { colors } from '../../components/global/colors';
import CustomAppButton from '../../components/global/CustomAppButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { loginStyles } from './styles';
import { loginRequest } from '../../redux/auth/actions'

const Login = ({ route, session, headerError, headerMessage, inputFields, buttons, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const { type } = route.params;

  useEffect(() => {
    dispatch(loginRequest('', '', '', type));
  }, []);


  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // useEffect(() => {
  //   if(validateEmail(email)) 
  //   {
  //    Keyboard.dismiss();
  //   }
  //    }, [email]);

  const handleInputChange = (text, type) => {
    switch (type) {
      case 'email':
        setEmail(text);
        break;
      case 'password':
        setPassword(text);
        break;
      case 'code':
        setCode(text);
        break;
      default:
        break;
    }
  };

  const handleButtonPress = (action) => {
    Keyboard.dismiss();
    let inputData = '';
    if (action === 'previous') {
      inputData = email;
      setPassword('');
      setCode('');
    } else {
      inputData = password !== '' ? password : code !== '' ? code : email;
    }
    dispatch(loginRequest(inputData, action, session, type));
  };

  const handleSignUp = () => {
    navigation.navigate('Inscription rapide');
  };
  

  return (
    <ContainerScreen isLoading={isLoading}>
      <ScrollView keyboardShouldPersistTaps='handled'  >
        <View>
          <View style={loginStyles.card}>
            <CustomText fontSize={15} fontWeight='bold' color={headerError != "" ? colors.red : colors.black} style={{ textAlign: 'center' }}>
              {headerError != "" ?
                headerError
                :
                headerMessage
              }
            </CustomText>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '100%' }} >
                {inputFields.map((input, index) => (
                  
                  <View style={{ width: '100%' }} key={index}>
                    <TextInput
                      style={loginStyles.input}
                      placeholder={input.label}
                      placeholderTextColor={colors.gray}
                      value={
                        input.name === 'email' && input.value === '' ? email :
                        input.name === 'password' && input.value === '' ? password :
                        input.name === 'code' && input.value === '' ? code :
                        input.value
                      }
                      onChangeText={(text) => handleInputChange(text, input.name)}
                      keyboardType={input.name === 'email' ? 'email-address' : input.name === 'code' ? 'numeric' : 'default'}
                      autoCapitalize={input.name === 'email' ? 'none' : 'sentences'}
                      secureTextEntry={input.name === 'password' ? !showPassword : false}
                    />
                    {input.name === 'password' && (
                      <TouchableOpacity >
                        <Icon name={showPassword ? "eye" : "eye-off"} size={24} color={colors.gray100} style={loginStyles.icon} onPress={() => setShowPassword(!showPassword)} />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View style={{ marginTop: 10, width: '100%' }}>
              <View style={loginStyles.buton}>
                {buttons.map((button, index) => (
                  <CustomAppButton
                    key={index}
                    onPress={() => handleButtonPress(button.onclick_action)}
                    title={button.label}
                    alignSelf="baseline"
                    paddingVertical={16}
                    textColor={colors.white}
                    textfontSize={14}
                    borderRadius={10}
                    bkgroundColor={colors.blue}
                    width='100%'
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={loginStyles.card}>
            <CustomText
              children="Nouveau sur LogicRdv?"
              color={colors.black}
              fontSize={14}
              fontWeight='bold'

            />
            <CustomAppButton
              title="INSCRIPTION RAPIDE"
              onPress={handleSignUp}
              textfontSize={14}
              textColor={colors.blue}
              bkgroundColor='transparent'
              fontWeight='bold'

            />
          </View>
        </View>
      </ScrollView>
    </ContainerScreen>
  )
}

const mapStateToProps = ({ AuthReducer }) => ({
  session: AuthReducer.session,
  headerMessage: AuthReducer.headerMessage,
  headerError: AuthReducer.headerError,
  inputFields: AuthReducer.inputFields,
  buttons: AuthReducer.buttons,
  isLoading: AuthReducer.isLoading
});

export default connect(mapStateToProps)(Login);