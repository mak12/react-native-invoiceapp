import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import storeConfig from './src/redux/store';
import AppNavigator from './src/navigation/index';
import I18n from './src/utilities/i18n/i18n';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NATIVE_BASE_CONFIG} from '@utilities/constants';

const theme = extendTheme(NATIVE_BASE_CONFIG);

const App = () => {
  const {store, persistor} = storeConfig();
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <I18nextProvider i18n={I18n}>
          <NativeBaseProvider theme={theme}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <AppNavigator />
          </NativeBaseProvider>
        </I18nextProvider>
      </Provider>
    </PersistGate>
  );
};

export default App;
