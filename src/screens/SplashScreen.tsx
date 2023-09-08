import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useMode } from '../context/ModeContext';


interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const { mode, toggleMode } = useMode();
  const openHome = () => {
    navigation.replace("HomeScreen");
  };

  useEffect(() => {
    const splash = setTimeout(() => {
      openHome();
    }, 1500);

    return () => {
      clearTimeout(splash);
    };
  }, []);
  return (
    <View 
      className="w-full h-full"
      style={{ backgroundColor: mode ? 'black' : 'white' }}
    >
      <SafeAreaView>
        <View className="flex items-center py-[150px] ">
          <Image
            className="object-cover w-[300px] h-[300px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../assets/scan_bill.png')}  
          />
        </View>
        <View className="flex items-center h-full rounded-t-[40px] bg-blue-500">
          <Text className="text-white mt-[20px] text-[30px] p-[20px]">Take your long bills</Text>
          <View className="bg-blue-400 rounded-[20px] mt-[20px]">
            <Text className="text-gray-600 text-center p-10 font-bold">
              Take your long bill, document or connect them in a better and easy way
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SplashScreen