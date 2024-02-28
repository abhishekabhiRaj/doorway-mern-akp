const { TouchableOpacity } = require("react-native")
const { Image } = require("react-native")
const { View } = require("react-native")
import Feather from 'react-native-vector-icons/Feather';



const Topbar = () => {
    return(
        <View className="flex-row items-center justify-between a">
        <Image
          className="h-8 w-36"
          source={require('../assets/images/logo.png')} />
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
    )
}


export default Topbar;


