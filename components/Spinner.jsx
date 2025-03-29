import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Spinner = ({ loading }) => {
  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#FFA500" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // You can change the background color if you like
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Spinner;
