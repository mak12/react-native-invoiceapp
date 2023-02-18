import React, {FC, memo} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {HomeScreen} from '@screens/unAuth/home';
import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import isEqual from 'react-fast-compare';

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
      </Stack.Navigator>
    </View>
  );
};

export const UnAuthentication = memo(UnAuthenticationTab, isEqual);
