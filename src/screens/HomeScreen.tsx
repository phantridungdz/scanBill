import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useMode } from '../context/ModeContext';
import { Popup } from '../components';
interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const { mode, toggleMode } = useMode();
  const [hand, setHand] = useState<string>('right');
  const [showPopUp, setShowPopup] = useState<boolean>(false);
  const openPopup = (handSet: string) => {
    setHand(handSet)
    setShowPopup(true)
  }
  const closePopup = () => {
    setShowPopup(false);
  }
  const navigateMain = (isHorizontal:boolean) => {
    navigation.replace("MainScreen", { hand: hand, isHorizontal: isHorizontal, images: [] })
  }
  return (
  <View 
    className="w-full h-full"
    style={{ backgroundColor: mode ? 'black' : 'white' }}
  >
    <View className="flex items-center py-[10px] mt-[160px]">
      <Image
        className="object-cover w-[200px] h-[200px] blur-md invert drop-shadow-xl shadow-white"
        source={require('../assets/scan_bill.png')}  
      />
    </View>
    <View 
      className={`flex items-center h-full rounded-t-[40px] ${mode ? 'bg-blue-950' : 'bg-blue-400'}`}
    >
      <Text className={`mt-[40px] text-[25px] font-bold p-[20px] uppercase ${mode ? 'text-white' : ''}`}>Choose Your preferred hand</Text>
      <View
        className={`flex flex-row justify-center p-[20px] absolute left-10 right-10 top-[150px] rounded-[40px] ${mode ? 'bg-blue-450' : 'bg-blue-500'}`}
      >
        <TouchableOpacity onPress={()=> navigateMain(false)} className={`flex items-center mx-[10px] p-[40px] rounded-[10px] ${mode ? 'bg-blue-300' : 'bg-white'}`}>
          <Image
            className="w-[25px] h-[25px] p-5 transform"
            source={require('../assets/swipe-left.png')}
          />
          <Text className={`mt-[20px] text-[20px] font-bold uppercase `}>left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigateMain(false)} className={`flex items-center mx-[10px] p-[40px] rounded-[10px] ${mode ? 'bg-blue-300' : 'bg-white'}`}>
          <Image
            className="w-[25px] h-[25px] p-5"
            source={require('../assets/swipe-right.png')}
          />
          <Text className={`mt-[20px] text-[20px] font-bold uppercase`}>right</Text>
        </TouchableOpacity>
      </View>
    </View>
    {/* popup */}
    <View className={`absolute w-full h-full justify-center items-center ${showPopUp ? 'flex' : 'hidden'}`}>
      <Popup 
        hand={hand} 
        mode={mode} 
        closePopup={closePopup} 
        navigateMain={navigateMain}
        openPopup={function (): void {
          throw new Error('Function not implemented.');
        } }
      />
    </View>
  </View>
  )
}

export default HomeScreen