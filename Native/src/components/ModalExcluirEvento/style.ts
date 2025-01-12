import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: 340,
    maxHeight: 500,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  msgExcluir: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  ContainerBotao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  AdicionarButton: {
    backgroundColor: '#4eaeae',
    padding: 12,
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
  },
  CancelarButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
  },
});

export default styles;