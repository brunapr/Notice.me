import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Circle } from './styles';

export default function NewNote(props: any) {
  return (
    <Circle onPress={props.onPress}>
      <Icon name="feather" size={36} color="#151515" />
    </Circle>
  );
}