import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { color } from "../../style/color";
import { useDispatch, useSelector } from "react-redux";
import { commonDarkStyle, commonStyle } from "../../style/style";
import { setTheme } from "../../app/features/appTheme";
import { useStorage } from "../../_local_storage/mmkv";

const SettingScreen = () => {
    const [token, setToken] = useStorage('token', '');
    const navigation = useNavigation();
    const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
    const dispatch = useDispatch();
    
    const theme = useSelector(state=>state.theme.value);
    useEffect(()=>{
      setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
    },[theme]);
  useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })});
    return(
        <View className={`${theme==="dark"&&"bg-black/[0.9] "}`} style={{display:'flex',flex:1, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity>
                <Text style={{backgroundColor:color.primaryColor, color:'#fff', padding:8, borderRadius:4}} onPress={()=>{
                    navigation.navigate('Login');
                    setToken();
                }}>Logout </Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4" onPress={()=>dispatch(setTheme('dark'))}>
                <Text style={{backgroundColor:color.primaryColor, color:'#fff', padding:8, borderRadius:4}}>Dark Mode </Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4" onPress={()=>dispatch(setTheme('default'))}>
                <Text style={{backgroundColor:color.primaryColor, color:'#fff', padding:8, borderRadius:4}} >Light Mode </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingScreen;