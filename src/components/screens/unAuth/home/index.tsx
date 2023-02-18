import React, {memo} from 'react';
import {View} from 'react-native';

import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import isEqual from 'react-fast-compare';
import {useAppDispatch} from '@hooks/redux';

type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
const HomeScreenComp: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const dispatch = useAppDispatch();
  return <View></View>;
};

export const HomeScreen = memo(HomeScreenComp, isEqual);
