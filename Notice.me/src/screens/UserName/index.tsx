import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Input, Uppercase } from '../../styles';
import { Question } from './styles';

export default function UserName() {

    const { control } = useForm({ mode: 'onTouched' });
    
    const navigation = useNavigation();

    const Auth = useContext(AuthContext);
    
    const [ name, setName ] = useState("");
    const [ isFocused, setIsFocused ] = useState(false);

    async function handleKeyPressed(e) {
        const tags:Object[] = [];
        const notes:Object[] = [];

        if(e.nativeEvent.key == "Enter"){
            try {
                const jsonTags = JSON.stringify(tags);
                const jsonNotes = JSON.stringify(notes);

                await AsyncStorage.setItem("name", name);
                await AsyncStorage.setItem("tags", jsonTags)
                await AsyncStorage.setItem("notes", jsonNotes)

                Auth.setName(name)
                Auth.setTags(tags)
                Auth.setNotes(notes)
                
                navigation.navigate("Notes")
            } catch (err) { alert("Oops. This shouldn't happen.")}
        }
    }

    return(
        <Container>
            <Question>
                <Uppercase style={{marginBottom: 15, alignSelf: 'flex-start'}}>Hello, what's your name?</Uppercase>
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Input
                            placeholder="Type here..."
                            multiline
                            maxLength={15}
                            onBlur={onBlur}
                            onFocus={() => {setIsFocused(true)}}
                            style={isFocused && {backgroundColor: '#1F1E2B'}}
                            onKeyPress={handleKeyPressed}
                            onChangeText={(value:any) => {setName(value); onChange(value)}}
                            value={value}
                        />
                    )}
                    name='name'
                    defaultValue=''
                />
            </Question>
        </Container>
    );
}