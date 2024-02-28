import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { color } from '../style/color';
import HomeScreen from '../screens/application/HomeScreen';
import SettingScreen from '../screens/application/SettingScreen';
import UploadScreen from '../screens/application/UploadScreen';
import PostDetailScreen from '../screens/application/PostDetailScreen';
import { commonDarkStyle, commonStyle } from '../style/style';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();


const Tabs = () => {
    const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
    const theme = useSelector(state=>state.theme.value);
    useEffect(()=>{
      setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
    },[theme]);

    if(theme === 'dark'){
    return(
        <Tab.Navigator
        initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                    backgroundColor:'#000',
                    borderTopColor:'#000',
                }
            }}
            
        >
            <Tab.Screen
                options={{
                tabBarIcon:({focused})=>{
                    return(
                        <View>
                            <View className="flex-row justify-center">
                                <Feather name="home" size={18} color={focused?color.primaryColor:theme==="dark"?"#595959":"#000"} />
                            </View>
                            {/* <Text>Home</Text> */}
                        </View>
                    )
                }
            }}
            name="Home" component={HomeScreen} />
            <Tab.Screen
            options={{
                tabBarIcon:({focused})=>{
                    return(
                        <View>
                            <View className="flex-row justify-center p-3 rounded-full" style={{marginTop:-40, backgroundColor:color.primaryColor}}>
                                <Feather name="plus" size={24} color="#fff" />
                            </View>
                            {/* <Text>Home</Text> */}
                        </View>
                    )
                }
            }}
            name="Upload" component={UploadScreen} />
            <Tab.Screen
            options={{
                tabBarIcon:({focused})=>{
                    return(
                        <View>
                            <View className="flex-row justify-center">
                                <Feather name="user" size={18} color={focused?color.primaryColor:theme==="dark"?"#595959":"#000"} />
                            </View>
                            {/* <Text>Home</Text> */}
                        </View>
                    )
                }
            }}
            name="Setting" component={SettingScreen} />
            <Tab.Screen
            options={{
                tabBarStyle: {
                    display:'none'
                },
                tabBarItemStyle: {
                    display:'none'
                },
                tabBarIcon:({focused})=>{
                    return(
                        <View>
                            <View className="flex-row justify-center">
                                <Feather name="user" size={18} color={focused?color.primaryColor:'#000'} />
                            </View>
                            {/* <Text>Home</Text> */}
                        </View>
                    )
                }
            }}
            name="PostDetail" component={PostDetailScreen} />
        </Tab.Navigator> 
    )
        }else{
            return(
                <Tab.Navigator
                initialRouteName='Home'
                    screenOptions={{
                        tabBarShowLabel:false,
                        // tabBarStyle:{
                        //     backgroundColor:'#fff',
                        //     borderTopColor:'#000',
                        // }
                    }}
                    
                >
                    <Tab.Screen
                        options={{
                        tabBarIcon:({focused})=>{
                            return(
                                <View>
                                    <View className="flex-row justify-center">
                                        <Feather name="home" size={18} color={focused?color.primaryColor:theme==="dark"?"#595959":"#000"} />
                                    </View>
                                    {/* <Text>Home</Text> */}
                                </View>
                            )
                        }
                    }}
                    name="Home" component={HomeScreen} />
                    <Tab.Screen
                    options={{
                        tabBarIcon:({focused})=>{
                            return(
                                <View>
                                    <View className="flex-row justify-center p-3 rounded-full" style={{marginTop:-40, backgroundColor:color.primaryColor}}>
                                        <Feather name="plus" size={24} color="#fff" />
                                    </View>
                                    {/* <Text>Home</Text> */}
                                </View>
                            )
                        }
                    }}
                    name="Upload" component={UploadScreen} />
                    <Tab.Screen
                    options={{
                        tabBarIcon:({focused})=>{
                            return(
                                <View>
                                    <View className="flex-row justify-center">
                                        <Feather name="user" size={18} color={focused?color.primaryColor:theme==="dark"?"#595959":"#000"} />
                                    </View>
                                    {/* <Text>Home</Text> */}
                                </View>
                            )
                        }
                    }}
                    name="Setting" component={SettingScreen} />
                    <Tab.Screen
                    options={{
                        tabBarStyle: {
                            display:'none'
                        },
                        tabBarItemStyle: {
                            display:'none'
                        },
                        tabBarIcon:({focused})=>{
                            return(
                                <View>
                                    <View className="flex-row justify-center">
                                        <Feather name="user" size={18} color={focused?color.primaryColor:'#000'} />
                                    </View>
                                    {/* <Text>Home</Text> */}
                                </View>
                            )
                        }
                    }}
                    name="PostDetail" component={PostDetailScreen} />
                </Tab.Navigator> 
            )
        }
}


export default Tabs;