import { StyleSheet } from 'react-native';

 const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  TitlePrincipal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputs: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },


  formContainer: {
    width: '100%',
  },

  addButton:{
    height: 50,
    backgroundColor: '#4eaeae',
    width: "40%",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButton:{
    height: 50,
    backgroundColor: '#e0e0e0',
    width: "40%",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalMessage: {
    fontSize: 20, 
    color: '#000', 
    textAlign: 'center', 
    marginRight: 10,
    marginTop: -32
  },

  ButtonText:{
    fontSize: 16,
    padding: 10,
  }

});

export default styles;