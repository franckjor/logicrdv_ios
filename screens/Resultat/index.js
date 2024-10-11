import React, { useEffect, useState } from 'react';
import { View, Text,ActivityIndicator, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native';
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import CustomText from '../../components/global/CustomText';
import Doctor from '../../components/global/Doctor';
import { colors } from '../../components/global/colors';
import { useRoute } from '@react-navigation/native';
import { useDispatch, connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resultRequest } from '../../redux/search/actions';

const SearchResult = ({ route, isLoading, results, page, maxpage, isPaginating }) => {
  const { location, profession, item, isSearchAround, ville_id } = route.params;
  const proxy_ville = isSearchAround ? `${item.zip} ${item.city}` : location;
  const proxy_nom = isSearchAround ? item.category : profession;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: 'CLEAR_RESULTS' });
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   if (page === 1) {
  //     dispatch(resultRequest({
  //       proxy_ville: proxy_ville,
  //       proxy_nom: proxy_nom,
  //       proxy_ville_id: "",
  //       proxy_nom_id: ville_id,
  //       proxy_search: '',
  //       proxy_page: page,
  //     }));
  //   }
  // }, [dispatch, proxy_ville, proxy_nom, ville_id, page]);


  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resultRequest({
      proxy_ville: proxy_ville,
      proxy_nom: proxy_nom,
      proxy_ville_id: "",
      proxy_nom_id: ville_id,
      proxy_search: '',
      proxy_page: 1,
    }));

    setRefreshing(false)
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const handleScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && !isLoading && !isPaginating && page < maxpage) {
      dispatch(resultRequest({
        proxy_ville: proxy_ville,
        proxy_nom: proxy_nom,
        proxy_ville_id: "",
        proxy_nom_id: ville_id,
        proxy_search: '',
        proxy_page: parseInt(page) + 1,
      }));
    }
  };
  
  const handleDoctorPress = (result) => {
    navigation.navigate('Détail du médécin', { result });
  };

  const renderFooter = () => {
    if (!isPaginating) return null;
    return (
      <View style={styles.pagination}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  };

  const renderContent = () => {
    return isSearchAround ? (
      <ScrollView 
        style={{ marginBottom: 15 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.blue]}
            progressBackgroundColor={colors.white}
          />
      }>
        {results.map((result, index) => (
          <Doctor
            key={index}
            lat={result.lat}
            lng={result.lng}
            texte1={`${result.civility} ${result.nom}`}
            texte2={result.category}
            texte3={result.address}
            texte4={`${result.zip} ${result.city}`}
            texte5={result.tel}
            texte6={result.km_diff && (`à ${result.km_diff} km`)}
            colorTitle={colors.yellow}
            colorContain={colors.blue}
            handleChange={() => handleDoctorPress(result)}
            fontWeight={'bold'}
            isPhoneIcons
            isProfileIcon
            isRightIcons
            isSearch
          />
        ))}
        {renderFooter()}
      </ScrollView>
    ) : (
      <ScrollView 
        style={{ marginBottom: 15 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.blue]}
            progressBackgroundColor={colors.white}
          />
        }>
        {results.map((result, index) => (
          result.nom !== "Affiner ma recherche ..." && (
            <Doctor
              key={index}
              isProfileIcon={true}
              isSearch={true}
              isRightIcons={true}
              isPhoneIcons={true}
              lat={result.lat}
              lng={result.lng}
              texte1={`${result.civility} ${result.nom}`}
              texte2={result.category}
              texte3={`${result.zip} ${result.city}`}
              texte4={result.address}
              texte5={result.tel}
              colorContain={colors.blue}
              colorTitle={colors.yellow}
              handleChange={() => handleDoctorPress(result)}
            />
          )
        ))}
        {renderFooter()}
      </ScrollView>
    )
  }

  return (
    <ContainerScreen isLoading={isLoading}>
      <View style={styles.header}>
        <CustomText fontSize={14} color={colors.gray200}>Résultat de la recherche pour:</CustomText>
        <CustomText fontSize={14} color={colors.black} fontWeight="bold">{isSearchAround ? `${item.city} ${item.nom}` : proxy_ville}, {proxy_nom} </CustomText>
      </View>
      {results.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image source={require('../../assets/images/favicon.jpg')} style={styles.image} />
          <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
        </View>
      ) : (
        renderContent()
      )}
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: -10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  noDataContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 5
  },
  pagination: {
    paddingVertical: 20,
  }
});

const mapStateToProps = ({ SearchReducer }) => ({
  isLoading: SearchReducer?.isLoading,
  results: SearchReducer?.results,
  page: SearchReducer.page,
  maxpage: SearchReducer.maxpage,
  isPaginating: SearchReducer.isPaginating,

});

export default connect(mapStateToProps)(SearchResult);