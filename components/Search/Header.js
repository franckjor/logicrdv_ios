import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'
import CustomText from '../global/CustomText'


const Header = ({
    isHome = false
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.containeImage}>
                <Image source={require('../../assets/images/Logo.png')} style={styles.image} />
            </View>
            {isHome ? (
                <>
                    <CustomText fontSize={20} fontWeight='bold' color={colors.gray300} style={{ textAlign: 'center', marginTop: -20 }}>
                        Rechercher votre praticien
                    </CustomText>
                    <CustomText fontSize={16} color={colors.gray300} style={{ textAlign: 'center', marginVertical: 14 }}>
                        Trouvez des praticien pret de chez vous et contactez-les en un instant
                    </CustomText></>
            ) : (
                <>
                    <CustomText fontSize={14} color={colors.gray300} style={{ textAlign: 'center', marginVertical: 14 }}>
                        Recherche d'un praticien, établissement à proximité de chez vous
                    </CustomText></>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    containeImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        objectFit: 'contain',
        width: 130,
        height: 140
    }
});

export default Header
