import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ToastContainer = styled.View`
  width: ${wp('100%')-60}px;
  padding: 20px;
  background-color: #99A3D2;
  border-radius: 10px;
`;

export const CenterToast = styled.View`
  position: absolute;
  width: ${wp('100%')}px;
  top: ${hp('10%')}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ToastMessage = styled.Text`
  color: #151515; 
  font-size: 14px;
  font-weight: bold;
  font-size: ${wp('3%')}px;
  font-family: Karla;
`;