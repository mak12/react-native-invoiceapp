import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {APP_SCREEN, AuthStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import isEqual from 'react-fast-compare';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@hooks/redux';

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  APP_SCREEN.LOGIN
>;
type LoginScreenNavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  APP_SCREEN.LOGIN
>;

const LoginScreenComp: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <Text>Login screen</Text>
    </View>
  );
};

export const LoginScreen = memo(LoginScreenComp, isEqual);
