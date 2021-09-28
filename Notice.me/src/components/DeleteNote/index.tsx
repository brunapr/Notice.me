import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/auth';
import { Black, Title } from '../../screens/CreateNote/styles';
import { AlertContainer, Bottom, Button, Uppercase, Header, Message } from '../Alert/styles';

export default function DeleteNote(props: any) {

  const Auth = useContext(AuthContext);

  function handleDeleteNote(id: number) {
    const list = props.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == props.id) {
        list.splice(i, 1)
      }
    }
    Auth.setNotes(list.reverse())
    const notes = JSON.stringify(Auth.notes);
    AsyncStorage.setItem("notes", notes)
    props.setToastType(2);
    props.setToast(true);
    props.close(false)
  }

  return (
    <Black>
      <AlertContainer>
        <Header>
          <Title>Alert ✋</Title>
          <Message>Are you sure you want to delete this note?</Message>
        </Header>
        <Bottom>
          <Button onPress={() => { props.close(false) }}>
            <Uppercase style={{ color: '#f2f2f28d' }}>No</Uppercase>
          </Button>
          <Button onPress={() => { handleDeleteNote(props.id) }}>
            <Uppercase>Yes</Uppercase>
          </Button>
        </Bottom>
      </AlertContainer>
    </Black>
  );
}