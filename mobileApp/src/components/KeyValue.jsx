import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const KeyValue = ({title, value}) => {
    const theme = useSelector(state=>state.theme.value);
    return (
        <Text className={` text-sm  mb-2 ${theme=== "dark"?"text-white/[0.7]":"text-black"}`}><Text className="font-semibold"> {title} </Text> : {value}</Text>
    )
}

export default KeyValue;