import {Input, Text, VStack} from 'native-base';
import {InterfaceInputProps} from 'native-base/lib/typescript/components/primitives/Input/types';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {TextInput} from 'react-native';

export interface AppInputProps extends InterfaceInputProps {
  heading: string | undefined;
  containerProps?: InterfaceVStackProps;
}

const AppInputComp = React.forwardRef<TextInput, AppInputProps>(
  (props, ref) => {
    const {heading, containerProps, ...rest} = props;
    return (
      <VStack {...containerProps}>
        <Text fontSize={'md'}>{heading}</Text>
        <Input
          ref={ref!!}
          mt={'1'}
          fontSize="md"
          variant={'outline'}
          {...rest}
        />
      </VStack>
    );
  },
);

export const AppInput = memo(AppInputComp, isEqual);
