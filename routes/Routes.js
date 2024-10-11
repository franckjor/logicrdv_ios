import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';
import AuthenticatedNavigator from './AuthenticateNavigator';
import UnAuthenticatedNavigator from './UnAuthenticateNavigator';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const screenOptions = { drawerPosition: 'right', headerShown: false };

const Routes = () => {
  const isAuth = useSelector(state => state.AuthReducer.isLoggedIn); 

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} isAuth={isAuth} />}
        screenOptions={screenOptions}>
        {isAuth ? (
          <Drawer.Screen
            name="AuthenticatedNavigator"
            component={AuthenticatedNavigator}
          />
        ) : (
          <Drawer.Screen
            name="UnAuthenticatedNavigator"
            component={UnAuthenticatedNavigator}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
