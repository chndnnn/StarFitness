import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Delete({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="trash-bin" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    backgroundColor: '#FF3D00',  // Background color for delete icon (Red)
    borderRadius: 10,  // Rounded corners
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
