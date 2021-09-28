import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const QOTD = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid #99A3D260;
  border-radius: 10px;
  margin-top: 10px;
  padding: 8px 50px 8px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: Karla;
  font-style: italic; 
  color: #99A3D2;
  font-size: ${wp('3%')}px;
  line-height: 15px;
`;

export const QOTDClicked = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid #FFCD9260;
  border-radius: 10px;
  margin-top: 10px;
  padding: 8px 50px 8px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextClicked = styled.Text`
  font-family: Karla;
  font-style: italic; 
  color: #FFCD92;
  font-size: ${wp('3%')}px;
  line-height: 15px;
`;