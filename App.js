
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import WordList from './src/WordList';

const App = () => {
  return (
    <View style={styles.container}>
      <WordList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20
  }
});

export default App;
