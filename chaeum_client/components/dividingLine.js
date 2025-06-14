import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';

export default function DividerShadow() {
  return (
    <Svg width="100%" height="30">
      <Defs>
        <RadialGradient
          id="shadow"
          cx="50%" cy="40%" r="80%"
          fx="50%" fy="0%"
        >
          <Stop offset="0%" stopColor="#ccc" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Ellipse
        cx="50%"
        cy="0"
        rx="150"
        ry="20"
        fill="url(#shadow)"
      />
    </Svg>
  );
}
