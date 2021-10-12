import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { SIZES, FONTS, COLORS, icons } from '../constants';
import { Viewers } from '../components/Viewers';

const HEADER_HEIGHT = 350;

const RecipeCreatorCardDetail = ({ selectedRecipe }) => {
  return (
    <View style={styles.cardDetail}>
      <View style={styles.creatorImageContainer}>
        <Image
          style={styles.creatorImage}
          source={selectedRecipe?.author.profilePic}
        />
      </View>
      <View style={styles.creatorLabel}>
        <Text style={styles.creatorText}>Recipe by:</Text>
        <Text style={styles.creatorName}>{selectedRecipe?.author?.name}</Text>
      </View>

      <TouchableOpacity
        style={styles.creatorButton}
        onPress={() => console.log('author profile')}
      >
        <Image style={styles.creatorBtnImg} source={icons.rightArrow} />
      </TouchableOpacity>
    </View>
  );
};

const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView style={styles.blurView} blurType="dark">
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={[styles.blurView, { backgroundColor: COLORS.transparentBlack9 }]}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </View>
    );
  }
};

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  const renderHeaderBar = () => {
    return (
      <View style={styles.headerBar}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <Text style={styles.creatorText}>Recipe by:</Text>
          <Text style={styles.creatorName}>{selectedRecipe?.author?.name}</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.headerBarBack}
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.back} style={styles.headerBarBackImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBarBookmark} onPress={() => {}}>
          <Image
            style={styles.headerBarBookmarkImg}
            source={
              selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark
            }
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecipeCardHeader = () => {
    return (
      <View style={styles.cardHeader}>
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={[
            styles.mainImage,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                  }),
                },
                {
                  scale: scrollY.interpolate({
                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    outputRange: [2, 1, 0.75],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.author,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 170, 250],
                    outputRange: [0, 0, 100],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  };

  const renderRecipeInfo = () => {
    return (
      <View style={styles.recipeInfo}>
        <View style={styles.recipeInfoMain}>
          <Text style={styles.recipeInfoText}>{selectedRecipe?.name}</Text>
          <Text style={styles.recipeInfoText2}>
            {selectedRecipe?.duration} | {selectedRecipe?.serving}
          </Text>
        </View>
        <View style={styles.recipeInfoViewers}>
          <Viewers viewersList={selectedRecipe?.viewers} />
        </View>
      </View>
    );
  };

  const renderIngredientHeader = () => {
    return (
      <View style={styles.ingredientHeader}>
        <Text style={styles.ingredientHeaderText1}>Ingredients</Text>
        <Text style={styles.ingredientHeaderText2}>
          {selectedRecipe?.ingredients.length} items
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderRecipeCardHeader()}
            {renderRecipeInfo()}
            {renderIngredientHeader()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={styles.ingredients}>
            <View style={styles.ingrdImageContainer}>
              <Image style={styles.ingrdImage} source={item.icon} />
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View style={styles.quantity}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={<View style={styles.footer} />}
      />

      {renderHeaderBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  ingredients: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  ingrdImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  ingrdImage: {
    width: 40,
    height: 40,
  },
  description: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  descriptionText: {
    ...FONTS.body3,
  },
  quantity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...FONTS.body3,
  },
  cardHeader: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  mainImage: {
    height: HEADER_HEIGHT,
    width: '200%',
  },
  author: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    height: 80,
  },
  blurView: {
    flex: 1,
    borderRadius: SIZES.radius,
  },
  cardDetail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorImageContainer: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  creatorImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  creatorLabel: {
    flex: 1,
    marginHorizontal: 20,
  },

  creatorText: {
    color: COLORS.lightGray2,
    ...FONTS.body4,
  },
  creatorName: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  creatorButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGreen1,
  },
  creatorBtnImg: {
    width: 15,
    height: 15,
    tintColor: COLORS.lightGreen1,
  },
  headerBar: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingBottom: 10,
  },
  headerBarBack: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.transparentBlack5,
  },
  headerBarBackImg: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
  },
  headerBarBookmark: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
  },
  headerBarBookmarkImg: {
    width: 30,
    height: 30,
    tintColor: COLORS.darkGreen,
  },
  recipeInfo: {
    flexDirection: 'row',
    height: 130,
    width: SIZES.width,
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: 'center',
  },
  recipeInfoMain: {
    flex: 1.5,
    justifyContent: 'center',
  },
  recipeInfoText: {
    ...FONTS.h2,
  },
  recipeInfoText2: {
    marginTop: 5,
    color: COLORS.lightGray2,
    ...FONTS.body4,
  },
  recipeInfoViewers: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    marginBottom: 100,
  },
  ingredientHeader: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginTop: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  ingredientHeaderText1: {
    flex: 1,
    ...FONTS.h3,
  },
  ingredientHeaderText2: {
    ...FONTS.body4,
    color: COLORS.lightGray2,
  },
});

export default Recipe;
