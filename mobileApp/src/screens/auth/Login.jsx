import {View, Text, Image, TextInput, Button, Touchable, TouchableOpacity} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {commonStyle, commonDarkStyle} from '../../style/style';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {color} from '../../style/color';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {baseUrl} from '../../_api/api';
import {useStorage} from '../../_hook/useStorage';
import Feather from 'react-native-vector-icons/Feather';


const Login = () => {
  const [token, setToken] = useStorage('token', null);
  const navigation = useNavigation();
  const [defaultTheme, setDefaultTheme] = useState(commonStyle);
  const theme = useSelector(state => state.theme.value);

  //
  const[pending, setPending] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must contain at least 6 characters'),
  });

  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSignIn = data => {
    setPending(true);
    axios
      .post(baseUrl + 'login', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => {
        setPending(false);
        if (res.data.status == 200) {
          navigation.navigate('Application');
          setToken(res.data.token);
          // dispatch(setUser(res.data.user))
        } else {
          console.warn('Error');
        }
      })
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    setDefaultTheme(theme === 'default' ? commonStyle : commonDarkStyle);
  }, [theme]);
  useLayoutEffect(() => {
    // setToken();
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={{
        ...defaultTheme.defaultBackgroung,
        ...defaultTheme.defaultPadding,
      }}>
      <TouchableOpacity onPress={()=>navigation.navigate('Welcome')} className="border border-gray-500 rounded-lg flex items-center justify-center mb-5" style={{ width:32, height:32 }}>
        <Feather name="chevron-left" size={20} />
      </TouchableOpacity>
      <Text
        style={{
          ...defaultTheme.defaultColor,
          ...defaultTheme.defaultHeading,
          ...defaultTheme.defaultMarginBottom,
          fontWeight:700
        }}>
        Welcome back! Login as
      </Text>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={{
                ...defaultTheme.defaultTextInput,
                ...defaultTheme.defaultMarginBottom,
                ...defaultTheme.defaultColor,
              }}
              // value={'ryabhishek@yahoo.com'}
              onChangeText={onChange}
              placeholder="Email"
              placeholderTextColor="gray"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{color: 'red', marginBottom: 8}}>
            {errors.email.message}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={{
                ...defaultTheme.defaultTextInput,
                ...defaultTheme.defaultMarginBottom,
                ...defaultTheme.defaultColor,
              }}
              // value={'ASAJSSJSJSS'}
              onChangeText={onChange}
              placeholder="Password"
              placeholderTextColor="gray"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={{color: 'red', marginBottom: 16}}>
            {errors.password.message}
          </Text>
        )}

        <Button
          disabled={pending?true:false}
          onPress={handleSubmit(handleSignIn)}
          color={color.primaryColor}
          style={{...defaultTheme.primaryButton}}
          title={pending?"Processing":"Login"}
        />
      </View>
    </View>
  );
};

export default Login;
