import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Clock from './Clock';

export default function App() {

  return (
    <View style={styles.container}>
      <Clock />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
