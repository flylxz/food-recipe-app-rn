import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS, FONTS } from '../constants';

export const Viewers = ({ viewersList }) => {
  if (!viewersList?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Be the first to try this</Text>
      </View>
    );
  }
  if (viewersList?.length <= 4) {
    return (
      <View>
        <View style={styles.profile}>
          {viewersList?.map((item, index) => (
            <View
              key={index}
              style={{
                height: 50,
                width: 50,
                marginLeft: index === 0 ? 0 : -20,
              }}
            >
              <Image source={item.profilePic} style={styles.image} />
            </View>
          ))}
        </View>
        <Text style={styles.profileText}>{viewersList?.length} people</Text>
        <Text style={styles.profileText}>Already try this!</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.profile}>
        {viewersList?.map((item, index) => {
          if (index <= 2) {
            return (
              <View
                key={index}
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: index === 0 ? 0 : -20,
                }}
              >
                <Image source={item.profilePic} style={styles.image} />
              </View>
            );
          }
          if (index == 3) {
            return (
              <View
                key={index}
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: -20,
                  borderRadius: 25,
                  backgroundColor: COLORS.darkGreen,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                  {viewersList?.length - 3}+
                </Text>
              </View>
            );
          }
        })}
      </View>
      <Text style={styles.profileText}>{viewersList?.length} people</Text>
      <Text style={styles.profileText}>Already try this!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.lightGray2,
    ...FONTS.body4,
    textAlign: 'right',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileText: {
    color: Colors.lightGray2,
    textAlign: 'right',
    ...FONTS.body4,
    lineHeight: 18,
  },
});
