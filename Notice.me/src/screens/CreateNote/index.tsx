import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../../contexts/auth';

import Icon from 'react-native-vector-icons/Ionicons';

import { Buttons } from '../../components/Note/styles';
import { Black, Title, NoteContainer, Description, Header, Tag, Name, Bottom, Folders, RadioGroup, NameInput } from './styles';
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
    
    const [ tags, setTags ] = useState<Tag[]>(Auth.tags);
    const [ favorite, setFavorite ] = useState('0');
    const [ checked, setChecked ] = useState("No tag");
    const [ deleted, setDeleted ] = useState(false);
    const [ choosingTag, setChoosingTag ] = useState(false);
    
    const { control, getValues, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
    const onError = (errors: Object) => { console.log(errors) };

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

            thisTagExists(checked, data);

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

    function thisTagExists(tag:string, data:object) {
        let exists = false;
        const length = tags.length;

        for(let i = 0; i < tags.length; i++) {
            if(tags[i].name.toUpperCase() === tag.toUpperCase()) {
                exists = true;
            }
        }
        
        let last_id:number;
        if (exists != true && length != 0 && tag != "No tag") {
            last_id = tags[length - 1].id;

            let NewTag = {
                id: last_id+1,
                name: tag,
            }
    
            tags.push(NewTag);
            Auth.setTags(tags);
            const tagList = JSON.stringify(Auth.tags);
            AsyncStorage.setItem("tags", tagList)

        } else if (exists != true && length == 0 && tag != "No tag") {
            last_id = 0;

            let NewTag = {
                id: last_id+1,
                name: tag,
            }
    
            tags.push(NewTag);
            Auth.setTags(tags);
            const tagList = JSON.stringify(Auth.tags);
            AsyncStorage.setItem("tags", tagList)
        }
    }

    function deleteTag(id:number, list:Tag[]) {
        for(let i=0; i<list.length; i++) {
            if(list[i].id == id) {
                list.splice(i, 1)
            }
        }
        Auth.setTags(list)
        const tags = JSON.stringify(list)
        AsyncStorage.setItem("tags", tags)
        setDeleted(!deleted)
    }

    function handleSelectTag(name:string) {
        setChecked(name)
        setChoosingTag(!choosingTag)
    }

    useEffect(() => {
        setTags(Auth.tags)
    }, [deleted])

    return(
        <Black>
            <Header>
                <Icon 
                    name="close" 
                    size={48} 
                    color="#FFCD92" 
                    onPress={() => {props.close(false) }}
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
                    <ScrollView>
                        <RadioGroup>
                            <RadioButton
                                value="No tag"
                                color= '#FFCD92'
                                uncheckedColor= '#99A3D266'
                                status={ checked === "No tag" ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    setChecked("No tag")
                                    setChoosingTag(!choosingTag)
                                }}
                            />
                            <Name>No tag</Name>
                        </RadioGroup>
                        {
                            tags != [] &&
                            tags.map( tag => {
                                return(
                                    <RadioGroup key={tag.id}>
                                        <RadioButton
                                            value={tag.name}
                                            color= '#FFCD92'
                                            uncheckedColor= '#99A3D266'
                                            status={ checked === tag.name ? 'checked' : 'unchecked' }
                                            onPress={() => { handleSelectTag(tag.name) }}
                                        />
                                        <Name>{tag.name}</Name>
                                        <Icon 
                                            name="close-outline" 
                                            size={30} 
                                            color="#F2F2F2"
                                            onPress={() => { deleteTag(tag.id, tags) }}
                                        />
                                    </RadioGroup>
                                );
                            })
                        }
                    </ScrollView>
                    <RadioGroup 
                        style={{
                            alignSelf: 'flex-end', 
                            borderTopWidth: 1, 
                            borderTopColor: '#f2f2f218', 
                            marginBottom: 5
                        }}>
                        <Icon name="md-add" size={36} color="#F2F2F2" />
                        <Controller 
                            control={control}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <NameInput
                                    placeholder="NEW TAG"
                                    maxLength={10}
                                    onBlur={onBlur}
                                    onSubmitEditing={() => { setChoosingTag(false) }}
                                    onChangeText={(value:any) => {
                                        setChecked(value) 
                                        onChange(value)
                                    }}
                                    value={value}
                                />
                            )}
                            name='tag'
                            defaultValue=''
                        />
                    </RadioGroup>
                </Folders>
            }
        </Black>
    );
}