import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { setModalVisible } from '../../redux/app/actions';
import { colors } from './colors';
import { useDispatch, connect } from 'react-redux';
const CustomModal = ({ isVisible, message }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalVisible(false, ''));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Information</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: 300,
    // Fixing height is optional, content will expand the modal vertically
    // height: 200,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.black,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: colors.black,
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = ({ AppReducer }) => ({
  isVisible: AppReducer.modalVisible,
  message: AppReducer.modalMessage,
});

export default connect(mapStateToProps)(CustomModal);
