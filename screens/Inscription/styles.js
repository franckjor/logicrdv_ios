import { StyleSheet } from 'react-native';
import { colors } from '../../components/global/colors';

export const registerStyles = StyleSheet.create({
    card: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        borderColor: colors.gray100,
        marginTop: 20,
        padding: 15,
        gap: 10
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray100,
        padding: 10,
        color: colors.black,
        fontSize: 12,
        borderRadius: 10,
        textAlignVertical: 'center',
        marginTop: 16,
        height: 50,
    },
    dropdownContainer: {
        borderColor: colors.gray100,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 16,
        height: 50,
        fontSize: 12,
    },
    dropdown: {
        color: colors.black,
        fontSize: 12,
    },
    searchIcon: {
        left: 10,
        top: '10%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    icon: {
        position: 'absolute',
        marginRight: 10,
        right: 10,
        top: '10%',
        transform: [{ translateY: -35 }]
    },
    iconLeft: {
        position: 'absolute',
        marginRight: 10,
        left: 5,
        top: '60%',
        transform: [{ translateY: -10 }]
    }
});
