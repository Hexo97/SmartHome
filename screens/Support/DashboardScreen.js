import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from '../../components/Themed';

export default function DashboardScreen() {


  return (
    <View style={styles.container}>
      <Text>Support Profile Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
