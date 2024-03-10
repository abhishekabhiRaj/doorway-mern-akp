import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import Tabs from '../../navigation/tabs';
import {jwt_decode} from 'jwt-decode-es';
import moment from 'moment';
import {useStorage} from '../../_hook/useStorage';
import { useTokenExpiry } from '../../_hook/useTokenExpiry';

const Tab = createBottomTabNavigator();

const Application = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useTokenExpiry();

  return <Tabs />;
};

export default Application;
