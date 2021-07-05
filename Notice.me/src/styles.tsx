import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = styled.View `
    background-color: #16151D;
    width: 100%;
    min-width: ${wp('100%')}px;
    height: 100%;
    min-height: ${hp('100%')}px;

    padding: 0px 20px 0px 20px;
`;

export const Background = styled.View `
    background-color: #16151D;
    height: 100%;
    min-height: ${hp('100%')}px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: "#99A3D299",
  }) `
    background-color: #16151D;
    width: 100%;
    height: 40px;
    margin-bottom: 30px;
    padding: 0px 20px;
    color: #99A3D299;

    border: 1px solid #99A3D299;
    border-radius: 5px;

`;

export const Uppercase = styled.Text `
    color: #F2F2F2;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: ${wp('2.5%')}px;
    font-family: Montserrat;
`;

export const Form = styled.View `
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    margin-top: 70px;
`;