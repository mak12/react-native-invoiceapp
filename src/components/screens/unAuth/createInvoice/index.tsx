import React, {memo, useEffect, useState} from 'react';
import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import {Image, Pressable, VStack} from 'native-base';
import {AppHeading} from '@common/appHeading';
import {APP_URLS} from '@utilities/constants';
import API from '@lib/API';
import {
  GetCreateInvoiceFormValidations,
  getExceptionPayload,
  GetRandomDescription,
  RandomNumberGenerator,
  showAlertDialog,
} from '@utilities/utils';
import {Formik} from 'formik';
import {AuthInput} from '@common/authInput';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useTranslation} from 'react-i18next';
import {AppButton} from '@common/appButton';
import {Loader} from '@common/loader';
import {ApiResponse, IInvoice} from '@models/APIModels';
import {AppTextArea} from '@common/appTextArea';
import {DashboardAction} from '@redux/reducer/DashboardSlice';
import {images} from '@assets/images';

type CreateInvoiceScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  APP_SCREEN.CREATE_INVOICE
>;
type CreateInvoiceScreenNavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  APP_SCREEN.CREATE_INVOICE
>;
interface ICreateInvoiceFormValues {
  reference: string;
  date: string;
  description: string;
  amount: string;
}
const initialValues: ICreateInvoiceFormValues = {
  reference: '',
  date: '',
  description: '',
  amount: '',
};
//hardcoded req data for create invoice, (some fields are dynamically changed)
let reqSample = {
  bankAccount: {
    bankId: '',
    sortCode: '09-01-01',
    accountNumber: '12345678',
    accountName: 'John Terry',
  },
  customer: {
    firstName: 'Nguyen',
    lastName: 'Dung 2',
    contact: {
      email: 'nguyendung2@101digital.io',
      mobileNumber: '+6597594971',
    },
    addresses: [
      {
        premise: 'CT11',
        countryCode: 'VN',
        postcode: '1000',
        county: 'hoangmai',
        city: 'hanoi',
      },
    ],
  },
  documents: [
    {
      documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
      documentName: 'Bill',
      documentUrl: 'http://url.com/#123',
    },
  ],
  invoiceReference: '',
  currency: 'GBP',
  invoiceDate: '2023-02-19',
  dueDate: '2023-06-04',
  description: 'Invoice is issued to Akila Jayasinghe',
  customFields: [
    {
      key: 'invoiceCustomField',
      value: 'value',
    },
  ],
  extensions: [
    {
      addDeduct: 'ADD',
      value: 10,
      type: 'PERCENTAGE',
      name: 'tax',
    },
    {
      addDeduct: 'DEDUCT',
      type: 'FIXED_VALUE',
      value: 10.0,
      name: 'discount',
    },
  ],
  items: [
    {
      itemReference: 'itemRef',
      description: 'Honda RC150',
      quantity: 1,
      rate: 1000,
      itemName: 'Honda Motor',
      itemUOM: 'KG',
      customFields: [
        {
          key: 'taxiationAndDiscounts_Name',
          value: 'VAT',
        },
      ],
      extensions: [
        {
          addDeduct: 'ADD',
          value: 10,
          type: 'FIXED_VALUE',
          name: 'tax',
        },
        {
          addDeduct: 'DEDUCT',
          value: 10,
          type: 'PERCENTAGE',
          name: 'tax',
        },
      ],
    },
  ],
};
const CreateInvoiceScreenComp: React.FC<CreateInvoiceScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation<CreateInvoiceScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {invoicesList} = useAppSelector(x => x.dashboard);
  const {t} = useTranslation();

  const CreateInvocieAction = async () => {
    setLoading(true);
    try {
      const response = await API.post<ApiResponse<IInvoice[]>>(
        `${APP_URLS.GET_INVOICES_LIST}`,
        {invoices: [reqSample]},
        {headers: {'Operation-Mode': 'SYNC'}},
      );
      const res = await response.data.data;
      dispatch(DashboardAction.onUpdateInvoiceList(res.concat(invoicesList)));
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      showAlertDialog(getExceptionPayload(error).message);
    }
  };
  useEffect(() => {
    reqSample.items[0].itemReference = `#${RandomNumberGenerator(4)}`;
    reqSample.items[0].description = `${GetRandomDescription(
      Math.floor(Math.random() * 8),
    )}`;
    reqSample.items[0].quantity = parseInt(RandomNumberGenerator(1));
    reqSample.items[0].rate = parseInt(RandomNumberGenerator(3));
  }, []);
  return (
    <VStack backgroundColor={'white'} flex={1} safeArea>
      <VStack flex={1} marginX={'4'}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            p={'2'}
            my={'5'}
            alt={`backArrow`}
            source={images.icLeftArrow}
          />
        </Pressable>
        <AppHeading mb={'1'}>{t('createInvoicesScreen:title')}</AppHeading>
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          validateOnMount={false}
          validationSchema={GetCreateInvoiceFormValidations()}
          onSubmit={(values, {resetForm}) => {
            const {reference, amount, description, date} = values;
            reqSample.invoiceReference = `#${reference}`;
            reqSample.description = `${description}`;
            reqSample.invoiceDate = `${date}`;
            CreateInvocieAction();
          }}>
          {({errors, handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <AuthInput
                heading={t('createInvoicesScreen:referenceFieldHeading')}
                onChangeText={handleChange('reference')}
                onBlur={handleBlur('reference')}
                value={values.reference}
                fontSize="md"
                type="text"
                containerProps={{
                  mt: 3,
                }}
                numberOfLines={1}
                error={errors.reference}
              />
              <AuthInput
                heading={t('createInvoicesScreen:dateFieldHeading')}
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                value={values.date}
                fontSize="md"
                keyboardType="numbers-and-punctuation"
                returnKeyType="done"
                type="text"
                placeholder={t('createInvoicesScreen:dateFieldPlaceholder')}
                containerProps={{
                  mt: 3,
                }}
                numberOfLines={1}
                error={errors.date}
              />
              <AuthInput
                heading={t('createInvoicesScreen:amountFieldHeading')}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
                fontSize="md"
                returnKeyType="done"
                keyboardType="number-pad"
                type="text"
                containerProps={{
                  mt: 3,
                }}
                numberOfLines={1}
                error={errors.amount}
              />

              <AppTextArea
                heading={t('createInvoicesScreen:descriptionFieldHeading')}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                fontSize="md"
                returnKeyType="done"
                type="text"
                containerProps={{
                  mt: 3,
                }}
                h={130}
                totalLines={5}
                borderColor={errors.description ? 'red.400' : 'primary.700'}
              />

              <AppButton
                mt={5}
                onPress={() => {
                  handleSubmit();
                }}>
                {t('createInvoicesScreen:title')}
              </AppButton>
            </>
          )}
        </Formik>
      </VStack>
      <Loader isLoading={loading} />
    </VStack>
  );
};

export const CreateInvoiceScreen = memo(CreateInvoiceScreenComp, isEqual);
