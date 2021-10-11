import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { COLORS, FONTS, icons, SIZES } from '../constants';

const RecipeCardDetails = ({ recipeItem }) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsTitle}>
        <Text style={styles.detailsTitleText}>{recipeItem.name}</Text>
        <Image
          source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
          style={styles.bookmark}
        />
      </View>
      <View style={styles.detailsDuration}>
        <Text style={styles.durationText}>
          {recipeItem.duration} | {recipeItem.serving}
        </Text>
      </View>
    </View>
  );
};

const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView blurType="dark" style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    <View
      style={{
        ...styles.recipeCardContainer,
        backgroundColor: COLORS.transparentGray,
      }}
    >
      {' '}
    </View>;
  }
};

export const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[containerStyle, styles.container]}
    >
      <Image source={recipeItem.image} style={styles.img} />
      <View style={styles.categoryTitle}>
        <Text style={styles.categoryText}>{recipeItem.category}</Text>
      </View>
      <Text>{recipeItem.name}</Text>
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 250,
    marginTop: SIZES.radius,
    marginRight: 20,
    borderRadius: SIZES.radius,
  },
  img: {
    width: 250,
    height: 350,
    borderRadius: SIZES.radius,
  },
  categoryTitle: {
    position: 'absolute',
    top: 20,
    left: 5,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    backgroundColor: COLORS.transparentGray,
    borderRadius: SIZES.radius,
  },
  categoryText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  recipeCardContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
  detailsContainer: {
    flex: 1,
  },
  detailsTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsTitleText: {
    width: '70%',
    color: COLORS.white,
    ...FONTS.h3,
    fontSize: 18,
  },
  bookmark: {
    width: 20,
    height: 20,
    marginRight: SIZES.base,
    tintColor: COLORS.darkGreen,
  },
  detailsDuration: {},
  durationText: {
    color: COLORS.lightGray,
    ...FONTS.body4,
  },
});
