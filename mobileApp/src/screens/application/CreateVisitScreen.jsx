import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import { color } from '../../style/color';
import { useSelector } from 'react-redux';
import { commonDarkStyle, commonStyle } from '../../style/style';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// library for camera 
import {launchCamera} from 'react-native-image-picker';
// library for camera gallery
import {launchImageLibrary} from 'react-native-image-picker';
// library for file picker
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const CreateVisitScreen = () => {
    const navigation = useNavigation();
    const [defaultTheme, setDefaultTheme] = useState(commonDarkStyle);
    const [formSteps, setFormSteps] = useState(0);

    const theme = useSelector(state => state.theme.value);
    useEffect(() => {
        setDefaultTheme(theme === 'default' ? commonStyle : commonDarkStyle);
    }, [theme]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });
    const [selectedImage, setSelectedImage] = useState(null);


    // 
    const handleCameraLaunch = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
      
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            console.log(imageUri);
          }
        });
      }

    // file upload code
    const [selectedFile, setSelectedFile] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Check if the selected file is within the 5 MB limit
      const fileSize = await RNFS.stat(result.uri);
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (fileSize.size > maxSize) {
        console.log('File Size Limit Exceeded', 'Please select a file up to 5 MB.');
      } else {
        setSelectedFile(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        throw err;
      }
    }
  };
  const uploadFile = () => {
    // Implement your file upload logic here
    if (selectedFile) {
      // You can use the selectedFile.uri to get the file path for upload
      console.log('File Uploaded', `File ${selectedFile.name} has been uploaded successfully.`);
    } else {
        console.log('No File Selected', 'Please select a file to upload.');
    }
  };
    // file upload code

    const schema = yup.object().shape({
        visitor_name: yup.string().required('Visitor Name is required'),
        visitor_purpose: yup.string().required('Purpose is required'),
        visitor_mobile: yup.number().required('Visitor Name is required'),
        visitor_email: yup.string().required('Visitor Email is required').email('Invalid email'),
        visitor_address: yup.string().required('Visitor Address is required'),
        visit_date: yup.string().required('Date Of Visit is required'),

        ptm_name: yup.string().required('Person To Meet Name is required'),
        ptm_mobile: yup.number().required('Person To Meet Mobile is required'),
        ptm_email: yup.string().required('Person To Meet Email is required').email('Invalid email'),
        ptm_address: yup.string().required('Person To Meet Address is required'),
    });

    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            visitor_name: '',
            visitor_purpose: '',
            visitor_mobile: '',
            visitor_email: '',
            visitor_address: '',
            visit_date: '',
            ptm_name: '',
            ptm_mobile: '',
            ptm_email: '',
            ptm_address: '',
        },
    });

    return (
        <>
            <View className="flex-1 p-4">
                <View
                    className="flex-row justify-between bg-white p-4 rounded-lg"
                    style={{ elevation: 2 }}>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={() => {
                                setFormSteps(0);
                            }}>
                            <Text className="text-black text-xxl font-bold">Step 1</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View
                            className="h-1 w-14 rounded-sm"
                            style={{ backgroundColor: color.secondaryColor }}></View>
                        <TouchableOpacity
                            onPress={() => {
                                setFormSteps(1);
                            }}>
                            <Text className="text-black text-xxl font-bold px-5">Step 2</Text>
                        </TouchableOpacity>
                        <View
                            className="h-1 w-14 rounded-sm"
                            style={{ backgroundColor: color.secondaryColor }}></View>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={() => {
                                setFormSteps(2);
                            }}>
                            <Text className="text-black text-xxl font-bold text-right">
                                Step 3
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="p-4 bg-white rounded-lg mt-4" style={{ elevation: 2 }}>
                    {formSteps == 0 && (
                        <View>
                            <View className="mb-2">
                                <Text className="text-black mb-1">Visitor's Name <Text className="text-red-500">*</Text> </Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={{
                                                ...defaultTheme.defaultTextInput,
                                                ...defaultTheme.defaultMarginBottom,
                                                ...defaultTheme.defaultColor,
                                            }}
                                            //   value={''}
                                            onChangeText={onChange}
                                            placeholder="Enter Visitor's Name"
                                            placeholderTextColor="gray"
                                        />
                                    )}
                                    name="visitor_name"
                                />
                                {errors.visitor_name && (
                                    <Text style={{ color: 'red', marginBottom: 8 }}>
                                        {errors.visitor_name.message}
                                    </Text>
                                )}
                            </View>
                            <View className="mb-2">
                                <Text className="text-black mb-1">Visitor's Email <Text className="text-red-500">*</Text> </Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={{
                                                ...defaultTheme.defaultTextInput,
                                                ...defaultTheme.defaultMarginBottom,
                                                ...defaultTheme.defaultColor,
                                            }}
                                            onChangeText={onChange}
                                            placeholder="Email"
                                            placeholderTextColor="gray"
                                        />
                                    )}
                                    name="email"
                                />
                                {errors.email && (
                                    <Text style={{ color: 'red', marginBottom: 8 }}>
                                        {errors.email.message}
                                    </Text>
                                )}
                            </View>
                            <View className="mb-2">
                                <Text className="text-black mb-1">Visitor's Purpose <Text className="text-red-500">*</Text> </Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={{
                                                ...defaultTheme.defaultTextInput,
                                                ...defaultTheme.defaultMarginBottom,
                                                ...defaultTheme.defaultColor,
                                            }}
                                            onChangeText={onChange}
                                            placeholder="Enter Visit Purpose..."
                                            placeholderTextColor="gray"
                                        />
                                    )}
                                    name="visitor_purpose"
                                />
                                {errors.visitor_purpose && (
                                    <Text style={{ color: 'red', marginBottom: 8 }}>
                                        {errors.visitor_purpose.message}
                                    </Text>
                                )}
                            </View>
                            <View className="mb-2">
                                <Text className="text-black mb-1">Visitor's Mobile <Text className="text-red-500">*</Text> </Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={{
                                                ...defaultTheme.defaultTextInput,
                                                ...defaultTheme.defaultMarginBottom,
                                                ...defaultTheme.defaultColor,
                                            }}
                                            onChangeText={onChange}
                                            placeholder="Enter Visitor's Mobile..."
                                            placeholderTextColor="gray"
                                        />
                                    )}
                                    name="visitor_mobile"
                                />
                                {errors.visitor_mobile && (
                                    <Text style={{ color: 'red', marginBottom: 8 }}>
                                        {errors.visitor_mobile.message}
                                    </Text>
                                )}
                            </View>
                            <View className="mb-2">
                                <Text className="text-black mb-1">Visitor's Address <Text className="text-red-500">*</Text> </Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            style={{
                                                ...defaultTheme.defaultTextInput,
                                                ...defaultTheme.defaultMarginBottom,
                                                ...defaultTheme.defaultColor,
                                            }}
                                            onChangeText={onChange}
                                            placeholder="Enter Visitor's Mobile..."
                                            placeholderTextColor="gray"
                                        />
                                    )}
                                    name="visitor_mobile"
                                />
                                {errors.visitor_mobile && (
                                    <Text style={{ color: 'red', marginBottom: 8 }}>
                                        {errors.visitor_mobile.message}
                                    </Text>
                                )}
                            </View>
                        </View>
                    )}
                    {formSteps == 1 &&
                        <View>
                            <Text className="text-black" onPress={()=>handleCameraLaunch()}>Open Camera</Text>
                      </View>
                    }
                    {formSteps == 2 && <Text className="text-black">Step 3</Text>}
                </View>
            </View>
        </>
    );
};

export default CreateVisitScreen;
