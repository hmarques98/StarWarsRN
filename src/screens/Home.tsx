import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
