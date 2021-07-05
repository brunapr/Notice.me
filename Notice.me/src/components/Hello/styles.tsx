import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Box = styled.View `
    display: flex;
    flex-direction: row;
`;

export const Text = styled.Text `
    font-size: ${wp('7%')}px;
    font-family: MontMedium;
`;

export const TextInput = styled.TextInput `
    font-size: ${wp('7%')}px;
    font-family: MontMedium;
`;