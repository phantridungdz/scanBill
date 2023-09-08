/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Share,
  Text,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Menu, IconButton} from '../components';
import {useMode} from '../context/ModeContext';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {ICONS} from '../constants/constants';
import {DragTextEditor, DragTextRef} from 'react-native-drag-text-editor';
import {ImageInterface} from './types';
import ImagePicker from 'react-native-image-crop-picker';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
interface MainScreenProps {
  navigation: any;
  route: any;
}

const MainScreen: React.FC<MainScreenProps> = ({navigation, route}) => {
  const {hand} = route.params;
  const {images} = route.params;
  const {isHorizontal} = route.params;
  const {mode, toggleMode} = useMode();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [totalHeight, setTotalHeight] = useState<number>(0);
  const [topShotView, setTopShotView] = useState<number>(0);
  const [bottomShotView, setBottomShotView] = useState<number>(0);
  const [leftShotView, setLeftShotView] = useState<number>(0);
  const [rightShotView, setRightShotView] = useState<number>(0);
  const [viewShotHeight, setViewShotHeight] = useState<number>(0);
  const [viewShotWidth, setViewShotWidth] = useState<number>(
    Dimensions.get('screen').width,
  );
  const [zoomParentScale, setZoomParentScale] = useState<number>(0);
  const [listImage, setListImage] = useState<ImageInterface[]>(images || []);
  const viewShotRef = useRef<ViewShot>(null);
  const DragTextEditorRef = useRef<DragTextRef | any>([]);

  const saveImage = async () => {
    listImage.map((el, i) =>
      DragTextEditorRef.current[i].setBorderStatus(false),
    );

    await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

    const uri = await captureRef(viewShotRef, {
      format: 'png',
    });

    ImagePicker.openCropper({
      path: uri,
      height: 100,
      width: 100,
      freeStyleCropEnabled: true,
      compressImageQuality: 1,
      compressImageMaxWidth: 100,
      compressImageMaxHeight: 100,
      mediaType: 'photo',
    }).then(async image => {
      await Share.share({title: 'image', url: uri});
    });
  };
  const manageActiveStatus = (_index: number) => {
    if (isOpen) {
      setIsOpen(false);
    }
    setActiveIndex(_index);
  };
  const openGallery = () => {
    setIsOpen(false);
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: false,
      cropping: false,
      compressImageQuality: 1,
      freeStyleCropEnabled: true,
      width: Dimensions.get('screen').width,
      mediaType: 'photo',
    })
      .then(response => {
        if (!response || response.length === 0) {
          return;
        }

        const updatedImages: ImageInterface[] = response.map(image => ({
          path: image.path,
          width: image.width || 0,
          height: image.height || 0,
        }));

        setListImage([...listImage, ...updatedImages]);
        // const totalHeightSum = updatedImages.reduce((sum, image) => sum + image.height, 0);
        // setTotalHeight(totalHeight + updatedImages[0].height);
        const scale = Dimensions.get('screen').width / updatedImages[0].width;
        console.log(updatedImages[0].height * scale);
        if (updatedImages[0].height * scale > viewShotHeight) {
          setViewShotHeight(updatedImages[0].height * scale);
        }
        setTotalHeight(totalHeight + updatedImages[0].height);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const deleteImage = (index: number) => {
    const updatedImages = [...listImage];
    updatedImages.splice(index, 1);
    setListImage(updatedImages);
  };
  const handleOpenCloseMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };
  const cropImage = () => {
    listImage.map((el, i) =>
      DragTextEditorRef.current[i].setBorderStatus(false),
    );
    if (listImage[activeIndex] !== undefined) {
      ImagePicker.openCropper({
        compressImageQuality: 1,
        freeStyleCropEnabled: true,
        height: listImage[activeIndex]?.height,
        width: listImage[activeIndex]?.width,
        path: listImage[activeIndex]?.path,
        mediaType: 'photo',
      })
        .then(image => {
          const updatedImages = [...listImage];
          const croppedWidth =
            image.cropRect?.width || updatedImages[activeIndex].width;
          const croppedHeight =
            image.cropRect?.height || updatedImages[activeIndex].height;
          const croppedWidthPart = croppedWidth / 5;
          const croppedHeightPart = croppedHeight / 5;
          updatedImages[activeIndex] = {
            ...updatedImages[activeIndex],
            path: `file://${image.path}`,
            width: croppedWidthPart,
            height: croppedHeightPart,
          };
          setListImage(updatedImages);
        })
        .catch(error => {
          console.log('not pick', error);
        });
    } else {
      return;
    }
  };
  const _cornerComponents = [
    {
      side: 'TR',
      customCornerComponent: () => (
        <IconButton
          onPress={() => deleteImage(activeIndex)}
          iconName={ICONS.CLOSE_ICON}
        />
      ),
    },
    {
      side: 'TL',
      customCornerComponent: () => <IconButton iconName={ICONS.TAB_ICON} />,
    },
  ];
  const _rotateComponent = {
    side: 'bottom',
    customRotationComponent: () => <IconButton iconName={ICONS.ROTATE_ICON} />,
  };
  const _resizerSnapPoints = ['right', 'left'];
  useEffect(() => {
    if (route.params?.images.length >= 1) {
      route.params.images = [];
      setListImage(images);
    }
  }, [route.params?.images]);

  return (
    <View
      className="w-full h-full"
      style={{backgroundColor: mode ? 'black' : 'white'}}>
      <View
        className="absolute top-10 left-0 right-0 justify-center"
        style={{
          zIndex: 1,
        }}>
        <View className="absolute left-[10p] top-0">
          <TouchableOpacity
            className={`p-[10px] w-full rounded-full self-start`}
            onPress={() => navigation.replace('HomeScreen', {hand: 'left'})}>
            <Image
              className="object-cover w-[40px] h-[40px] blur-md invert drop-shadow-xl shadow-white"
              source={
                mode
                  ? require('../assets/closenight.png')
                  : require('../assets/close.png')
              }
            />
          </TouchableOpacity>
        </View>
        <View className="absolute right-[10px] top-0"></View>
      </View>
      {/* <View
        style={{
          // backgroundColor: 'green',
          margin: 'auto',
          minHeight: 100,
          height: Dimensions.get('screen').height,
        }}
        className="flex justify-center items-center border-[1px]"> */}
      <View className="h-full w-full z-[-1] absolute top-[30px]">
        <ReactNativeZoomableView
          maxZoom={2}
          minZoom={0.2}
          zoomStep={0.05}
          initialZoom={1}
          disablePanOnInitialZoom={true}
          bindToBorders={true}
          doubleTapZoomToCenter={false}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            margin: 'auto',
            padding: 10,
          }}>
          <ViewShot
            ref={viewShotRef}
            style={{
              flex: 1,
              backgroundColor: 'gray',
              position: 'absolute',
              top: topShotView,
              bottom: bottomShotView,
              right: rightShotView,
              left: leftShotView,
            }}>
            <View
              style={{
                flex: 1,
                // marginTop: -topShotView,
                // top: -(viewShotHeight),
                // position: 'relative',
                // height: (Dimensions.get('screen').height),
                // width: Dimensions.get('screen').width
                // height: viewShotHeight,
                // width: viewShotWidth,
              }}>
              <View
                className={` ${
                  isHorizontal ? 'flex flex-row' : 'items-center'
                } `}>
                <GestureHandlerRootView style={{flex: 1}}>
                  {listImage.map((item, index) => (
                    <DragTextEditor
                      key={index}
                      visible={item.visible}
                      ref={ref => (DragTextEditorRef.current[index] = ref)}
                      onItemActive={() => manageActiveStatus(index)}
                      externalBorderStyles={_exampleStyles.externalBorder}
                      placeholder={'Placeholder'}
                      cornerComponents={_cornerComponents}
                      resizerSnapPoints={_resizerSnapPoints}
                      rotationComponent={_rotateComponent}
                      width={Dimensions.get('screen').width}
                      height={
                        item.height /
                        (item.width / Dimensions.get('screen').width)
                      }
                      scaleParentZoom={zoomParentScale}
                      // defX={isHorizontal ? Dimensions.get('screen').width  * index / 2 : -100}
                      // defY={isHorizontal ? 200 : (Dimensions.get('screen').height * index / 2)}
                      // defX={
                      //   isHorizontal
                      //     ? Dimensions.get('screen').width * index
                      //     : -(Dimensions.get('screen').width / 2)
                      // }
                      // defY={
                      //   isHorizontal
                      //     ? 200
                      //     : (Dimensions.get('screen').height * 0) / 2
                      // }
                      defX={-(Dimensions.get('screen').width / 2)}
                      defY={Dimensions.get('screen').height / 2}
                      viewShotWidth={viewShotWidth}
                      viewShotHeight={viewShotHeight}
                      setViewShotWidth={setViewShotWidth}
                      setViewShotHeight={setViewShotHeight}
                      topShotView={topShotView}
                      rightShotView={rightShotView}
                      leftShotView={leftShotView}
                      bottomShotView={bottomShotView}
                      setTopShotView={setTopShotView}
                      setRightShotView={setRightShotView}
                      setLeftShotView={setLeftShotView}
                      setBottomShotView={setBottomShotView}
                      item={item}
                    />
                  ))}
                </GestureHandlerRootView>
              </View>
            </View>
          </ViewShot>
        </ReactNativeZoomableView>

        {/* </ScrollView> */}
      </View>
      <View
        className={`absolute bottom-20 ${hand === 'right' ? 'self-end' : ''}`}>
        <Menu
          hand={hand}
          mode={mode}
          cropImage={cropImage}
          openGallery={openGallery}
          handleOpenCloseMenu={handleOpenCloseMenu}
          isOpen={isOpen}
          saveImage={saveImage}
          navigation={navigation}
          setIsOpen={setIsOpen}
          listImage={listImage}
        />
      </View>
    </View>
  );
};
const _exampleStyles = StyleSheet.create({
  gestureRootStyles: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    backgroundColor: '#fff',
    flex: 3,
  },
  externalBorder: {
    borderStyle: 'dashed',
    borderColor: 'gray',
  },
  editorContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  addTextButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontOptions: {
    margin: 2,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  colorOptions: {
    margin: 4,
    flex: 1,
    padding: 20,
    borderRadius: 10,
  },
});

export default MainScreen;
