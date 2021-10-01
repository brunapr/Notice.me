import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Hello from '../../components/Hello';
import QOTD from '../../components/QOTD';
import NewNote from '../../components/NewNote';
import FolderList from '../../components/FolderList';
import Note from '../../components/Note';
import Alert from '../../components/Alert';
import CreateNote from '../CreateNote';

import { AuthContext } from '../../contexts/auth';

import { Background, Container } from '../../styles';
import { Header, Folders, UserNotes, Column, NoNotes, NoNotesText } from './styles';
import Toast from '../../components/Toast';
import DeleteNote from '../../components/DeleteNote';
import EditNote from '../EditNote';

interface Notes {
  id: number,
  title: string,
  description: string,
  tags: string,
  status: string,
}

interface Tags {
  id: number,
  name: string,
}

export default function Notes() {
  
  const Auth = useContext(AuthContext);

  if(!Auth.name) {
    <Background/>
  }

  const userName = Auth.name;
  const navigation = useNavigation();

  useEffect(() => {
    userName == "" && navigation.navigate("UserName")
  }, [])

  const list = Auth.notes;
  
  // favorited list and left/right notes' column
  const [favList, setFavList] = useState<Notes[]>([]);
  const [leftCol, setLeftCol] = useState<Notes[]>([]);
  const [rightCol, setRightCol] = useState<Notes[]>([]);

  const [tagsList, setTagsList] = useState<Tags[]>([]);

  // show current clicked folder to change folder style
  const [currentFolder, setCurrentFolder] = useState(-3);

  const [noteId, setNoteId] = useState(0);
  const [alert, setAlert] = useState(false);
  const [toast, setToast] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);

  // help set what message alert and toast should give
  const [alertType, setAlertType] = useState(0);
  const [toastType, setToastType] = useState(0);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setTagsList(Auth.tags);
    divide(list);
  }, [Auth.notes, Auth.tags, visible, deleteNote, editMode])

  useEffect(() => {
    setTimeout(() => {
      setToast(false)
    }, 3000)
  }, [toast])

  useEffect(() => {
    favoriteList(list);
  }, [leftCol, rightCol])

  function divide(list: any) {
    let isReversed = false;
    if (list.length > 1) {
      if (list[0].id > list[1].id) { isReversed = true }
    }

    if (list.length === 0) { setLeftCol([]); setRightCol([]) }
    else {
      const first: Notes[] = [];
      const second: Notes[] = [];

      if (!isReversed) { list = list.reverse() }

      for (let i = 1; i <= list.length; i = i + 2) {
        list[i] != undefined &&
          second.push(list[i])
        first.push(list[i - 1])
      }

      setLeftCol(first)
      setRightCol(second)
    }
    setLoading(false);
  }

  function handleChangeFolder(id: number) {
    if (id == -3) {
      setCurrentFolder(id)
      divide(Auth.notes)
    } else if (id == -2) {
      setCurrentFolder(id)
      divide(favList)
    }
  }

  function favoriteList(list: any) {
    const fav: Notes[] = [];
    if (leftCol == []) { setFavList([]) }
    else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].status == '1') {
          fav.push(list[i])
        }
      }
    }
    return setFavList(fav)
  }

  return (
    <Container>
      <Header>
        <Hello name={userName} setType={setAlertType} setAlert={setAlert} />
      </Header>
      <QOTD/>
      <Folders>
        <FolderList
          id={-3}
          name='file-tray-outline'
          title='All'
          onPress={() => { handleChangeFolder(-3) }}
          currentFolder={currentFolder}
        />
        <FolderList
          id={-2}
          name='heart-outline'
          title='Favorites'
          onPress={() => { handleChangeFolder(-2) }}
          currentFolder={currentFolder}
        />
      </Folders>
      <ScrollView>
        {
          loading &&
          <Background>
            <ActivityIndicator size="large" color="#f2f2f2" />
          </Background>
        }
        {
          leftCol?.length == 0 ?
            <NoNotes>
              <NoNotesText>Oh, no! It's empty! 😥</NoNotesText>
            </NoNotes> :
            <UserNotes>
              <Column>
                {leftCol.map(note => {
                  return (
                    <Note
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      description={note.description}
                      tag={note.tags}
                      status={note.status}
                      delete={setDeleteNote}
                      setId={setNoteId}
                      edit={setEditMode}
                    />
                  );
                })}
              </Column>
              <Column style={{ alignItems: 'flex-end' }}>
                {rightCol.map(note => {
                  return (
                    <Note
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      description={note.description}
                      tag={note.tags}
                      status={note.status}
                      delete={setDeleteNote}
                      setId={setNoteId}
                      edit={setEditMode}
                    />
                  );
                })}
              </Column>
            </UserNotes>
        }
      </ScrollView>
      {
        visible ?
          <CreateNote
            close={setVisible}
            tags={tagsList}
            setAlertType={setAlertType}
            setAlert={setAlert}
            setToastType={setToastType}
            setToast={setToast} />
          : <NewNote onPress={() => setVisible(true)} />
      }
      {
        editMode &&
        <EditNote
          close={setEditMode}
          tags={tagsList}
          noteId={noteId}
          setAlertType={setAlertType}
          setAlert={setAlert}
          setToastType={setToastType}
          setToast={setToast}
        />
      }
      {
        deleteNote && <DeleteNote
          close={setDeleteNote}
          id={noteId}
          list={list}
          setToastType={setToastType}
          setToast={setToast} />
      }
      {
        alert && <Alert close={setAlert} type={alertType} />
      }
      {
        toast && <Toast id="toast" close={setToast} type={toastType} />
      }
    </Container>
  );
}