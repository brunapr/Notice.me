import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Case = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CaseSelected = styled.View `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #FFCD92;
`;


export const FolderText = styled.Text `
    font-family: MontMedium;
    text-transform: uppercase;
    font-size: ${wp('4%')}px;
    color: #323B3F;
    letter-spacing: 2px;
    margin-left: 5px;
`;