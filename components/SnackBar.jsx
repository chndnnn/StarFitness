import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnackBar = () => {
  const [visible, setVisible] = React.useState(false); // Using useState hook for visibility

  return (
    <View style={styles.container}>
      <Button onPress={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={5000}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackBar;
