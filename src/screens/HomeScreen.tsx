import React from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {COLORS} from '../theme/theme';

const HomeScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView></ScrollView>
      <Text>HomeScreen</Text>
    </View>
  );
};

// const style = StyleSheet

export default HomeScreen;
