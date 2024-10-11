import React, { useState, useEffect } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import CustomText from '../../components/global/CustomText'
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import { colors } from '../../components/global/colors';
import CustomAppButton from '../../components/global/CustomAppButton';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { loginRequest, signUpRequest } from '../../redux/auth/actions';
import { registerStyles } from './styles';

const Inscription = ({ etablissements, cgu, isLoading }) => {


    useEffect(() => {
        if (etablissements.length === 1) {
            setSelectedFormation(etablissements[0].id);
        } else {
            setSelectedFormation(null);
        }
    }, [etablissements]);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedFormation, setSelectedFormation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isFindCabinetButtonEnabled = phoneNumber.trim() !== '';

    const isSignUpButtonEnabled =
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        number.trim() !== '' &&
        email.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        isChecked;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onChangePhoneNumber = (text) => {
        setPhoneNumber(text);
    };

    const onChangeFirstName = (text) => {
        setFirstName(text);
    };

    const onChangeLastName = (text) => {
        setLastName(text);
    };

    const onChangeNumber = (text) => {
        setNumber(text);
    };

    const onChangeEmail = (text) => {
        setEmail(text);
    };

    const onChangePassword = (text) => {
        setPassword(text);
        if (confirmPassword !== '' && text !== confirmPassword) {
            setPasswordError('Les mots de passe ne correspondent pas');
        } else {
            setPasswordError('');
        }
    };

    const onChangeConfirmPassword = (text) => {
        setConfirmPassword(text);
        if (text !== password) {
            setPasswordError('Les mots de passe ne correspondent pas');
        } else {
            setPasswordError('');
        }
    };

    const handleSignIn = () => {
        dispatch(loginRequest('', '', ''));
        navigation.navigate('Se connecter');
    };

    const checkCabinet = () => {
        const data = { "phone": phoneNumber };
        dispatch(signUpRequest("check", data));
    };

    const handleConditionOfUse = () => {
        navigation.navigate("Conditions Générales d'utilisation");
    };

    const onSubmit = () => {
        const data = {
            "id": selectedFormation,
            "nom": firstName,
            "prenom": lastName,
            "mobile": number,
            "email": email,
            "pass1": password,
            "pass2": confirmPassword,
            "cgu": isChecked,
            "phone": phoneNumber
        }
        dispatch(signUpRequest("add", data))
    };

    return (
        <ContainerScreen isLoading={isLoading}>
            <ScrollView>
                <View>
                    <View style={registerStyles.card}>
                        <CustomText fontSize={14} fontWeight='bold' color={colors.black}>J'ai déja un compte LogicRdv</CustomText>
                        <TouchableOpacity onPress={handleSignIn}>
                            <CustomText fontSize={14} fontWeight='bold' color={colors.blue}>SE CONNECTER</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={registerStyles.card}>
                        <CustomText fontSize={15} fontWeight='bold' color={colors.black}>Inscription</CustomText>
                        <CustomText fontSize={14} color={colors.black}>Saisissez les informations demandées</CustomText>
                        <View style={{ width: '100%' }} >
                            <TextInput
                                style={[registerStyles.input, { marginLeft: -6, marginRight: -6 }]}
                                placeholder="Téléphone du cabinet médical"
                                placeholderTextColor={colors.gray}
                                value={phoneNumber}
                                editable={etablissements.length > 0 ? false : true}
                                onChangeText={onChangePhoneNumber}
                                keyboardType='numeric'
                            />
                        </View>
                        {etablissements.length > 0 && (
                            <View style={{width: '100%'}}>
                                <View style={registerStyles.dropdownContainer}>
                                    <Picker
                                        selectedValue={selectedFormation}
                                        style={registerStyles.dropdown}
                                        dropdownIconColor={colors.black}
                                        onValueChange={(itemFormation) => setSelectedFormation(itemFormation)}
                                    >
                                        {etablissements.map((etablissement) => (
                                            <Picker.Item key={etablissement.id} label={etablissement.name} value={etablissement.id} />
                                        ))}
                                    </Picker>
                                </View>
                                <TextInput
                                    style={registerStyles.input}
                                    placeholder="Nom"
                                    placeholderTextColor={colors.gray}
                                    value={lastName}
                                    onChangeText={onChangeLastName}
                                />
                                <TextInput
                                    style={registerStyles.input}
                                    placeholder="Prénom"
                                    placeholderTextColor={colors.gray}
                                    value={firstName}
                                    onChangeText={onChangeFirstName}
                                />
                                <TextInput
                                    style={registerStyles.input}
                                    placeholder="Numéro de téléphone"
                                    placeholderTextColor={colors.gray}
                                    value={number}
                                    onChangeText={onChangeNumber}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    style={registerStyles.input}
                                    placeholder="Email"
                                    placeholderTextColor={colors.gray}
                                    value={email}
                                    onChangeText={onChangeEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <View>
                                    <MaterialIcons name="lock" size={24} color={colors.gray100} style={registerStyles.iconLeft} />
                                    <TextInput
                                        style={[registerStyles.input, { paddingLeft: 40 }]}
                                        placeholder="Mot de passe"
                                        placeholderTextColor={colors.gray}
                                        value={password}
                                        onChangeText={onChangePassword}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity >
                                        <Icon
                                            name={showPassword ? "eye-off" : "eye"}
                                            size={24} color={colors.gray100}
                                            onPress={() => setShowPassword(!showPassword)}
                                            style={registerStyles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <MaterialIcons name="lock" size={24} color={colors.gray100} style={registerStyles.iconLeft} />
                                    <TextInput
                                        style={[registerStyles.input, { paddingLeft: 40 }]}
                                        placeholder="Confirmer mot de passe"
                                        placeholderTextColor={colors.gray}
                                        value={confirmPassword}
                                        onChangeText={onChangeConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                    />
                                    <TouchableOpacity >
                                        <Icon
                                            name={showConfirmPassword ? "eye-off" : "eye"}
                                            size={24} color={colors.gray100}
                                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={registerStyles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {passwordError !== '' &&
                                    <CustomText fontSize={8} fontWeight='bold' color={colors.red} style={{ marginLeft: 12, paddingTop: 4 }}>
                                        {passwordError}
                                    </CustomText>
                                }
                                <View style={registerStyles.checkboxContainer}>
                                    <CheckBox
                                        value={isChecked}
                                        onValueChange={setIsChecked}
                                        style={registerStyles.checkbox}
                                        tintColors={{ true: colors.blue, false: colors.black }}
                                    />
                                    <CustomText fontSize={14} color={colors.black} fontWeight={'bold'}>J'ai lu et accepté </CustomText>
                                    <TouchableOpacity onPress={handleConditionOfUse}>
                                        <CustomText fontSize={14} color={colors.orange} fontWeight={'bold'}>les conditions d'utilisation </CustomText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <View style={{ marginTop: 10, width: '100%' }}>
                            <CustomAppButton
                                onPress={etablissements.length > 0 ? onSubmit : checkCabinet}
                                title={etablissements.length > 0 ? "M'inscrire" : "Trouvez votre cabinet"}
                                alignSelf="baseline"
                                paddingVertical={16}
                                textColor={colors.white}
                                textfontSize={14}
                                borderRadius={10}
                                bkgroundColor={colors.blue}
                                width='100%'
                                disabled={etablissements.length > 0 ? !isSignUpButtonEnabled : !isFindCabinetButtonEnabled}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ContainerScreen>
    )
}


const mapStateToProps = ({ AuthReducer }) => ({
    cgu: AuthReducer.cgu,
    etablissements: AuthReducer.etablissements,
    isLoading: AuthReducer.isLoading,
});

export default connect(mapStateToProps)(Inscription);

