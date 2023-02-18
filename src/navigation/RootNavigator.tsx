import React, {memo} from 'react';
import {Authentication} from '@navigation/authentication';
import {UnAuthentication} from './unAuthentication';

export const RootNavigation = memo(({isLoggedIn}: {isLoggedIn: boolean}) => {
  return isLoggedIn ? <UnAuthentication /> : <Authentication />;
});
