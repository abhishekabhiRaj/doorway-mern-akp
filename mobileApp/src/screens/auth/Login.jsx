import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { commonStyle , commonDarkStyle } from '../../style/style'
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../style/color';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../_api/api';
import { useStorage } from '../../_hook/useStorage';

const Login = () => {
  const [token, setToken] = useStorage("token", null);
  const navigation = useNavigation();
  const [defaultTheme, setDefaultTheme] = useState(commonStyle);
  const theme = useSelector(state=>state.theme.value);
  useEffect(()=>{
    setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
  },[theme]);
  useLayoutEffect(()=>{
    // setToken();
    navigation.setOptions({
        headerShown:false
    })
},[])

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email'),
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
  const signIn = (data) => {
    axios.post( baseUrl + 'login', data, {
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      }}) 
    .then(res=>{
      if(res.data.status == 200){
        navigation.navigate('Application');
        setToken(res.data.token);
        // dispatch(setUser(res.data.user))
      }else{
        console.warn("Error")
      }
    })
    .catch(err=> console.warn(err));
  }

  useEffect (()=> {console.log(token)}, [token])
   

  return(
    <View
      style={{...defaultTheme.defaultBackgroung, ...defaultTheme.defaultPadding}}>
      <View style={defaultTheme.itemCenter}>
        <Image
          style={defaultTheme.loginLogo}
          source={require('../../assets/images/logo.png')}
        />
        <Image
          style={defaultTheme.defaultImage}
          source={theme === 'default' ?require('../../assets/images/login.png'):require('../../assets/images/loginDark.png')}
        />
      </View>
      <Text
        style={{
          ...defaultTheme.defaultColor,
          ...defaultTheme.defaultHeading,
          ...defaultTheme.defaultMarginBottom,
        }}>
        Sign In
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
          <Text style={{color: 'red',marginBottom:8}}>{errors.email.message}</Text>
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
          <Text style={{color: 'red', marginBottom:16}}>{errors.password.message}</Text>
        )}
        <Button
          onPress={handleSubmit(signIn)}
          color={color.primaryColor}
          style={{...defaultTheme.primaryButton}}
          title="Sign In"
        />
      </View>
    </View>
  )
}

export default Login;