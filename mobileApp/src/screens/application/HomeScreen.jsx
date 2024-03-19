import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {commonDarkStyle, commonStyle} from '../../style/style';
import axios from 'axios';
import {baseUrl} from '../../_api/api';
import {useStorage} from '../../_hook/useStorage';
import {jwt_decode} from 'jwt-decode-es';
import moment from 'moment';
import { useFetch } from '../../__helpers/fetch';

const gray = '#ccd3db';


const VisitCard = ({item}) => {
  const navigation = useNavigation();
  const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
  const theme = useSelector(state => state.theme.value);
  useEffect(() => {
    setDefaultTheme(theme === 'default' ? commonStyle : commonDarkStyle);
  }, [theme]);
  return (
    <View
      className={`w-full mb-4 rounded-xl p-4 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
      <TouchableOpacity onPress={() => navigation.navigate('VisitDetail')}>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              className="w-16 h-16 rounded-lg"
              source={require('../../assets/images/visitors/img1.png')}
            />
            <View className="mx-2">
              <Text
                className={`font-black ${
                  theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
                }`}>
                {item.visitor_name}
              </Text>
              <View className="">
                {/* location */}
                <Text
                  className={`text-xs mr-2 ${
                    theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
                  }`}>
                  To Meet : {item.ptm_name}
                </Text>
                {/* post time */}
                <Text
                  className={`text-xs mr-2 ${
                    theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
                  }`}>
                  Purpose : {item.visitor_purpose}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View
        className="mt-3 mb-3"
        style={{
          borderBottomWidth: 1,
          borderBlockColor: `${theme === 'dark' ? '#27282d' : gray}`,
        }}
      />
      <View className="flex-row items-center justify-between">
        <TouchableOpacity className="p-1 px-2">
          <Text
            className={`text-xs ${
              theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
            }`}>
            <Feather name="thumbs-up" size={16} />{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-1 px-2">
          <Text
            className={`text-xs ${
              theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
            }`}>
            <Feather name="thumbs-down" size={16} />{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-1 px-2">
          <Text
            className={`text-xs ${
              theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
            }`}>
            <Feather name="eye" size={16} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-1 px-2">
          <Text
            className={`text-xs ${
              theme === 'dark' ? 'text-white/[0.7]' : 'text-black'
            }`}>
            <Feather name="printer" size={16} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
  useEffect(() => {
    setDefaultTheme(theme === 'default' ? commonStyle : commonDarkStyle);
  }, [theme]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  
  // ###############################################
  const [activeTab, setActiveTab] = useState(0);
  const [vistData, setVisitData] = useState([]);
	const [token, setToken] = useStorage('token', '');

  const theme = useSelector(state => state.theme.value);
	const [pending, setPending] = useState(false);
  const [visitStatus, setVisitStatus] = useState('')


  const handleFetchData = () => {
		setVisitData([]);
		setPending(true);
		axios
			.get(baseUrl + 'visit-list',
        {
          params: {
            visit_status: visitStatus?visitStatus:'',
          },
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})
			.then(res => {
				setPending(false);
				if (res.data.status == 200) {
					setVisitData(res.data.data);
				} else {
					setVisitData([]);
				}
			})
			.catch(err => console.warn(err));
	};

  useEffect(()=>{
    handleFetchData();
  },[visitStatus])
   
  return (
    <SafeAreaView>
      <View className={`app-1 ${theme === 'dark' && 'bg-black/[0.9]'}`}>
        {/* Top Bar */}
        <View
          className={`flex-row items-center justify-between p-4 ${
            theme === 'default' ? 'bg-white' : 'bg-black'
          }`}>
          <Image
            className="h-8 w-16"
            source={require('../../assets/images/logo.png')}
          />
          <TouchableOpacity>
            <View
              className={`${
                theme === 'dark' ? 'bg-white/[0.2]' : 'bg-gray-300'
              } rounded-full w-8 h-8 flex-row items-center justify-center relative mr-1`}>
              <View className="w-2 h-2 bg-red-500 absolute rounded-full top-0 right-0"></View>
              <Feather
                name="bell"
                size={16}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* /Top Bar */}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row mb-2 mt-2 p-4 pt-1 pb-0">
            <TouchableOpacity className="mr-3" onPress={() => {setActiveTab(0);setVisitStatus('')}}>
              <Text
                className="text-black m-0"
                style={
                  activeTab == 0
                    ? {...defaultTheme.customTabsActive}
                    : {...defaultTheme.customTabs}
                }>
                All
              </Text>
              <Text
                className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md"
                style={
                  activeTab == 0
                    ? {...defaultTheme.primaryBackgroundColor}
                    : {backgroundColor: 'transparent'}
                }></Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={() => {setActiveTab(1);setVisitStatus('pending')}}>
              <Text
                className="text-black m-0"
                style={
                  activeTab == 1
                    ? {...defaultTheme.customTabsActive}
                    : {...defaultTheme.customTabs}
                }>
                Pending
              </Text>
              <Text
                className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md"
                style={
                  activeTab == 1
                    ? {...defaultTheme.primaryBackgroundColor}
                    : {backgroundColor: 'transparent'}
                }></Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={() => {setActiveTab(2);setVisitStatus('accepted')}}>
              <Text
                className="text-black m-0"
                style={
                  activeTab == 2
                    ? {...defaultTheme.customTabsActive}
                    : {...defaultTheme.customTabs}
                }>
                Accepted
              </Text>
              <Text
                className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md"
                style={
                  activeTab == 2
                    ? {...defaultTheme.primaryBackgroundColor}
                    : {backgroundColor: 'transparent'}
                }></Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={() => {setActiveTab(3);setVisitStatus('rejected')}}>
              <Text
                className="text-black m-0"
                style={
                  activeTab == 3
                    ? {...defaultTheme.customTabsActive}
                    : {...defaultTheme.customTabs}
                }>
                Rejected
              </Text>
              <Text
                className="text-black text-center font-bold text-xlflex-row items-start h-1 rounded-md"
                style={
                  activeTab == 3
                    ? {...defaultTheme.primaryBackgroundColor}
                    : {backgroundColor: 'transparent'}
                }></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Posts */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Tabs  */}
          <View className="mb-48 p-4 pt-2">
            <ListTab activeTab={0} vistData={vistData} pending={pending} />
            <ListTab activeTab={1} vistData={vistData} pending={pending} />
            <ListTab activeTab={2} vistData={vistData} pending={pending} />
          </View>
          {/* Tabs  */}
        </ScrollView>
        {/* /Posts */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;


const ListTab = ({activeTab, vistData, pending}) => {
  return(
    <>
    {activeTab === 0 && (
      <View>
        {
          !pending?
          vistData&&vistData.length > 0 ? 
          vistData.map((item, index) => {
            return(
              <VisitCard item={item} key={index} />
            )
          })
          : <View className="bg-white flex-1  p-4 rounded-lg">
            <Text className="text-center">No Record Found</Text>
        </View>
          :<View className="bg-white flex-1  p-4 rounded-lg">
            <ActivityIndicator size="large" color="#337ab7" />
          </View>
        }
      </View>
    )}
    </>
  )
}