import React from 'react'
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Search/Header';
import SearchForm from '../../components/Search/SearchForm';
import { colors } from '../../components/global/colors';

const Search = () => {
    return (
        <ContainerScreen>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.card}>
                    <Header isHome = {false} />
                </View>
                <View style={styles.cardForm}>
                    <SearchForm 
                        borderWidth={0.5} 
                        borderRadius={6} 
                        borderColor={colors.gray} 
                    />
                </View>
            </ScrollView>
        </ContainerScreen>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 25,
    },
    cardForm: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 10,
        padding: 20

    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 70,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
    },
});

export default Search
