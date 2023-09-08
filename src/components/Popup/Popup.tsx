import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {PopupProps} from './types';

const Popup: React.FC<PopupProps> = ({mode, hand, closePopup, navigateMain}) => {
  const goMain = (checkIsHorizontal:boolean) => {
    navigateMain(checkIsHorizontal);
  }
  return (
    <View className=" absolute bg-blue-300 h-[250px] w-[340px] rounded-[10px] border-[1px]">
      <TouchableOpacity onPress={() => closePopup()} className="w-[35px] h-[35px] bg-white border-[0.5px] rounded-full absolute -top-[17px] -left-[17px]">
        <Image
          className="object-cover w-[35px] h-[35px] blur-md invert drop-shadow-xl shadow-white"
          source={mode ? require('../../assets/closenight.png') : require('../../assets/close.png')}
        />
      </TouchableOpacity>
      <View className="flex flex-row pt-[20px] justify-center">
        <TouchableOpacity onPress={()=> goMain(false)} className={`flex items-center mx-[10px] w-[150px] h-[150px] rounded-[10px] ${mode ? 'bg-blue-300' : 'bg-white'}`}>
          <Image
            className="w-[25px] h-[25px] p-5 mt-[20px] transform"
            source={require('../../assets/vertical-resize.png')}
          />
          <Text className={`mt-[20px] text-[20px] font-bold uppercase `}>Vertical</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> goMain(true)} className={`flex items-center mx-[10px] w-[150px] h-[150px] rounded-[10px] ${mode ? 'bg-blue-300' : 'bg-white'}`}>
          <Image
            className="w-[25px] h-[25px] mt-[20px] p-5"
            source={require('../../assets/horizontal-resize.png')}
          />
          <Text className={`mt-[20px] text-[20px] font-bold uppercase`}>Horizontal</Text>
        </TouchableOpacity>
      </View>
      <Text className={`mt-[10px] text-[20px] self-center font-bold uppercase text-center`}>Choose the placement direction</Text>
    </View>  
  )
}

export default Popup