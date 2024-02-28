import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {View, Text, TouchableOpacity, Image } from "react-native";
import { color } from "../../style/color";
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import { commonDarkStyle, commonStyle } from "../../style/style";


const primaryColor = '#024f9e';
const secondaryColor = '#74b212';
const gray = '#ccd3db'

const dummuText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum like Aldus PageMaker including versions of Lorem Ipsum";


  
const Post = () => {
  const navigation = useNavigation();
  const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
  const theme = useSelector(state=>state.theme.value);
  useEffect(()=>{
    setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
  },[theme]);
  return(
    <View className={`w-full mb-4 rounded-xl p-4 ${theme === "dark"?"bg-black":"bg-white"}`}>
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Image className="w-10 h-10 rounded-full" source={require('../../assets/images/profile/img4.png')} />
        <View className="mx-2">
          <Text className={`font-black ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>Abhishek</Text>
          <View className="flex-row items-center">
            {/* location */}
            <Text className={`text-xs mr-2 ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>Gaya</Text>
            {/* post time */}
            <Text className={`text-xs mr-2 ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>1 min ago</Text>
            <Feather
                color={theme=== "dark"&&"#fff"}
                name="globe"
                size={12}
            />
          </View>
        </View>
      </View>
      <View>
        <Text>
          <Feather
                name="more-horizontal"
                size={20}
                color={theme=== "dark"&&"#fff"}
            />
        </Text>
      </View>
    </View>
    <View className="mt-2">
      <Image className="w-full h-52 rounded-xl" source={require('../../assets/images/posts/post2.png')} />
    </View>
    <View className="mt-2">
    <Text >
        <Text className={`font-black ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>Abhishek   </Text>
        <Text className={`text-black text-xs ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>{dummuText+dummuText}</Text>
      </Text>
    </View>
    <View className="mt-3 mb-3" style={{borderBottomWidth:1, borderBlockColor:`${theme=== "dark"?"#27282d":gray}`}}/>
    <View className="flex-row items-center justify-between">
        <Text className={`text-xs ${theme === "dark"?"text-white/[0.7]":"text-black"}`}><Feather name="thumbs-up" size={16} /> 200K </Text>
        <Text className={`text-xs ${theme === "dark"?"text-white/[0.7]":"text-black"}`}><Feather name="message-square" size={16} /> 4000 </Text>
        <Text className={`text-xs ${theme === "dark"?"text-white/[0.7]":"text-black"}`}><Feather name="repeat" size={16} /> 300</Text>
        <Text className={`text-xs ${theme === "dark"?"text-white/[0.7]":"text-black"}`}><Feather name="share-2" size={16} /></Text>
    </View>
  </View>
  )
}


  

const PostDetailScreen = () => {
    const navigation = useNavigation();
    const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
    const theme = useSelector(state=>state.theme.value);
    useEffect(()=>{
      setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
    },[theme]);
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
            headerTitle : "Post Detail",
            headerLeft:()=>(<TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{padding:18, paddingRight:4}}>
                    <Feather
                name="arrow-left"
                size={16}
                color={theme === "dark" ? "#fff" : "#000"}
              /></TouchableOpacity>),
            headerStyle : {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
        })}); 

    return(
        <View className={`${theme === "dark"&&"bg-black/[0.9]"} flex-1`}>
          <View className={`flex-row items-center ${theme==="dark"?"bg-black":"bg-white"}`}>
          <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{padding:18, paddingRight:4}}>
                    <Feather
                name="arrow-left"
                size={16}
                color={theme === "dark" ? "#f5f5f5" : "#000"}
              /></TouchableOpacity>
              <Text className={`mx-3 text-xl ${theme === "dark"?"text-white/[0.8]":"text-black"}`}>Post Detail</Text>
          </View>
            <View className="p-4">
            <Post/>
            </View>
        </View>
    )
}

export default PostDetailScreen;