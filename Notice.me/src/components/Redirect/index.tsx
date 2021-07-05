import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { Background } from '../../styles';

export default function Redirect() {
    const Auth = useContext(AuthContext);

    const navigation = useNavigation();
    const [ where, setWhere ] = useState('');
    const [ count, setCount ] = useState(0);

    function calculate() {
        setCount(count + 1)
        Auth.name != "" ? setWhere('Notes') : setWhere('UserName')
    }
    
    function navigate() {
        where != '' &&
        navigation.navigate(where)
    }
    
    useEffect(() =>{
        calculate();
    }, [Auth]);

    useEffect(() =>{
        count == 2 &&
        navigate();
    }, [count])
    

    return(
        <Background/>
    );
}; 
