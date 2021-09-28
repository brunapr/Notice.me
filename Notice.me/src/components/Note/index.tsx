import React from 'react';
import { View } from 'react-native';
import { NoteContainer, Title, Description, Bottom, Tag, Name, Buttons } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Note(props: any) {

  let tag = props.tag;
  let status = props.status;
  let id = props.id;

  return (
    <NoteContainer
      onPress={() => { props.setId(id); props.edit(true) }}
      onLongPress={() => { props.setId(id); props.delete(true) }}>
      {
        props.title != "" &&
        <Title>{props.title}</Title>
      }
      {
        props.title != "" && props.description != "" &&
        <View style={{ marginBottom: 12 }} />
      }
      {
        props.description != "" &&
        <Description numberOfLines={7}>{props.description}</Description>
      }
      <Bottom>
        <Buttons>
          {status == '1' ?
            <Icon name="heart" size={22} color="#FFCD92" style={{ marginRight: 10 }} />
            : <Icon name="heart" size={22} color="#323B3F" style={{ marginRight: 10 }} />
          }
        </Buttons>
        {
          tag != "No tag" &&
          <Tag style={{ shadowColor: '#fff', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.8, }}>
            <Name numberOfLines={1}>{tag}</Name>
          </Tag>
        }
      </Bottom>
    </NoteContainer>
  );
}