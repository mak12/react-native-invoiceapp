import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {APP_SCREEN, HomeStackParamList} from '@utilities/types';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import isEqual from 'react-fast-compare';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {
  Box,
  Center,
  Fab,
  FlatList,
  HStack,
  Select,
  Text,
  VStack,
} from 'native-base';
import {AppButton} from '@common/appButton';
import {Loader} from '@common/loader';
import {IInvoice} from '@models/APIModels';
import {InvoiceListItem} from './InvoiceListItem';
import {InteractionManager, RefreshControl, TextInput} from 'react-native';
import {getInvoicesList} from '@redux/reducer/DashboardSlice';
import {ORDER_SORT_DATA, ORDER_STATUS_FILTER_DATA} from '@utilities/constants';
import {AppSelect} from '@common/appSelect';
import {WP} from '@utilities/ResponsiveSize';
import {useTranslation} from 'react-i18next';
import {AppInput} from '@common/appInput';
import SvgWavingHand from '@assets/images/source/svg_WavingHand.svg';
import {AppHeading} from '@common/appHeading';
import {AtuhActions} from '@redux/reducer/AuthSlice';

type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
type IQueryParams = {
  keyword: string;
  pageNum: string;
  status: string;
  ordering: string;
};
const RenderOrderSortData = () => {
  return ORDER_SORT_DATA.map((item, index) => {
    return (
      <Select.Item
        key={`${index}`}
        label={`${item.label}`}
        value={`${item.value}`}
      />
    );
  });
};
const RenderStatusFilterData = () => {
  return ORDER_STATUS_FILTER_DATA.map((item, index) => {
    return (
      <Select.Item
        key={`${index}`}
        label={`${item.label}`}
        value={`${item.value}`}
      />
    );
  });
};
const RenderWelcomeHeader = ({
  welcomeMsg,
  firstName,
}: {
  welcomeMsg: string;
  firstName: string;
}) => {
  return (
    <AppHeading size={'md'} color={'gray.600'}>
      {welcomeMsg}, <AppHeading size={'lg'}>{firstName}! </AppHeading>
    </AppHeading>
  );
};
const HomeScreenComp: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const dispatch = useAppDispatch();
  const {profileData} = useAppSelector(x => x.auth);
  const {invoicesList, loading} = useAppSelector(x => x.dashboard);
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    keyword: '',
    pageNum: '',
    status: '',
    ordering: '',
  });
  const searchInputRef = useRef<TextInput | null>(null);
  const {t} = useTranslation();
  const FetchInvoices = (params: IQueryParams) => {
    let reqData = new URLSearchParams(params).toString();
    dispatch(getInvoicesList(reqData));
  };
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      FetchInvoices(queryParams);
    });
  }, []);

  /**
   * we could use this also to fetch data after new invoice is added
   * or we can have useEffect with navigation params
   */
  // useFocusEffect(
  //   React.useCallback(() => {
  //   }, [dispatch])
  // );
  //to have scroll to refresh option in flatlist
  const onRefresh = useCallback(() => {
    FetchInvoices(queryParams);
  }, [queryParams]);

  const onSelectStatus = useCallback(
    (value: string) => {
      let quer = {...queryParams};
      quer.status = value;
      setQueryParams(quer);
      FetchInvoices(quer);
    },
    [queryParams],
  );
  const onSelectOder = useCallback(
    (value: string) => {
      let quer = {...queryParams};
      quer.ordering = value;
      setQueryParams(quer);
      FetchInvoices(quer);
    },
    [queryParams],
  );
  return (
    <VStack flex={1} safeArea bgColor={'white'}>
      <HStack
        mt={5}
        mx={3}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <HStack alignItems={'center'}>
          {profileData.firstName && (
            <RenderWelcomeHeader
              welcomeMsg={t('common:hi_')}
              firstName={profileData.firstName}
            />
          )}
          <SvgWavingHand width={WP(10)} height={WP(10)} />
        </HStack>
        <Text
          fontSize={'md'}
          underline
          color={'primary.700'}
          onPress={() => dispatch(AtuhActions.onLogout())}>
          {t('common:logout')}
        </Text>
      </HStack>
      <HStack mx={3}>
        <AppInput
          ref={searchInputRef}
          heading=""
          type={'text'}
          containerProps={{
            flex: 1,
          }}
          returnKeyType="done"
          // onSubmitEditing={e => {
          //   let quer = {...queryParams};
          //   quer.keyword = e.nativeEvent.text;
          //   setQueryParams(quer);
          //   FetchInvoices(quer);
          // }}
          onChangeText={text => {
            let quer = {...queryParams};
            quer.keyword = text;
            setQueryParams(quer);
          }}
          onEndEditing={e => {}}
          InputRightElement={
            <AppButton
              size="xs"
              rounded="none"
              w="1/4"
              h="full"
              onPress={() => {
                FetchInvoices(queryParams);
              }}>
              Search
            </AppButton>
          }
          placeholder="Enter invoice number"
        />
      </HStack>
      <HStack
        mx={3}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={3}>
        <AppSelect
          containerProps={{
            mt: '2',
            maxW: WP(45),
          }}
          minW={WP(45)}
          heading={t('dashboardScreen:statusSelectorPlaceholder')}
          selectedValue={queryParams.status}
          onValueChange={onSelectStatus}
          placeholder={t('dashboardScreen:orderStatusSelectorPlaceholder')}>
          {RenderStatusFilterData()}
        </AppSelect>
        <AppSelect
          containerProps={{
            mt: '2',
            maxW: WP(45),
          }}
          minW={WP(45)}
          heading={t('dashboardScreen:sortSelectorPlaceholder')}
          selectedValue={queryParams.ordering}
          onValueChange={onSelectOder}
          placeholder={t('dashboardScreen:orderSrotSelectorPlaceholder')}>
          {RenderOrderSortData()}
        </AppSelect>
      </HStack>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        data={invoicesList ?? []}
        ListEmptyComponent={() => (
          <Box>
            <Center>
              <Text>No invoices found</Text>
            </Center>
          </Box>
        )}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}: {item: IInvoice; index: number}) => (
          <InvoiceListItem
            index={index}
            item={item}
            key={`invoiceListItem${index}`}
          />
        )}
      />
      <Fab
        renderInPortal={false}
        label={t('common:addInvoice')}
        shadow={2}
        placement="bottom-right"
        mb={'10'}
        onPress={() => {
          navigation.navigate(APP_SCREEN.CREATE_INVOICE);
        }}
      />
      <Loader isLoading={loading} />
    </VStack>
  );
};

export const HomeScreen = memo(HomeScreenComp, isEqual);
