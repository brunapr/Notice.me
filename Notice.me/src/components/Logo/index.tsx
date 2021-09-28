import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LogoStyle } from './styles';

export default function Logo() {
  return (
    <LogoStyle>
      <Image
        style={{
          resizeMode: "contain",
          height: 100,
          width: 200
        }}
        source={require('../../../assets/notice.me.png')} />
    </LogoStyle>
  );
}