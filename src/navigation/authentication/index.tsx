import React, {FC, memo} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {LoginScreen} from '@components/screens/auth/login';
import {APP_SCREEN, AuthStackParamList} from '@utilities/types';
import isEqual from 'react-fast-compare';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthenticationTab: FC = () => {
  const options: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: true}}
        initialRouteName={APP_SCREEN.LOGIN}>
        <Stack.Screen
          name={APP_SCREEN.LOGIN}
          component={LoginScreen}
          options={options}
        />
      </Stack.Navigator>
    </View>
  );
};

export const Authentication = memo(AuthenticationTab, isEqual);
