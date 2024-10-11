import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Image, ScrollView, View, RefreshControl } from 'react-native';
import ContainerScreen from '../../components/wrappers/ContainerScreen';
import Item from '../../components/Notifications/Item';
import { listNotificationsRequest } from '../../redux/notification/actions';
import CustomText from '../../components/global/CustomText';
import { colors } from '../../components/global/colors';

const Notifications = ({ list, isLoading, listNotificationsRequest, page, maxpage }) => {
  const [storedNotifications, setStoredNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    listNotificationsRequest(); 
  }, []);

  useEffect(() => {
    console.log("notification::::", list)
    if (list.length > 0) {
      setStoredNotifications(list); 
    }
  }, [list]);

  const onRefresh = () => {
   
    setRefreshing(true);
    listNotificationsRequest(1);
    setRefreshing(false);
  };

  const loadMoreNotifications = () => {
    if (page < maxpage && !isLoading) {
      listNotificationsRequest(page + 1); 
    }
  };

 
  const displayNotifications = list.length > 0 ? list : storedNotifications;

  return (
    <ContainerScreen isLoading={currentPage === 1 && isLoading}>
      {displayNotifications.length === 0 ? (
        <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/images/favicon.jpg')} style={{ width: 25, height: 25, borderRadius: 5 }} />
          <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
        </View>
      ) : (
        <View style={{ marginVertical: 2 }}>
          <ScrollView
            style={{ marginVertical: 3 }}
            onScroll={({ nativeEvent }) => {
              if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height) {
                loadMoreNotifications();
              }
            }}
            scrollEventThrottle={400}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {displayNotifications.map((item, index) => (
              <Item
                key={index.toString()}
                date={item.date}
                username={item.nom}
                message={item.message}
                nameIcon={item.nature}
              />
            ))}
            {currentPage < maxpage && <ActivityIndicator size='large' color={colors.blue} />}
          </ScrollView>
        </View>
      )}
    </ContainerScreen>
  );
};

const mapStateToProps = (state) => ({
  list: state.NotificationReducer.list,
  isLoading: state.NotificationReducer.isLoading,
  page: state.NotificationReducer.page,
  maxpage: state.NotificationReducer.maxpage,
});

const mapDispatchToProps = {
  listNotificationsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);