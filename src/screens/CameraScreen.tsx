import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Image, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { ImageInterface } from './types';

interface CameraScreenProps {
  navigation: any;
  route: any;
}

const CameraScreen: React.FC<CameraScreenProps> = ({navigation, route}) => {
  const { mode } = route.params;
  const { hand } = route.params;
  const { listImage } = route.params;
  const cameraRef = useRef<any>();
  const [images, setImages] = useState<ImageInterface[]>(listImage);
  const windowHeight = Dimensions.get('window').height;
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const imageResult = {
        path: data.uri,
        width: data.width / 5,
        height: data.height / 5,
      };
      
      setImages(images => [...images, imageResult]);
    }
  };
  const goToImageView = () => {
    navigation.navigate('MainScreen', {
      images: images,
      hand: hand,
    });
  };


  return (
    <View className="bg-blue-200 w-full h-full ">

      {images.length > 0 && (
        <View
        style={{
          zIndex: 1,
        }}
        className="bg-red-300 absolute w-full bottom-[750px] right-0 h-full">
            <Image
              source={{uri: images[images.length - 1].path}}
              className="absolute border-white w-full h-full"
            />
        </View>
      )}
      <View
        style={{
          zIndex: 0,
          bottom: 0,
          height: windowHeight,
        }}
        className="bg-green-300">
        <RNCamera
          ref={cameraRef}
          className="flex flex-1"
          type={RNCamera.Constants.Type.back}
          captureAudio={true}>
          <View className="h-full w-full">
            <TouchableOpacity
              onPress={takePicture}
              style={{
                bottom: images.length > 0 ? 160 : 70,
              }}
              className="absolute bg-white border-black border-4 h-20 w-20 self-center rounded-full"
            />
            {images.length > 0 && (
              <TouchableOpacity
                onPress={goToImageView}
                className="absolute bottom-[280px] self-center p-[10px] rounded-[10px] bg-blue-300">
                <Text style={{fontSize: 30}} className=" text-white ">
                  Done
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </RNCamera>
      </View>
    </View>
  );
};

export default CameraScreen;