import React, {memo} from 'react';
import {APP_SCREEN, AuthStackParamList} from '@utilities/types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {authLogin} from '@redux/reducer/AuthSlice';
import isEqual from 'react-fast-compare';
import {Box, VStack, Text} from 'native-base';
import {Formik} from 'formik';
import {Loader} from '@common/loader';
import {AuthInput} from '@common/authInput';
import {useTranslation} from 'react-i18next';
import {GetLoginFormValidations} from '@utilities/utils';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {AppButton} from '@common/appButton';
import {AppHeading} from '@common/appHeading';

type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  APP_SCREEN.LOGIN
>;
type LoginScreenNavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  APP_SCREEN.LOGIN
>;
interface LoginFormValues {
  email: string;
  password: string;
}
const initialValues: LoginFormValues = {
  email: 'dung+octopus4@101digital.io',
  password: 'Abc@123456',
};

const LoginScreenComp: React.FC<LoginScreenProps> = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {loading} = useAppSelector(x => x.auth);

  return (
    <Box bgColor={'white'} flex={1} safeAreaBottom={true}>
      <Formik
        initialValues={initialValues}
        validationSchema={GetLoginFormValidations()}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={(values, {validateForm}) => {
          dispatch(
            authLogin({
              userName: values.email,
              password: values.password,
            }),
          );
        }}>
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          validateForm,
        }) => (
          <>
            <VStack flex={1} marginX={'10'} justifyContent="center">
              <AppHeading alignSelf={'center'} mb={10}>
                {t('app:name')}
              </AppHeading>
              <AuthInput
                heading={t('loginScreen:emailPlaceholder')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                fontSize="md"
                autoCapitalize={'none'}
                textTransform="none"
                autoCorrect={false}
                keyboardType="email-address"
                error={errors.email}
              />
              <AuthInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                fontSize="md"
                returnKeyType="done"
                type={'password'}
                heading={t('loginScreen:passwordPlaceholder')}
                containerProps={{
                  mt: '8',
                }}
                error={errors.password}
              />
              <Text onPress={() => {}} mt={'4'} color={'primary.700'}>
                {t('common:forgot_password')}
              </Text>

              <AppButton mt={'8'} onPress={() => handleSubmit()}>
                {t('common:login')}
              </AppButton>
            </VStack>
          </>
        )}
      </Formik>
      <Loader isLoading={loading} />
    </Box>
  );
};

export const LoginScreen = memo(LoginScreenComp, isEqual);
