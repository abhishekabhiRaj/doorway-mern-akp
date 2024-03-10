import React, { useState, useEffect } from "react";
import { useStorage } from "./useStorage";
import { jwt_decode } from "jwt-decode-es";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export const useTokenExpiry = () => {
    const navigation = useNavigation();

    const [tokenExpiry, setTokenExpiry] = useState(false);
    const [token, setToken] = useStorage('token', '');
    const [decodedJWT, setDecodedJWT] = useState(null);

    useEffect(() => {
        if (token) {
            let jwtDecode1 = jwt_decode(token);
            setDecodedJWT(jwtDecode1);
        }
    }, [token])

    useEffect(() => {
        if (decodedJWT) {
            var expTime = decodedJWT.exp - decodedJWT.iat;
            var expDT = new Date();
            expDT.setSeconds(expDT.getSeconds() + expTime);
            const intervalId = setInterval(() => {
                console.log(moment(expDT).diff(moment()));
                if (moment(expDT).diff(moment()) > 0) {
                    console.log("not expired")
                } else {
                    console.log("expired");
                    setTokenExpiry(true)
                    setToken();
                    navigation.navigate('Login');
                    clearInterval(intervalId);
                }
            }, 5000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [decodedJWT])
    return tokenExpiry;
}