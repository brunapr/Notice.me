import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FolderList(props:any) {
    
    return(
        <TouchableOpacity style={{marginLeft: 15, marginRight: 15}} onPress={props.onPress}>
            {props.currentFolder == props.id ? 
                <Icon name={props.name} size={30} color="#FFCD92" /> :
                <Icon name={props.name} size={30} color="#323B3F" />
            }
        </TouchableOpacity>
    ); 
}