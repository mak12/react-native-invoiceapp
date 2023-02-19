import {HP} from '@utilities/ResponsiveSize';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

interface LoaderProps {
  isLoading?: boolean;
  onRequestClose?: () => void;
}

const LoaderComp: React.FC<LoaderProps> = ({
  isLoading = false,
  onRequestClose,
}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}
      style={{zIndex: 1100}}
      onRequestClose={onRequestClose}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isLoading} color="black" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    height: HP(100),
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export const Loader = memo(LoaderComp, isEqual);
