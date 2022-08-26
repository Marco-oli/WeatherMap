import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {images} from '../../assets/images';
import {Header} from '../../components/Header/Header';

export const HomeScreen = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const getPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse').then(() => {
        getPosition();
      });
    } else {
      const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Precisamos da sua permissão',
              message:
                'Para pegar sua lucalização, precisamos da sua permissão.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getPosition();
          } else {
            console.log('Negado');
          }
        } catch (err) {
          console.warn(err);
        }
      };

      requestLocationPermission();
    }
  }, [getPosition]);

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
