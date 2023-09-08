import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from './types';

const SvgIcon = ({stroke, d, width, height, fill, viewBox}: SvgIconProps) => {
  return (
    <Svg
      viewBox={viewBox}
      width={width}
      height={height}
      strokeWidth={1.5}
      stroke={stroke}>
      <Path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </Svg>
  );
};

export default SvgIcon;
