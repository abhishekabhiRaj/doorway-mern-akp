import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { color } from "../../style/color";
import { useSelector } from "react-redux";
import { commonDarkStyle, commonStyle } from "../../style/style";

const UploadScreen = () => {
    const navigation = useNavigation();
    const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
    const theme = useSelector(state=>state.theme.value);
    useEffect(()=>{
      setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
    },[theme]);
  useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })});
    return(
        <View className={` ${theme==="dark"&&"bg-black/[0.9]"}`} style={{display:'flex',flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text className={`${theme==="dark"?"text-white/[0.6]":"text-black"}`}>Upload Page Pending...</Text>
            <TouchableOpacity>
                <Text style={{backgroundColor:color.primaryColor, color:'#fff', padding:8, borderRadius:4, marginTop:16}} onPress={()=>navigation.navigate('Home')}>Go Back To Home </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UploadScreen;