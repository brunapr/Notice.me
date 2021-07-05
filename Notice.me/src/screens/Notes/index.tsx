import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, ActivityIndicator, Button, ColorPropType } from 'react-native';

import Hello from '../../components/Hello';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const list = Auth.notes;

    const [ userName, setUserName ] = useState(Auth.name);

    const [ leftCol, setLeftCol ] = useState<Notes[]>([]);
    const [ rightCol, setRightCol ] = useState<Notes[]>([]);
    
    const [ tagsList, setTagsList ] = useState<Tags[]>([]);
    
    const [ currentFolder, setCurrentFolder ] = useState(-3);

    const [ alert, setAlert ] = useState(false);
    const [ toast, setToast ] = useState(false);
    const [ deleteNote, setDeleteNote ] = useState(false);
    const [ noteId, setNoteId ] = useState(0);
    const [ alertType, setAlertType ] = useState(0);
    const [ toastType, setToastType ] = useState(0);

    const [ loading, setLoading ] = useState(true);
    const [ visible, setVisible ] = useState(false);

    useEffect(() => {
        setTagsList(Auth.tags);
        divide(list);
    }, [Auth.notes, Auth.tags, visible, deleteNote])

    useEffect(() => {
        setTimeout(() => {
            setToast(false)
        }, 3000)
    }, [toast])
    
    function divide(list: any) {
        let isReversed = false;
        if (list.length > 1) {
            if (list[0].id > list[1].id) { isReversed = true }
        }

        if (list.length === 0) { setLeftCol([]); setRightCol([]) }
        else {
            const first:Notes[] = [];
            const second:Notes[] = [];

            if(!isReversed) { list = list.reverse() }

            for (let i = 1; i <= list.length; i=i+2) {
                list[i] != undefined &&
                second.push(list[i])
                first.push(list[i-1])
            }

            setLeftCol(first)
            setRightCol(second)
        }
        setLoading(false);
    }

    function handleChangeFolder(id:number) {
        if(id == -3) {
            setCurrentFolder(id)
            divide(Auth.notes)
        } else {
            setCurrentFolder(id)
            setLeftCol([]); 
            setRightCol([]);
        }
    } 

    return (
        <Container>
            <Header>
                <Hello name={userName} setType={setAlertType} setAlert={setAlert}/>
            </Header>
            <Folders>
                <FolderList
                    id={-3}
                    name='book-outline'
                    onPress={() => { handleChangeFolder(-3) }}
                    currentFolder={currentFolder}
                />
                <FolderList
                    id={-2}
                    name='heart-outline'
                    onPress={() => { handleChangeFolder(-2) }}
                    currentFolder={currentFolder}
                />
                <FolderList
                    id={-1}
                    name='trash-outline'
                    onPress={() => { handleChangeFolder(-1) }}
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
                    setToast={setToast}/>
                : <NewNote onPress={() => setVisible(true)}/>
            }
            {
                alert && <Alert close={setAlert} type={alertType}/>
            }
            {
                toast && <Toast close={setToast} type={toastType}/>
            }
            {
                deleteNote && <DeleteNote 
                    close={setDeleteNote} 
                    id={noteId} 
                    list={list} 
                    setToastType={setToastType} 
                    setToast={setToast}/>
            }
            {/* <Button title="oi" onPress={() => AsyncStorage.setItem("notes", "[]")}/> */}
        </Container>
    );
}