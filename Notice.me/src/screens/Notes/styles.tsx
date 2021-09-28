import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Header = styled.View`
  margin-top: 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Folders = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 30px 0px 20px 0px;

  height: 5%;
`;

export const UserNotes = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 150px;
`;

export const Column = styled.View`
  display: flex;
  flex-direction: column;

  width: 50%;
  height: 100%;
`;

export const NoNotes = styled.View`
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 50px;
`;

export const NoNotesText = styled.Text`
  font-size: ${wp('4%')}px;
  color: #727272;
  font-family: Karla;
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
