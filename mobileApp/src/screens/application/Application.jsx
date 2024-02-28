import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import Tabs from "../../navigation/tabs";

const Tab = createBottomTabNavigator();


const Application = () => {
    const navigation = useNavigation();

  useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
},[])
    return(
        <Tabs />
    )
}

export default Application;