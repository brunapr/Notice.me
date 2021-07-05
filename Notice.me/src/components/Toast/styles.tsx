import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const ToastContainer = styled.View `
    width: 90%;
    padding: 20px;
    background-color: #151515;
    border-radius: 10px;
`;

export const CenterToast = styled.View `
    position: absolute;
    width: ${wp('100%')}px;
    top: ${hp('10%')}px;

    display: flex;
    justify-content: center;
    align-items: center;
`;