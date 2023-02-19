import {Heading} from 'native-base';
import {IterfaceHeadingProps} from 'native-base/lib/typescript/components/primitives/Heading/types';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

const AppHeadingComp: React.FC<IterfaceHeadingProps> = props => {
  return <Heading size={'lg'} {...props} />;
};

export const AppHeading = memo(AppHeadingComp, isEqual);
