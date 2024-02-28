
import React, { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SplashScreen from 'react-native-splash-screen'


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
    user: 'Dilip',
    story: true,
    image: require('./assets/images/profile/img7.png'),
  },
  {
    user: 'John Doe',
    story: true,
    image: require('./assets/images/profile/img2.png'),
  },
  {
    user: 'Vinod',
    story: false,
    image: require('./assets/images/profile/img3.png'),
  },
  {
    user: 'Mohan',
    story: false,
    image: require('./assets/images/profile/img4.png'),
  },

  {
    user: 'Neha',
    story: true,
    image: require('./assets/images/profile/img6.png'),
  },

]


const StoryCard = ({ image, user, story }) => {
  return (
    <TouchableOpacity className="mr-2">
      <View>
        <View style={story ? styles.storyActive : styles.storyInactive} className="w-16 h-16 rounded-full">
          <Image className="h-14 w-14 rounded-full " source={image} />
        </View>
        <Text className="w-16 text-center text-xs text-black font-bold">{user}</Text>
      </View>
    </TouchableOpacity>
  )
}


const Post = () => ( 
  <TouchableOpacity>
  <View className="w-full  bg-gray-200 mb-4 rounded-xl p-4">
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Image className="w-10 h-10 rounded-full" source={require('./assets/images/profile/img3.png')} />
        <View className="mx-2">
          <Text className="font-black text-black">Abhishek</Text>
          <View className="flex-row items-center">
            {/* location */}
            <Text className="text-xs text-black mr-2">Gaya</Text>
            {/* post time */}
            <Text className="text-xs mr-2">1 min ago</Text>
            <Feather
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
                color="#000"
            />
        </Text>
      </View>
    </View>
    <View className="mt-2">
      <Image className="w-full h-52 rounded-xl" source={require('./assets/images/posts/post1.png')} />
    </View>
    <View className="mt-2">
    <Text >
        <Text className="font-black text-black text-xs">Abhishek   </Text>
        <Text className="text-black text-xs">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley...</Text>
      </Text>
    </View>
    <View className="mt-3 mb-3" style={{borderBottomWidth:1, borderBlockColor:`${gray}`}}/>
    <View className="flex-row items-center justify-between">
      <View className="flex-row">
        <Text className="text-xs text-black"><Feather name="thumbs-up" size={16} /> 200 Like</Text>
        <Text className="text-xs mx-2 text-black"><Feather name="message-square" size={16} /> Comments</Text>
      </View>
      <View className="flex-row">
        {/* <Text className="text-xs text-black"><Feather name="thumbs-up" size={16} /></Text> */}
        <Text className="text-xs text-black mx-2"><Feather name="bookmark" size={16} /></Text>
      </View>
    </View>
  </View>
  </TouchableOpacity>
)



const App = () => {

  useEffect(()=>{
    if(Platform.OS === 'android'){
      SplashScreen.hide();
    }
  },[])
  return (
    <SafeAreaView>
      <View className="app p-4 pt-4 pb-4">
        {/* Top Bar */}
        <View className="flex-row items-center justify-between">
          <Image
            className="h-8 w-36"
            source={require('./assets/images/logo.png')} />
          <TouchableOpacity>
            <View className="bg-gray-300 rounded-full w-8 h-8 flex-row items-center justify-center relative mr-1">
              <View className="w-2 h-2 bg-red-500 absolute rounded-full top-0 right-0"></View>
              <Feather
                name="bell"
                size={16}
                color={
                  '#000'
                }
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* /Top Bar */}

        {/* Story */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row mb-4 mt-4">
            <StoryCard image={require('./assets/images/profile/img1.png')} user="Your Story" story={true} />
            {storyData.map((item, i) => (
              <StoryCard image={item.image} user={item.user} story={item.story} key={i} />
            ))}
          </View>
        </ScrollView>
        {/* /Story */}

        {/* Posts */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-2 mb-48">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
          </View>
        </ScrollView>
        {/* /Posts */}
      </View>
    </SafeAreaView>
  )
}

export default App;

