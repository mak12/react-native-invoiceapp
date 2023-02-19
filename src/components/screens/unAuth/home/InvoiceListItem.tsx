import {IInvoice} from '@models/APIModels';
import {StyleSheet, ViewStyle} from 'react-native';
import {Box, HStack, Pressable, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {colors} from '@themes/colors';
import {ColorType} from 'native-base/lib/typescript/components/types';

interface IStyles {
  listContainer: ViewStyle;
}

interface InvoiceListItemProps {
  item: IInvoice;
  index: number;
  onPress?: (index: number) => void;
}
const RenderDetailItem = ({
  title,
  description,
  textColor,
}: {
  title: string;
  description: string;
  textColor?: ColorType;
}) => {
  return (
    <HStack flex={1} justifyContent={'space-between'} alignItems={'center'}>
      <Text fontSize={'md'} numberOfLines={1} color="coolGray.600">
        {title}
      </Text>
      <Text
        flex={1}
        textAlign={'right'}
        fontSize={'md'}
        numberOfLines={1}
        bold
        color={textColor}
        ellipsizeMode={'tail'}>
        {description}
      </Text>
    </HStack>
  );
};
const InvoiceListItemComp: React.FC<InvoiceListItemProps> = ({
  item,
  index,
  onPress,
}) => {
  const {
    invoiceNumber,
    description,
    currencySymbol,
    totalAmount = 0,
    totalPaid = 0,
    balanceAmount = 0,
    invoiceDate = '',
    dueDate,
    customer,
  } = item;
  return (
    <Pressable
      onPress={() => onPress && onPress(index)}
      style={styles.listContainer}
      mb={3}
      mx={'4'}
      px={'2'}
      rounded="8"
      py={2}>
      <VStack borderBottomWidth="0" px={2}>
        <Text fontSize={'lg'} numberOfLines={1} bold>
          {invoiceNumber}
        </Text>
        <Text numberOfLines={2} color="coolGray.600">
          {description}
        </Text>
        <VStack mt={3}>
          <RenderDetailItem
            title="Invoice Date:"
            description={`${invoiceDate}`}
            textColor="black"
          />
          <RenderDetailItem
            title="Due Date:"
            description={`${dueDate}`}
            textColor="red.500"
          />
          <RenderDetailItem
            title="Total Amount:"
            description={`${totalAmount} ${currencySymbol}`}
            textColor="black"
          />
          <RenderDetailItem
            title="total Paid:"
            description={`${totalPaid} ${currencySymbol}`}
            textColor="red.500"
          />
          <RenderDetailItem
            title="Balance Amount:"
            description={`${balanceAmount} ${currencySymbol}`}
            textColor="green.600"
          />
        </VStack>
        <Text fontSize={'md'} mt={2} bold>
          Customer Information
        </Text>
        {customer && (
          <RenderDetailItem title="Name:" description={`${customer.name}`} />
        )}
      </VStack>
    </Pressable>
  );
};

const styles = StyleSheet.create<IStyles>({
  listContainer: {
    elevation: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
});
export const InvoiceListItem = memo(InvoiceListItemComp, isEqual);
