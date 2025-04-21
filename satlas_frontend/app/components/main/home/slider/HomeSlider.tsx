import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const AutoSlider = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        dotColor="#ccc"
        activeDotColor="#000"
      >
        <Image
          source={{ uri: 'https://assets.testinnovators.com/wp-content/uploads/2023/12/Digital-SAT-Infographic-Banner.jpg' }}
          style={styles.image}
          resizeMode="stretch"
        />

        <Image
          source={{ uri: 'https://img2.storyblok.com//f/64062/1000x586/9aaa6b3e63/sat-test-ebook-m.png' }}
          style={styles.image}
          resizeMode="stretch"
        />

        {/* Add more images if needed */}
        {/* <Image source={require('./assets/slider2.png')} style={styles.image} /> */}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    marginTop: 10,





  },
  image: {
    width: width,
    height: 180,


  },
});

export default AutoSlider;
