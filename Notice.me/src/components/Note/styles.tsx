import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const NoteContainer = styled.TouchableOpacity `
    width: ${wp('43%')}px;
    background-color: #1F1E2B;
    border-radius: 10px;
    margin-bottom: ${wp('6%')}px;
    padding: 12px 12px 25px 12px;
    position: relative;
`;

export const Title = styled.Text `
    font-family: MontSemiBold;
    text-transform: uppercase;
    color: #99A3D2;
    font-size: ${wp('2.5%')}px;
`;

export const Description = styled.Text `
    font-family: Karla;
    color: #727272;
    font-size: ${wp('2.8%')}px;
    line-height: 15px;
`;

export const Bottom = styled.View `
    width: ${wp('43%')}px;
    position: absolute;
    padding: 0px 12px 0px 12px;
    bottom: -12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Tag = styled.View `
    padding: 0px 8px;
    border-radius: 5px;
    max-width: 50%;

    background-color: #1F1E2B;
    border: 1px solid #99A3D233;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Name = styled.Text `
    font-family: MontMedium;
    text-transform: uppercase;
    color: #F2F2F2;
    font-size: ${wp('1.8%')}px;
    flex: 1;
    line-height: 20px;
    
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Buttons = styled.View `
    display: flex;
    flex-direction: row;
`;