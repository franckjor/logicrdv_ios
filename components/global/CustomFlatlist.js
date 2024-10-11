import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, RefreshControl, View, Image } from 'react-native';
import { colors } from './colors';
import CustomText from './CustomText';
const CustomFlatlist = ({
    fetchData,
    renderItem,
    keyExtractor,
    ItemSeparatorComponent,
    isLoading,
    data
}) => {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [maxPage, setMaxPage] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        fetchData(offset)
            .then((responseJson) => {
                const { list, pagination } = responseJson;
                setMaxPage(pagination?.maxpage);
                setOffset(offset + 1);
                setDataSource([...dataSource, ...list]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderFooter = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color={colors.blue} />;
        } else {
            return null;
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setOffset(1);

        fetchData(1)
            .then((responseJson) => {
                const { list } = responseJson;
                setDataSource(list);
                setRefreshing(false);
            })
            .catch((error) => {
                console.error(error);
                setRefreshing(false);
            });
    };

    const handleLoadMore = () => {
        if (!loading && maxPage && offset <= maxPage) {
            getData();
        }
    };

    return (
        <>
            {
                dataSource.length > 0 ? 
                <FlatList
                    data={dataSource}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.blue]}
                            tintColor={colors.blue}
                            title={'Pull to Refresh'}
                            titleColor={colors.blue}
                            progressBackgroundColor={'#ffffff'}
                        />
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/images/favicon.jpg')} style={{ width: 25, height: 25, borderRadius: 5 }} />
                        <CustomText color={colors.blue}>Aucune donnée disponible</CustomText>
                    </View>
            }
        </>
    );
};

export default CustomFlatlist;
