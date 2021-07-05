import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../../contexts/auth';

import Icon from 'react-native-vector-icons/Ionicons';

import { Buttons } from '../../components/Note/styles';
import { Black, Title, NoteContainer, Description, Header, Tag, Name, Bottom, Folders, RadioGroup } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
    id: number,
    title: string,
    description: string,
    tags: string,
    status: string,
}

interface Tag {
    id: number,
    name: string,
}

export default function CreateNote(props:any) {
    
    const Auth = useContext(AuthContext);

    let notesList = Auth.notes;
    const tags:Tag[] = props.tags;

    console.log(notesList)
    console.log(Auth.notes.length)
    
    const [ favorite, setFavorite ] = useState('0');
    const [ checked, setChecked ] = useState("No tag");
    const [ choosingTag, setChoosingTag ] = useState(false);
    
    const { control, getValues, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

    const onSubmit = (data: Note) => {
        let isReversed = false;
        if (notesList.length > 1) {
            if (notesList[0].id > notesList[1].id) { isReversed = true }
        }

        if(data.title == "" && data.description == "") {
            props.setAlertType(2); 
            props.setAlert(true);
        } else {
            const length = Auth.notes.length;

            let last_id:number;

            if(isReversed) { notesList = notesList.reverse() }

            if(length != 0) { 
                last_id = notesList[length-1].id; 
            } else { last_id = 0 };

            const NewNote = {
                id: last_id+1,
                title: data.title,
                description: data.description,
                tags: checked,
                status: favorite,
            }

            Auth.notes.push(NewNote)
            Auth.setNotes(Auth.notes)
            const notes = JSON.stringify(Auth.notes);
            AsyncStorage.setItem("notes", notes)
            props.setToastType(1)
            props.setToast(true)
            props.close(false)
        }
    };

    const onError = (errors: Object) => { console.log(errors) };

    function handleSelectTag(name:string) {
        setChecked(name);
        setChoosingTag(!choosingTag);
    }

    return(
        <Black>
            <Header>
                <Icon 
                    name="close" 
                    size={48} 
                    color="#FFCD92" 
                    onPress={() => {props.close(false) }} //alert leave wout save after
                />
                <Icon 
                    name='save'
                    size={36}
                    color="#FFCD92"
                    onPress={handleSubmit(onSubmit, onError)}
                />
            </Header>
            <NoteContainer>
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Title
                            placeholder="Untitled"
                            multiline
                            maxLength={50}
                            onBlur={onBlur}
                            onChangeText={(value:any) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='title'
                    defaultValue=''
                />
                <ScrollView style={{height: 150}}>
                <Controller
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Description
                            placeholder="Type here..."
                            multiline
                            maxLength={500}
                            onBlur={onBlur}
                            onChangeText={(value:any) => onChange(value)}
                            value={value}
                        />
                    )}
                    name='description'
                    defaultValue=''
                />
                </ScrollView>
                <Bottom style={{bottom: -25}}>
                    <Buttons>
                        {
                            favorite == '0' ?
                                <Icon 
                                    name="heart" 
                                    size={48} 
                                    color="#323B3F" 
                                    style={{marginRight: 20}}
                                    onPress={() => setFavorite('1')}
                                /> :
                                <Icon 
                                    name="heart" 
                                    size={48} 
                                    color="#FFCD92" 
                                    style={{marginRight: 20}}
                                    onPress={() => setFavorite('0')}
                                />
                        }
                    </Buttons>
                    <Tag onPress={() => setChoosingTag(!choosingTag)}>
                        <Name numberOfLines={1}>{checked}</Name>
                    </Tag>
                </Bottom>
            </NoteContainer>
            {
                choosingTag &&
                <Folders>
                    <RadioGroup>
                        <RadioButton
                            value="No tag"
                            color= '#FFCD92'
                            uncheckedColor= '#99A3D266'
                            status={ checked === "No tag" ? 'checked' : 'unchecked' }
                            onPress={() => {setChecked("No tag"); setChoosingTag(!choosingTag)}}
                        />
                        <Name>No tag</Name>
                    </RadioGroup>
                    {
                        tags.map( tag => {
                            return(
                                <RadioGroup key={tag.id}>
                                    <RadioButton
                                        value={tag.name}
                                        color= '#FFCD92'
                                        uncheckedColor= '#99A3D266'
                                        status={ checked === tag.name ? 'checked' : 'unchecked' }
                                        onPress={() => {handleSelectTag(tag.name);}}
                                    />
                                    <Name>{tag.name}</Name>
                                </RadioGroup>
                            );
                        })
                    }
                </Folders>
            }
        </Black>
    );
}