import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { quotes } from './quotes';
import { QOTD, Text, QOTDClicked, TextClicked } from './styles';


export default function QOTT() {
  const [ quote, setQuote ] = useState("Click to open today's fortune cookie.");

  function generateLuck() {
    const array = Object.values(quotes);
    const min = Math.ceil(0);
    const max = Math.floor(6);
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    setQuote(array[number])
  }

  return(
    <>
    {
      quote == "Click to open today's fortune cookie." ?
      <QOTD onPress={() => { generateLuck() }}>
        <Icon name="cookie" size={18} color="#99A3D2" style={{marginRight: 15}}/>
        <Text>
          {quote}
        </Text>
      </QOTD> :
      <QOTDClicked>
        <Icon name="cookie-bite" size={18} color="#FFCD92" style={{marginRight: 15}}/>
        <TextClicked>
          {quote}
        </TextClicked>
      </QOTDClicked>
    }
    </>
  );
}