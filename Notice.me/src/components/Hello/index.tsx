import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../contexts/auth';

import { Box, Text, TextInput } from './styles';
import Alert from '../Alert';

export default function Hello(props:any) {

    const Auth = useContext(AuthContext);
    
    const { control, formState: { errors } } = useForm({ mode: 'onTouched' });
    const onError = (errors: Object) => { console.log(errors) };

    function handleChangeName(name:string) {
        if(name == "") { props.setType(1); props.setAlert(true) }
        else {
            Auth.setName(name);
            AsyncStorage.setItem("name", name);
        }
    }

    return (
        <Box>
            <Text style={{color: '#323B3F'}}>Hell</Text>
            <Text style={{color: '#99A3D2'}}>o,</Text>
            <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            style={{color: '#FFF', marginLeft: 8}}
                            maxLength={10}
                            onBlur={onBlur}
                            onChangeText={(value:any) => {handleChangeName(value); onChange(value)}}
                        >{props.name}</TextInput>
                    )}
                    name='name'
                    defaultValue=''
            />
            <Text style={{color: '#99A3D2'}}>. 👋</Text>
        </Box>
    );
}