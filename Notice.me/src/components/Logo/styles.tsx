import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const LogoStyle = styled.View `
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin-top: ${hp('20%')}px;
`;