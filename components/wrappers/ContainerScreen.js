import React from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Header from '../Header/Header';
import { colors } from '../global/colors';
const ContainerScreen = ({ children, backgroundColor,isLoading }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header backgroundColor={backgroundColor} />
            <View style={styles.container}>
                {isLoading ? (
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color={colors.blue} />
                    </View>
                ) : (
                     children 
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f5f7',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default ContainerScreen;
