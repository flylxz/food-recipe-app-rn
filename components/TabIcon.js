import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants';

export const TabIcon = ({ focused, icon }) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        style={[
          styles.image,
          { tintColor: focused ? COLORS.darkGreen : COLORS.lightLime },
        ]}
        resizeMode="contain"
      />
      {focused && <View style={styles.line}></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 50,
  },
  image: {
    width: 30,
    height: 30,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: COLORS.darkGreen,
  },
});
