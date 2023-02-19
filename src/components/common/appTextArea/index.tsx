import {Text, TextArea, VStack, ITextAreaProps} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {TextInput} from 'react-native';

export interface AppTextAreaProps extends ITextAreaProps {
  heading: string | undefined;
  containerProps?: InterfaceVStackProps;
}

const AppTextAreaComp = React.forwardRef<TextInput, AppTextAreaProps>(
  (props, ref) => {
    const {heading, containerProps, ...rest} = props;
    return (
      <VStack {...containerProps}>
        <Text fontSize={'md'}>{heading}</Text>
        <TextArea
          mt={'1'}
          fontSize={'md'}
          autoCompleteType={false}
          totalLines={4}
          mb={3}
          {...rest}
        />
      </VStack>
    );
  },
);

export const AppTextArea = memo(AppTextAreaComp, isEqual);
