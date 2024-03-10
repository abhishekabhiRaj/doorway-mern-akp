import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import Tabs from "../../navigation/tabs";
import { jwt_decode } from "jwt-decode-es";
import moment from "moment";
import { useStorage } from "../../_local_storage/mmkv";


const Tab = createBottomTabNavigator();


const Application = () => {
  const navigation = useNavigation();
  useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
},[]);

const [token, setToken] = useStorage('token', '');


const [decodedJWT, setDecodedJWT] = useState(null);
useEffect(()=>{
  if(token){
    let jwtDecode1 = jwt_decode(token);
    setDecodedJWT(jwtDecode1);
  }
},[token])

useEffect(()=>{
    if(decodedJWT){
      var expTime = decodedJWT.exp - decodedJWT.iat;
    var currentDT = new Date();
    var expDT = new Date();
    expDT.setSeconds(expDT.getSeconds() + expTime);
    const intervalId = setInterval(()=>{
      console.log(moment(expDT).diff(moment()));
      if(moment(expDT).diff(moment())>0){
        console.log("not expired") 
      }else{
        console.log("expired")
        setToken();
        navigation.navigate('Login');
        clearInterval(intervalId);
      }
    }, 5000);  
    return () => {
      clearInterval(intervalId);
    };
    }
  },[decodedJWT])
    return(
        <Tabs />
    )
}

export default Application;