import React, { useEffect, useState } from 'react';
import { Black, Title } from '../../screens/CreateNote/styles';
import { AlertContainer, Bottom, Button, Uppercase, Header, Message } from './styles';

export default function Alert(props: any) {

  const [message, setMessage] = useState("");

  function ChangeMessage() {
    switch (props.type) {
      case 1:
        return setMessage('Name cannot be empty.');
      case 2:
        return setMessage("Title and notes' text can't be both empty!")
      default:
        return setMessage('Sorry. Something went wrong.');
    }
  }

  useEffect(() => {
    ChangeMessage();
  }, [props.type])

  return (
    <Black>
      <AlertContainer>
        <Header>
          <Title>Alert ✋</Title>
          <Message>{message}</Message>
        </Header>
        <Bottom>
          <Button onPress={() => { props.close(false) }}>
            <Uppercase>Ok</Uppercase>
          </Button>
        </Bottom>
      </AlertContainer>
    </Black>
  );
}