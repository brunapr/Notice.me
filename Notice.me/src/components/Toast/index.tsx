import React, { useEffect, useState } from 'react';
import { Message } from '../Alert/styles';
import { ToastContainer, CenterToast, ToastMessage } from './styles';

export default function Toast(props: any) {

  const [message, setMessage] = useState("");

  function ChangeMessage() {
    switch (props.type) {
      case 1:
        return setMessage('Note saved.');
      case 2:
        return setMessage('Note deleted.')
      default:
        return setMessage('Sorry. Something went wrong.');
    }
  }

  useEffect(() => {
    ChangeMessage();
  }, [props.type])

  return (
    <CenterToast>
      <ToastContainer>
        <ToastMessage>
          {message}
        </ToastMessage>
      </ToastContainer>
    </CenterToast>
  );
}