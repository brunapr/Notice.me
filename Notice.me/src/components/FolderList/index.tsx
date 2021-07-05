import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Case, CaseSelected, FolderText } from './styles';

export default function FolderList(props:any) {
    
    return(
        <TouchableOpacity style={{marginLeft: 15, marginRight: 15}} onPress={props.onPress}>
            {props.currentFolder == props.id ? 
                <CaseSelected>
                    <Icon name={props.name} size={22} color="#FFCD92" />
                    <FolderText style={{color: '#FFCD92'}}>{props.title}</FolderText>
                </CaseSelected> :
                <Case>
                    <Icon name={props.name} size={22} color="#323B3F" />
                    <FolderText>{props.title}</FolderText>
                </Case>
            }
        </TouchableOpacity>
    ); 
}