import {AppInput, AppInputProps} from '@common/appInput';
import {HStack, Text, VStack, WarningOutlineIcon} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface AuthInputProps extends AppInputProps {
  error: string | undefined;
  containerProps?: InterfaceVStackProps;
}

const AuthInputComp: React.FC<AuthInputProps> = props => {
  const {error, containerProps, ...rest} = props;
  return (
    <VStack {...containerProps}>
      <AppInput {...rest} borderColor={error ? 'red.500' : null} />
      {error ? (
        <HStack alignItems={'center'}>
          <WarningOutlineIcon color={'red.400'} size="xs" />
          <Text ml={'1'} mb={'0'} fontSize="sm" color={'red.400'}>
            {error}
          </Text>
        </HStack>
      ) : null}
    </VStack>
  );
};

export const AuthInput = memo(AuthInputComp, isEqual);
