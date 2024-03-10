import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import Tabs from '../../navigation/tabs';
import { useTokenExpiry } from '../../_hook/useTokenExpiry';

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
