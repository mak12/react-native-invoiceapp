import React, {FC, memo} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {HomeScreen} from '@screens/unAuth/home';
import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import isEqual from 'react-fast-compare';
import {CreateInvoiceScreen} from '@components/screens/unAuth/createInvoice';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const UnAuthenticationTab: FC = () => {
  const options: NativeStackNavigationOptions = {
    headerShown: false,
  };
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: true}}
        initialRouteName={APP_SCREEN.HOME}>
        <Stack.Screen
          name={APP_SCREEN.HOME}
          component={HomeScreen}
          options={options}
        />
        <Stack.Screen
          name={APP_SCREEN.CREATE_INVOICE}
          component={CreateInvoiceScreen}
          options={options}
        />
      </Stack.Navigator>
    </View>
  );
};

export const UnAuthentication = memo(UnAuthenticationTab, isEqual);
