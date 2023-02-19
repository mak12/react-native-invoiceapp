import {ChevronDownIcon, Select, Text, VStack} from 'native-base';
import {InterfaceSelectProps} from 'native-base/lib/typescript/components/primitives/Select/types';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

interface AppSelectProps extends InterfaceSelectProps {
  heading: string | undefined;
  containerProps?: InterfaceVStackProps;
  error?: string | undefined;
  headingTextProps?: InterfaceTextProps;
}

const AppSelectComp: React.FC<AppSelectProps> = props => {
  const {heading, containerProps, headingTextProps, children, error, ...rest} =
    props;
  return (
    <VStack {...containerProps}>
      <Text fontSize={'md'} {...headingTextProps}>
        {heading}
      </Text>
      <Select
        mt={'1'}
        mx={{
          base: 0,
          md: 'auto',
        }}
        borderColor={error ? 'red.400' : null}
        fontSize={'md'}
        dropdownIcon={<ChevronDownIcon mr={'3'} size={4} />}
        _selectedItem={{
          bg: 'primary.400',
          tintColor: 'white',
        }}
        {...rest}>
        {children}
      </Select>
    </VStack>
  );
};

export const AppSelect = memo(AppSelectComp, isEqual);
