import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, FONTS } from '../constants';

export const CustomButton = ({
  buttonText,
  buttonContainerStyle,
  colors,
  onPress,
}) => {
  if (colors?.length > 0) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={{ ...buttonContainerStyle }}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={{ ...buttonContainerStyle }}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
});
