import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { CategoryCard, TrendingCard } from '../components';

import { FONTS, COLORS, SIZES, icons, images, dummyData } from '../constants';

const Home = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Hello Alex</Text>
          <Text style={styles.headerTitleQuestion}>
            What you want to cook today?
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Profile')}>
          <Image
            source={images.profile}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <Image
          source={icons.search}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.textInput}
          placeholderTextColor={COLORS.gray}
          placeholder="Search recipes"
        />
      </View>
    );
  };

  const renderSeeRecipeCard = () => {
    return (
      <View style={styles.seeCard}>
        <View style={styles.seeCardImgContainer}>
          <Image
            source={images.recipe}
            resizeMode="contain"
            style={styles.seeCardImg}
          />
        </View>
        <View style={styles.seeCardTextContainer}>
          <Text style={styles.seeCardText}>
            You have 12 recipes that you haven't tried
          </Text>
          <TouchableOpacity
            onPress={() => console.log('see recipes')}
            style={styles.seeCardLink}
          >
            <Text style={styles.seeCardLinkText}>See Recipes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTrendingSection = () => {
    return (
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>Trending Recipe</Text>
        <FlatList
          data={dummyData.trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => (
            <TrendingCard
              recipeItem={item}
              onPress={() => navigation.navigate('Recipe', { recipe: item })}
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : 0,
              }}
            />
          )}
        />
      </View>
    );
  };

  const renderCategoryHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h2 }}>Category</Text>
        <TouchableOpacity>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => item.id}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderSearchBar()}
            {renderSeeRecipeCard()}
            {renderTrendingSection()}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={({ item }) => (
          <CategoryCard
            categoryItem={item}
            containerStyle={{ marginHorizontal: SIZES.padding }}
            onPress={() => navigation.navigate('Recipe', { recipe: item })}
          />
        )}
        ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    alignItems: 'center',
    height: 80,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    color: COLORS.darkGreen,
    ...FONTS.h2,
  },
  headerTitleQuestion: {
    marginTop: 3,
    color: COLORS.gray,
    ...FONTS.body3,
  },
  titleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  textInput: {
    marginLeft: SIZES.radius,
    ...FONTS.body3,
  },
  seeCard: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
  },
  seeCardImgContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeCardImg: {
    width: 80,
    height: 80,
  },
  seeCardTextContainer: {
    flex: 1,
    paddingVertical: SIZES.radius,
  },
  seeCardText: {
    width: '70%',
    ...FONTS.body4,
  },
  seeCardLink: {
    marginTop: 10,
  },
  seeCardLinkText: {
    color: COLORS.darkGreen,
    textDecorationLine: 'underline',
    ...FONTS.h4,
  },
  trendingContainer: {
    marginTop: SIZES.padding,
  },
  trendingTitle: {
    marginHorizontal: SIZES.padding,
    ...FONTS.h2,
  },
});

export default Home;
