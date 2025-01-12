import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f4f4f9',
      },

      title: {
        marginTop: 60,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginVertical: 20,
        padding: 10,
        letterSpacing: 1,
      },

      nomeAdmin:{
           color: "#007BFF"
      },

      eventosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        marginTop: 30,
      },
      eventCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        width: 230,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5, 
      },
      eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        resizeMode: 'cover',
      },
      eventName: {
        textAlign: "center",
        fontSize: 19,
        color: '#007BFF',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
      },

      eventDate: {
        textAlign: "center",
        fontSize: 15,
        color: '#000',
        marginTop: 8,
        marginBottom: 8,
      },

      eventLocation: {
        textAlign: "center",
        fontSize: 15,
      },

      msg: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
      },

      icons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        marginTop: 20,
      },
      
      Icones: {
        fontSize: 28,
        color: '#010101',
        cursor: 'pointer',
      },

      IconeEdit:{
        marginTop: 5,
        fontSize: 28,
        color: '#010101',
        cursor: 'pointer',
      }
});

export default styles;