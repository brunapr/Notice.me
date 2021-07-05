import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const AlertContainer = styled.View `
    width: ${wp('70%')}px;
    height: ${hp('20%')}px;
    background-color: #151515;
    border-radius: 10px;
    position: absolute;
    top: ${hp('35%')}px;
`;

export const Header = styled.View `
    width: 100%;
    height: 70%;
    padding: 20px;
`;

export const Message = styled.Text `
    font-size: ${wp('3%')}px;
    color: #f2f2f28d;
    font-family: Karla;
`;

export const Bottom = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 30%;
`;

export const Button = styled.TouchableOpacity `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px 5px 5px;
    height: 100%;
    width: 25%;
`;

export const Uppercase = styled.Text `
    color: #FFCD92;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: ${wp('3.5%')}px;
    font-family: MontMedium;
`;