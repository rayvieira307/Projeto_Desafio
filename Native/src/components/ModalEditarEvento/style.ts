import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: '60%',
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

  titleModal: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  FormularioC: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 20,
  },

  inputs: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  label: {
    marginLeft: -215,
    fontSize: 16,
    fontWeight: '600',  
    color: '#333',    
  },

  labell: {
    marginLeft: -170,
    fontSize: 16,
    fontWeight: '600',  
    color: '#333',    
  },

  BotaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },

  AdicionarButton: {
    width: 100,
    backgroundColor: '#4eaeae',
    color: 'rgb(0, 0, 0)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    fontSize: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  CancelarButton: {
    backgroundColor: '#e0e0e0',
    color: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    fontSize: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText:{
    
  }
});

export default styles;