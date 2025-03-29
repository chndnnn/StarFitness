import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Back({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width:35,
    backgroundColor: '#FF6F61',  // Background color for the icon
    borderRadius: 10,  // Make it circular
    padding: 5,  // Padding around the icon
    elevation: 4,  // Shadow for Android
    shadowColor: '#000',  // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
