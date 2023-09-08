import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import SvgIcon from './SvgIcon/SvgIcon';
import {IconButtonProps} from './types';

const IconButton = ({onPress, iconName}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={IconButtonStyles.buttonStyles}>
      <SvgIcon
        height={16}
        width={16}
        viewBox="0 0 25 25"
        stroke={'black'}
        d={iconName}
      />
    </TouchableOpacity>
  );
};

const IconButtonStyles = StyleSheet.create({
  buttonStyles: {
    padding: 5,
    marginTop: -3,
    marginLeft: -3,
    marginRight: -3,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default IconButton;
