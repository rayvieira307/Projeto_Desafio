import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute', 
    bottom: 0,          
    left: 0,              
    width: '100%',        
    flexDirection: 'row', 
    backgroundColor: '#f8f8ff',  
    padding: 14,        
    boxShadow: '2px 0 5px rgba(0, 0, 2, 0.5)', 
  },

  sidebarItem: {
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,            
  },

  iconButton: {
    padding: 10,       
    justifyContent: 'center',  
    alignItems: 'center',  
  },
});

export default styles;