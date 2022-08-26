import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import {colors} from '../../assets/colors';

export interface IHeaderProps {
  location?: string;
}

export const Header = ({location}: IHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <EntypoIcon name="location-pin" size={25} color={colors.white} />
        <Text style={styles.locationText}>{location}</Text>
      </View>

      <EntypoIcon name="menu" size={30} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 22,
    color: colors.white,
    marginLeft: 10,
  },
});
