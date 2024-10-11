import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import CustomText from '../global/CustomText';
import { colors } from '../global/colors'
import CustomAppButton from '../global/CustomAppButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, Linking, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalView from '../Search/ModalView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';

const MessageDetails = (
    {
        datetime,
        file,
        file1,
        file2,
        from,
        subject,
        to
    }) => {

    const truncateFileName = (fileName, maxLength) => {
        return fileName.length > maxLength ? fileName.slice(0, maxLength - 3) + '...' : fileName;
    };

    // Fonction pour extraire le nom de fichier à partir de l'URL
    const extractFileNameFromURL = (url) => {
        const startIndex = url.lastIndexOf('/') + 1; // Trouve l'indice du dernier '/'
        return url.substring(startIndex); // Extrait le nom de fichier à partir de l'URL
    };

    // Fonction pour télécharger le fichier
    // const handleFileDownload = (fileUrl) => {
    //     Linking.openURL(fileUrl); // Ouvre l'URL dans le navigateur par défaut pour téléchargement
    // };

    const handleFileDownload = (fileUrl) => {
        const { config, fs } = RNFetchBlob;
        let DownloadDir = fs.dirs.DownloadDir; 

        let fileName = extractFileNameFromURL(fileUrl);
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: `${DownloadDir}/${fileName}`, // Path where the file will be downloaded
                description: 'Téléchargement du fichier.'
            }
        };

        config(options)
            .fetch('GET', fileUrl)
            .then((res) => {
                Alert.alert('Téléchargement', 'Fichier téléchargé avec succès.', [{ text: 'OK' }]);
            })
            .catch((error) => {
                Alert.alert('Erreur', 'Échec du téléchargement.', [{ text: 'OK' }]);
                console.error(error);
            });
    };

    return (
        <View style={styles.card}>
            <View style={[styles.compartment, styles.firstCompartment, { backgroundColor: colors.blue }]}>
                <View style={styles.timeDetailsContainer}>
                    <View style={styles.detailsContainer}>
                        <CustomText fontSize={12} color={colors.white}>{datetime}</CustomText>
                    </View>
                </View>
            </View>

            <View style={[styles.compartment, { display: 'flex', flexDirection: 'column', gap: 4 }]}>
                {file && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CustomText fontSize={14} color={colors.black} fontWeight='bold'>Fichier</CustomText>
                        <TouchableOpacity onPress={() => handleFileDownload(file)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <MaterialCommunityIcons name="file" size={16} color={colors.blue} marginRight={5} />
                                <CustomText fontSize={14} color={colors.blue}>{truncateFileName(extractFileNameFromURL(file), 22)}</CustomText>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {file1 && (

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CustomText fontSize={14} color={colors.black} fontWeight='bold'>Fichier 1</CustomText>
                        <TouchableOpacity onPress={() => handleFileDownload(file1)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <MaterialCommunityIcons name="file" size={16} color={colors.blue} marginRight={5} />
                                <CustomText fontSize={14} color={colors.blue}>{truncateFileName(extractFileNameFromURL(file1), 22)}</CustomText>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {file2 && (
                    <TouchableOpacity onPress={() => handleFileDownload(file2)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CustomText fontSize={14} color={colors.black} fontWeight='bold'>Fichier 2</CustomText>
                            <TouchableOpacity onPress={() => handleFileDownload(file1)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <MaterialCommunityIcons name="file" size={16} color={colors.blue} marginRight={5} />
                                    <CustomText fontSize={14} color={colors.blue}>{truncateFileName(extractFileNameFromURL(file2), 22)}</CustomText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomText fontSize={14} color={colors.black} fontWeight='bold'>Médecin</CustomText>
                    <CustomText fontSize={14} color={colors.black}>{from}</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomText fontSize={14} color={colors.black} fontWeight='bold'>Patient</CustomText>
                    <CustomText fontSize={14} color={colors.black}>{to}</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomText fontSize={14} color={colors.black} fontWeight='bold'>Sujet</CustomText>
                    <CustomText fontSize={14} color={colors.black}>{subject}</CustomText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 4,
        marginTop: 20
    },
    compartment: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    firstCompartment: {
        backgroundColor: colors.blue,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    timeDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    date: {
        color: colors.white
    },
    divider: {
        height: 1,
        backgroundColor: colors.gray100,
    },
    doctor: {
        fontWeight: 'bold',
        marginTop: 10,
        color: colors.black,
    },
    appointmentType: {
        marginTop: 5,
    },
    compartmentContainer: {
        paddingLeft: 20,
        paddingBottom: 10
    },
    patientName: {
        fontWeight: 'bold',
        color: colors.black,
    },
    address: {
        marginBottom: 5
    },
    icon: {
        marginRight: 5,
    },
    circle: {
        flexDirection: 'row',
        width: 30,
        height: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleUser: {
        width: 65,
        height: 65,
    }
});

export default MessageDetails;
