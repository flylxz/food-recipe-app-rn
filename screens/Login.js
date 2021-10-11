import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomButton } from '../components';

import { images, COLORS, SIZES, FONTS } from '../constants';

const Login = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <ImageBackground
          source={images.loginBackground}
          style={styles.imgBackground}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={styles.gradient}
          >
            <Text style={styles.title}>Cooking a Delicious Food Easily</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  const renderDetail = () => {
    return (
      <View style={styles.detail}>
        <Text style={styles.detailText}>
          Discover more than 1200 food recipes in your hands and cooking it
          easily
        </Text>
        <View style={styles.btnContainer}>
          <CustomButton
            buttonText="Login"
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => navigation.replace('Home')}
            buttonContainerStyle={styles.loginBtn}
          />
          <CustomButton
            buttonText="Sign Up"
            colors={[]}
            onPress={() => navigation.replace('Home')}
            buttonContainerStyle={{ ...styles.loginBtn, ...styles.signupBtn }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderDetail()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    height: SIZES.height > 700 ? '65%' : '60%',
  },
  imgBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.padding,
  },
  title: {
    width: '80%',
    color: COLORS.white,
    ...FONTS.largeTitle,
    lineHeight: 45,
  },
  detail: { flex: 1, paddingHorizontal: SIZES.padding },
  detailText: {
    marginTop: SIZES.radius,
    width: '70%',
    color: COLORS.gray,
    ...FONTS.body3,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginBtn: {
    paddingVertical: 18,
    borderRadius: 20,
  },
  signupBtn: {
    marginTop: SIZES.radius,
    borderColor: COLORS.darkLime,
    borderWidth: 1,
  },
});

export default Login;
