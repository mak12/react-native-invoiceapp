import {Button} from 'native-base';
import {InterfaceButtonProps} from 'native-base/lib/typescript/components/primitives/Button/types';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface AppButtonProps extends InterfaceButtonProps {}

const AppButtonComp: React.FC<AppButtonProps> = props => {
  const {...rest} = props;
  return (
    <Button
      _text={{
        fontWeight: '700',
        fontSize: 'md',
      }}
      rounded={'xl'}
      h={'12'}
      {...rest}
    />
  );
};

export const AppButton = memo(AppButtonComp, isEqual);
