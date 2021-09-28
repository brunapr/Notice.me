import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { AuthContext } from '../../contexts/auth';

import Icon from 'react-native-vector-icons/Ionicons';

import { Buttons } from '../../components/Note/styles';
import { Black, Title, NoteContainer, Description, Header, Tag, Name, Bottom, Folders, RadioGroup } from '../CreateNote/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { Uppercase } from '../../components/Alert/styles';

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

export default function CreateNote(props: any) {

  const Auth = useContext(AuthContext);

  let notesList = Auth.notes;
  const tags: Tag[] = props.tags;

  const { control, getValues, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

  function searchIndex(id: number) {
    let index = 0;
    for (let i = 0; i < notesList.length; i++) {
      if (notesList[i].id == id) {
        index = i; break;
      }
    }
    setIndex(index);
    return index;
  }

  useEffect(() => {
    searchIndex(props.noteId);
  }, [Auth, tags, props.id])

  const [index, setIndex] = useState(0);
  const [favorite, setFavorite] = useState(notesList[index].status);
  const [checked, setChecked] = useState(notesList[index].tags);
  const [choosingTag, setChoosingTag] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
    setFavorite(notesList[index].status)
    setChecked(notesList[index].tags)
  }, [index])

  if (loading) {
    return <AppLoading />
  }

  const onSubmit = (data: Note) => {
    let isReversed = false;
    if (notesList.length > 1) {
      if (notesList[0].id > notesList[1].id) { isReversed = true }
    }

    if (data.title == "" && data.description == "") {
      props.setAlertType(2);
      props.setAlert(true);
    } else {
      if (isReversed) { notesList = notesList.reverse() }
      const index = searchIndex(props.noteId);

      const NewNote = {
        id: props.noteId,
        title: data.title,
        description: data.description,
        tags: checked,
        status: favorite,
      }

      notesList.splice(index, 1, NewNote)
      Auth.setNotes(notesList)
      const notes = JSON.stringify(notesList);
      AsyncStorage.setItem("notes", notes)
      props.setToastType(1)
      props.setToast(true)
      props.close(false)
    }
  };

  const onError = (errors: Object) => { console.log(errors) };

  function handleSelectTag(name: string) {
    setChecked(name);
    setChoosingTag(!choosingTag);
  }

  return (
    <Black>
      <Header>
        <Icon
          name="close"
          size={36}
          color="#FFCD92"
          onPress={() => { props.close(false) }} //alert leave wout save after
        />
        <TouchableOpacity onPress={handleSubmit(onSubmit, onError)}>
          <Uppercase>Save</Uppercase>
        </TouchableOpacity>
      </Header>
      <NoteContainer>
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Title
              placeholder={notesList[index].title}
              multiline
              autoFocus
              maxLength={50}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              value={value}
            />
          )}
          name='title'
          defaultValue={notesList[index].title}
        />
        <ScrollView style={{ height: 150 }}>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Description
                placeholder={notesList[index].description}
                multiline
                maxLength={500}
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
                value={value}
              />
            )}
            name='description'
            defaultValue={notesList[index].description}
          />
        </ScrollView>
        <Bottom style={{ bottom: -25 }}>
          <Buttons>
            {
              favorite == '0' ?
                <Icon
                  name="heart"
                  size={48}
                  color="#323B3F"
                  style={{ marginRight: 20 }}
                  onPress={() => setFavorite('1')}
                /> :
                <Icon
                  name="heart"
                  size={48}
                  color="#FFCD92"
                  style={{ marginRight: 20 }}
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
              color='#FFCD92'
              uncheckedColor='#99A3D266'
              status={checked === "No tag" ? 'checked' : 'unchecked'}
              onPress={() => { setChecked("No tag"); setChoosingTag(!choosingTag) }}
            />
            <Name>No tag</Name>
          </RadioGroup>
          {
            tags.map(tag => {
              return (
                <RadioGroup key={tag.id}>
                  <RadioButton
                    value={tag.name}
                    color='#FFCD92'
                    uncheckedColor='#99A3D266'
                    status={checked === tag.name ? 'checked' : 'unchecked'}
                    onPress={() => { handleSelectTag(tag.name); }}
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