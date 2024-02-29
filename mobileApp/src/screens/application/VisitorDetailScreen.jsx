import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {color} from '../../style/color';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {commonDarkStyle, commonStyle} from '../../style/style';
import KeyValue from '../../components/KeyValue';

const primaryColor = '#024f9e';
const secondaryColor = '#74b212';
const gray = '#ccd3db';

const dummuText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum like Aldus PageMaker including versions of Lorem Ipsum";

// const Card = () => {
//   const navigation = useNavigation();
//   const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
//   const theme = useSelector(state=>state.theme.value);
//   useEffect(()=>{
//     setDefaultTheme(theme === 'default'? commonStyle : commonDarkStyle );
//   },[theme]);
//   return(

//   )
// }

const VisitorDetailScreen = () => {
  const navigation = useNavigation();
  const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
  const theme = useSelector(state => state.theme.value);
  useEffect(() => {
    setDefaultTheme(theme === 'default' ? commonStyle : commonDarkStyle);
  }, [theme]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: 'Visit Detail',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{padding: 18, paddingRight: 4}}>
          <Feather
            name="arrow-left"
            size={16}
            color={theme === 'dark' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
    });
  });

  return (
    <View
      className={`h-screen ${
        theme === 'dark' ? 'bg-black/[0.9]' : 'bg-white'
      }`}>
      <View
        className={`flex-row items-center ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{padding: 18, paddingRight: 4}}>
          <Feather
            name="arrow-left"
            size={16}
            color={theme === 'dark' ? '#f5f5f5' : '#000'}
          />
        </TouchableOpacity>
        <Text
          className={`mx-3 text-xl ${
            theme === 'dark' ? 'text-white/[0.8]' : 'text-black'
          }`}>
          Visitor Detail
        </Text>
      </View>
      <View className="p-4 flex-1">
        <View
          className={`w-full mb-4 rounded-xl p-4 pt-1 pb-0    ${
            theme === 'dark' ? 'bg-black' : 'bg-white'
          }`}>
          {/* <TouchableOpacity onPress={()=>navigation.navigate('VisitDetail')}> */}
          <View className="flex items-center">
            <View className="">
              <Image
                className="w-24 h-24 rounded-lg"
                source={require('../../assets/images/visitors/img1.png')}
              />
            </View>
            <View className="">
              <View className="mt-6">
                <KeyValue title="Visitor Name" value="Abhishek Raj" />
                <KeyValue title="Person To Meet" value="Sujit Kumar Shaw" />
                <KeyValue title="Purpose" value="Testing" />
                <KeyValue title="Date Of Visit" value="28/02/2024" />
                <KeyValue title="Visit Status" value="Pending" />
              </View>
            </View>
          </View>

          {/* </TouchableOpacity> */}
          {/* <View className="mt-3 mb-3" style={{borderBottomWidth:1, borderBlockColor:`${theme=== "dark"?"#27282d":gray}`}}/> */}
        </View>
      </View>

      <View className="flex items-center">
      <View
          className={`w-2/3 mb-4 rounded-xl p-4`}>
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
            <Feather name="printer" size={16} />
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    </View>
  );
};

export default VisitorDetailScreen;
