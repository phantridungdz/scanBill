import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Slider from '../Slider/Slider';
import {fonts, textColors} from '../../constants/constants';
import {useExampleContext} from '../../hooks/useExampleContext';
import {EditorTypes} from './types';

const Editor = ({editTextsArray, editFontSize, addNewText}: EditorTypes) => {
  const {sharedSliderValue} = useExampleContext();

  return (
    <View style={_exampleStyles.editorContainer}>
      <View style={{flexDirection: 'row'}}>
        {textColors.map((item, index) => (
          <TouchableOpacity
            onPress={() => editTextsArray('color', item)}
            style={[_exampleStyles.colorOptions, {backgroundColor: item}]}
            key={index}></TouchableOpacity>
        ))}
      </View>
      <View style={{flexDirection: 'row'}}>
        {fonts.map((item, index) => (
          <TouchableOpacity
            onPress={() => editTextsArray('fontFamily', item)}
            style={_exampleStyles.fontOptions}
            key={index}>
            <Text style={{fontSize: 12, fontFamily: item}}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Slider onEnded={() => editFontSize(sharedSliderValue.value)}></Slider>
      <TouchableOpacity
        onPress={() => addNewText()}
        style={_exampleStyles.addTextButton}>
        <Text>Add Text</Text>
      </TouchableOpacity>
    </View>
  );
};

const _exampleStyles = StyleSheet.create({
  gestureRootStyles: {
    ...StyleSheet.absoluteFillObject,
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

export default Editor;
