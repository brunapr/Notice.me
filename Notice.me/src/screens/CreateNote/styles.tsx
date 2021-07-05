import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Black = styled.View `
    position: absolute;
    width: ${wp('100%')}px;
    height: ${hp('200%')}px;
    background-color: #00000099;  

    display: flex;
    align-items: center;
`;

export const Header = styled.View `
    width: ${wp('70%')}px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #151515;
    margin-top: ${wp('20%')}px;
    padding: 0px 20px;
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;      

export const NoteContainer = styled.View `
    width: ${wp('70%')}px;
    background-color: #1F1E2B;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 20px 20px 40px 20px;
    position: relative;
`;

export const Title = styled.TextInput.attrs({
    placeholderTextColor: "#99A3D299",
  }) `
    color: #99A3D2;
    font-size: ${wp('5%')}px;
    margin-bottom: 20px;
`;

export const Description = styled.TextInput.attrs({
    placeholderTextColor: "#72727299",
  }) `
    font-family: Karla;
    color: #727272;
    font-size: ${wp('4%')}px;
`;

export const Bottom = styled.View `
    width: ${wp('70%')}px;
    position: absolute;
    padding: 0px 12px 0px 12px;
    bottom: -12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Tag = styled.TouchableOpacity `
    padding: 15px 10px 0px 10px;
    border-radius: 5px;
    width: 50%;
    max-width: 50%;
    height: 48px;

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
    font-size: ${wp('2.5%')}px;
    flex: 1;
`;

export const Folders = styled.View `
    padding: 10px 10px 0px 10px;
    width: ${wp('70%')}px;
    height: ${hp('32%')}px;
    background-color: #151515;
    border-radius: 10px;
    position: absolute;
    top: ${wp('20%')}px;
`;

export const RadioGroup = styled.View `
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;

export const NameInput = styled.TextInput.attrs({
    placeholderTextColor: "#F2F2F2",
  }) `
    font-family: MontMedium;
    color: #F2F2F2;
    font-size: ${wp('2.5%')}px;
    flex: 1;
`;