import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {MenuProps} from './types';

const Menu: React.FC<MenuProps> = ({hand, mode, cropImage, openGallery, handleOpenCloseMenu, isOpen, saveImage, setIsOpen, listImage, navigation}) => {
  const gotoCamera = () => {
    setIsOpen(false);
    navigation.push('CameraScreen', { listImage: listImage, mode: mode, hand: hand })
  }
  return (
    <>
    <View 
      className={`w-[200px] h-[170px] pt-[10px] bg-blue-400 bottom-[50px] rounded-[20px] ${hand === 'left' ? 'left-[20px]' : 'right-[20px]'} ${!isOpen ? 'hidden' : ''}`}
      style={{ zIndex: 1}}  
    >
      <TouchableOpacity 
        onPress={() => handleOpenCloseMenu()}
        className={`absolute rounded-full border-[1px] ${mode ? 'bg-blue-950 border-white' : 'bg-white'} -top-[20px] ${hand === 'left' ? '-right-[30px]' : '-left-[30px]'}`}
      >
        <Image
          className="object-cover w-[40px] h-[40px] blur-md invert drop-shadow-xl shadow-white"
          source={mode ? require('../../assets/closenight.png') : require('../../assets/close.png')}
        />
      </TouchableOpacity>
      <View className="px-[20px] py-[10px]">
        <TouchableOpacity onPress={() => openGallery()} className=" flex-row items-center p-[5px] rounded-[10px] bg-blue-200">
          <Image
            className="object-cover w-[40px] h-[40px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../../assets/gallery.png')}
          />
          <Text className="text-[20px] pl-[15px] font-bold">Gallery</Text>
        </TouchableOpacity>
      </View>
      <View className="px-[20px] py-[10px]">
        <TouchableOpacity onPress={() => gotoCamera()} className=" flex-row items-center p-[5px] rounded-[10px] bg-blue-200">
          <Image
            className="object-cover w-[40px] h-[40px] ml-[5px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../../assets/photo-camera.png')}
          />
          <Text className="text-[20px] pl-[15px] font-bold">Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity 
      onPress={() => saveImage()}
      className={`absolute bottom-[140px]  ${hand === 'left' ? 'left-[40px]' : 'right-[20px]'} ${listImage.length === 0 ? 'hidden' : ''}`}
    >
      <View 
        className={`p-[10px] rounded-full -bottom-[20px] self-end bg-blue-400 border-[2px] right-[20px] ${mode ? 'bg-blue-950 border-white' : 'bg-blue-950'} `}>
        <Image
            className="object-cover w-[30px] h-[30px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../../assets/download.png')}
          />
      </View>
    </TouchableOpacity>
    <TouchableOpacity 
      onPress={() => saveImage()} 
      className={`absolute bottom-[140px]  ${hand === 'left' ? 'left-[40px]' : 'right-[20px]'} ${listImage.length === 0 ? 'hidden' : ''}`}
    >
      <View 
        className={`p-[10px] rounded-full -bottom-[20px] self-end bg-blue-400 border-[2px] right-[20px] ${mode ? 'bg-blue-950 border-white' : 'bg-blue-950'} `}>
        <Image
            className="object-cover w-[30px] h-[30px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../../assets/download.png')}
          />
      </View>
    </TouchableOpacity>
    <TouchableOpacity 
      onPress={() => cropImage()} 
      className={`absolute bottom-[70px]  ${hand === 'left' ? 'left-[40px]' : 'right-[20px]'} ${listImage.length === 0 ? 'hidden' : ''}`}
      
    >
      <View 
        className={`p-[10px] rounded-full -bottom-[20px] self-end bg-blue-400 border-[2px] right-[20px] ${mode ? 'bg-blue-950 border-white' : 'bg-blue-950'} `}>
        <Image
            className="object-cover w-[30px] h-[30px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../../assets/crop.png')}
          />
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleOpenCloseMenu()} className={`absolute bottom-0  ${hand === 'left' ? 'left-[40px]' : 'right-[20px]'}`}>
      <View 
        className={`p-[10px] rounded-full -bottom-[20px] self-end bg-blue-400 border-[2px] right-[20px] ${mode ? 'bg-blue-950 border-white' : 'bg-blue-950'} `}>
        <Image
            className="object-cover w-[30px] h-[30px] blur-md invert drop-shadow-xl shadow-white"
            source={require('../../assets/add-image.png')}
          />
      </View>
    </TouchableOpacity>
   
    </>
    
  )
}

export default Menu