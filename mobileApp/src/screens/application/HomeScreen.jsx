import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import { commonDarkStyle, commonStyle } from "../../style/style";



const primaryColor = '#024f9e';
const secondaryColor = '#74b212';
const gray = '#ccd3db'

const styles = StyleSheet.create({
    storyActive: {
      borderColor: `${secondaryColor}`,
      borderWidth: 3,
      padding: 1
    },
    storyInactive: {
      borderColor: `${gray}`,
      borderWidth: 3,
      padding: 1
    }
  })
  

const storyData = [
    {
      user: 'Megha 😂',
      story: true,
      image: require('../../assets/images/profile/img7.png'),
    },
    {
      user: 'Shruti 😂',
      story: true,
      image: require('../../assets/images/profile/img2.png'),
    },
    {
      user: 'Kareena 😂',
      story: false,
      image: require('../../assets/images/profile/img3.png'),
    },
    {
      user: 'Disha 😂',
      story: false,
      image: require('../../assets/images/profile/img4.png'),
    },
  
    {
      user: 'Neha 😂',
      story: true,
      image: require('../../assets/images/profile/img6.png'),
    },
  
  ]
  
  
  
  const VisitCard = () => {
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
      <TouchableOpacity onPress={()=>navigation.navigate('PostDetail')}>
      <View className="mt-2">
        <Image className="w-full h-52 rounded-xl" source={require('../../assets/images/posts/post2.png')} />
      </View>
      <View className="mt-2">
      <Text >
          <Text className={`font-black ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>Abhishek   </Text>
          <Text className={`text-black text-xs ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley...</Text>
        </Text>
      </View>
      </TouchableOpacity>
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
  

  

const HomeScreen = () => {
    const navigation = useNavigation();
    const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
    const [activeTab, setActiveTab] = useState(0);
    const theme = useSelector(state=>state.theme.value);
    useEffect(()=>{
      setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
    },[theme]);
  useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false,
    })});


    return(
        <SafeAreaView>
      <View className={`app-1 ${theme==="dark"&&"bg-black/[0.9]"}`}>
        {/* Top Bar */}
        <View className={`flex-row items-center justify-between p-4 ${theme === 'default'?'bg-white':'bg-black'}`}>
          <Image
            className="h-8 w-16"
            source={require('../../assets/images/logo.png')} />
          <TouchableOpacity>
            <View className={`${theme==="dark"?"bg-white/[0.2]":"bg-gray-300"} rounded-full w-8 h-8 flex-row items-center justify-center relative mr-1`}>
              <View className="w-2 h-2 bg-red-500 absolute rounded-full top-0 right-0"></View>
              <Feather
                name="bell"
                size={16}
                color={theme==="dark" ?"#fff":'#000'}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* /Top Bar */}

        

        {/* Posts */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Story */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row mb-2 mt-2 p-4 pt-1 pb-0">
            <TouchableOpacity className="mr-3" onPress={()=>setActiveTab(0)}>
              <Text className="text-black m-0" style={activeTab == 0?{...defaultTheme.customTabsActive}:{...defaultTheme.customTabs}}>All</Text>
              <Text className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md" style={activeTab == 0?{...defaultTheme.primaryBackgroundColor}:{backgroundColor:'transparent'}}></Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={()=>setActiveTab(1)}>
              <Text className="text-black m-0" style={activeTab == 1?{...defaultTheme.customTabsActive}:{...defaultTheme.customTabs}}>Pending</Text>
              <Text className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md" style={activeTab == 1?{...defaultTheme.primaryBackgroundColor}:{backgroundColor:'transparent'}}></Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={()=>setActiveTab(2)}>
              <Text className="text-black m-0" style={activeTab == 2?{...defaultTheme.customTabsActive}:{...defaultTheme.customTabs}}>Accepted</Text>
              <Text className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md" style={activeTab == 2?{...defaultTheme.primaryBackgroundColor}:{backgroundColor:'transparent'}}></Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={()=>setActiveTab(3)}>
              <Text className="text-black m-0" style={activeTab == 3?{...defaultTheme.customTabsActive}:{...defaultTheme.customTabs}}>Rejected</Text>
              <Text className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md" style={activeTab == 3?{...defaultTheme.primaryBackgroundColor}:{backgroundColor:'transparent'}}></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* /Story */}
          <View className="mb-48 p-4 pt-2">
            <VisitCard/>
            <VisitCard/>
          </View>
        </ScrollView>
        {/* /Posts */}
      </View>
    </SafeAreaView>
    )
}

export default HomeScreen;