import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

export const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <Image
        source={categoryItem.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{categoryItem.name}</Text>
        <Text style={styles.description}>
          {categoryItem.duration} | {categoryItem.serving} Serving
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.grey2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius,
  },
  details: {
    width: '65%',
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    ...FONTS.h2,
  },
  description: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
});
