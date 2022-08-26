import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {colors} from '../../assets/colors';

export interface ITempoInfosProps {
  temp?: number;
  tempMax?: number;
  tempMin?: number;
  moisture?: number;
  wind?: number;
  icon?: string;
}

export const TempInfos = ({
  temp,
  tempMax,
  tempMin,
  moisture,
  wind,
  icon,
}: ITempoInfosProps) => {
  return (
    <View>
      {temp && (
        <View style={styles.containerTemps}>
          <Text style={styles.temp}>{temp?.toFixed()}°</Text>
          <Image
            source={{uri: `http://openweathermap.org/img/wn/${icon}@2x.png`}}
            style={{width: 120, height: 120}}
          />
        </View>
      )}

      {tempMax && (
        <View style={styles.containerTemps}>
          <AntDesignIcon name="arrowup" size={30} color={colors.orange} />
          <Text style={styles.tempMax}>Máxima: {tempMax?.toFixed()}°</Text>
        </View>
      )}

      {tempMin && (
        <View style={styles.containerTemps}>
          <AntDesignIcon name="arrowdown" size={30} color={colors.blue} />
          <Text style={styles.tempMin}>Mínima: {tempMin?.toFixed()}°</Text>
        </View>
      )}

      {moisture && (
        <View style={styles.containerTemps}>
          <FeatherIcon name="droplet" size={30} color={colors.green} />
          <Text style={styles.moisture}>Umidade: {moisture?.toFixed()}%</Text>
        </View>
      )}

      {wind && (
        <View style={styles.containerTemps}>
          <FeatherIcon name="wind" size={30} color={colors.gray} />
          <Text style={styles.wind}>Vento: {wind?.toFixed()} km/h</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  temp: {
    fontSize: 130,
    fontWeight: 'bold',
    marginTop: 20,
  },
  containerTemps: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempMax: {
    fontSize: 30,
    marginLeft: 10,
    color: colors.white,
  },
  tempMin: {
    fontSize: 30,
    marginLeft: 10,
    color: colors.white,
  },
  moisture: {
    fontSize: 30,
    marginLeft: 10,
    color: colors.white,
  },
  wind: {
    fontSize: 30,
    marginLeft: 10,
    color: colors.white,
  },
});
