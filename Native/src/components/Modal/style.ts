import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: -15,
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    marginTop: -10,
    fontSize: 40,
    color: 'black',
  },
  modalBody: {
    marginTop: 20,
  },
});

export default styles;