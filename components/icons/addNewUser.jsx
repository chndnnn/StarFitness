import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';  // For gradient background

export default function NewUser({ onPress }) {
  // Animation for floating effect
  const scale = new Animated.Value(1);

  // Handle touch down (onPressIn) to scale up
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  // Handle touch up (onPressOut) to scale back
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={['#FFCC00', '#FF6F00', '#D50000']} // Yellow to red gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <Ionicons name="add" size={24} color="white" />
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
      // space below the button
  },
  button: {
    width: 50,
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10, // You can adjust this to give slight rounding to the corners
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,  // Slight border radius for smooth corners
    padding: 10,
  },
  icon: {
    color: 'white',
  },
});
