import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text} from 'react-native';
import {images} from '../../assets/images';
import {Header} from '../../components/Header/Header';

export const HomeScreen = () => {
  return (
    <ImageBackground source={images.backgroundImage} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header location="Rio de Janeiro" />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  safeArea: {
    flex: 1,
  },
});
