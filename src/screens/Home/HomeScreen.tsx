import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {colors} from '../../assets/colors';

import {images} from '../../assets/images';
import {Header} from '../../components/Header/Header';
import {TempInfos} from '../../components/TempInfos/TempInfos';
import {useGetWeather} from '../../hooks/useGetWeather';

export const HomeScreen = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const {data, error, getWeather, loading} = useGetWeather();

  const getPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      err => {
        console.log(err.code, err.message);
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

  useEffect(() => {
    if (lat && long) {
      console.log(lat, long);
      getWeather(lat, long);
    }
  }, [lat, long]);

  console.log(data, lat, long);

  return (
    <ImageBackground source={images.backgroundImage} style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      ) : (
        <SafeAreaView style={styles.safeArea}>
          <Header location={data?.name} />

          <TempInfos
            temp={data?.main.temp}
            tempMax={data?.main.temp_max}
            tempMin={data?.main.temp_min}
            moisture={data?.main.humidity}
            wind={data?.wind.speed}
            icon={data?.weather[0].icon}
          />

          <TouchableOpacity
            onPress={() => getWeather(lat, long)}
            style={styles.button}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
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
    justifyContent: 'space-between',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 30,
    marginLeft: 10,
    color: colors.white,
  },
});
