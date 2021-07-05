import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Background } from '../styles';

interface Data {
    name: string;
    setName: any;
    signed: boolean;
    notes: Note[];
    setNotes: any;
    tags: Tag[];
    setTags: any;
}

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

export const AuthContext = createContext<Data>({} as Data);

const AuthProvider = (props:any) => {

    const [ name, setName ] = useState("");
    const [ checkLogIn, setCheckLogIn ] = useState(false);
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ tags, setTags ] = useState<Tag[]>([]);

    const user_name = async () => {
        let name = "";
        try {
            const userName = await AsyncStorage.getItem("name");
            if ( userName !== null ) {
                name = userName;
                return name;
            }
        } catch (e) { console.log('Error.') }
        return name;
    }

    const user_tags = async () => {
        let tags:Tag[] = [];
        try {
            const userTags = await AsyncStorage.getItem("tags");
            if( userTags !== null ) {
                tags = JSON.parse(userTags);
            }
        } catch (e) { console.log('Error.') }
        return tags;
    }

    const user_notes = async () => {
        let notesList:Note[] = [];
        try {
            const userNotes = await AsyncStorage.getItem("notes");
            if( userNotes !== null ) {
                notesList = JSON.parse(userNotes);
            }
        } catch (e) { console.log('Error.') }
        return notesList;
    }
    
    useEffect(() => {
        user_name().then(value => { setName(value) })
        user_tags().then(value => { setTags(value) })
        user_notes().then(value => { setNotes(value) })
    },[])

    
    function checkIsLoggedIn() {
        name != "" ? setCheckLogIn(true) : setCheckLogIn(false)
    }
    
    useEffect(() => {
        checkIsLoggedIn();
    }, [name, checkLogIn])
    
    return(
        <Background>
            <AuthContext.Provider value={{
                name: name, setName: setName, 
                signed: checkLogIn, 
                notes: notes, setNotes: setNotes, 
                tags: tags, setTags: setTags
            }}>
                {props.children}
            </AuthContext.Provider>
        </Background>
    );
} 

export default AuthProvider;