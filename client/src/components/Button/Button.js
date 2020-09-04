import React from 'react';

import Classes from './Button.module.css';
import editIcon from '../../assets/Images/edit.png'

export const UniversalButton = (props)=>{
  return <button className={[Classes.Button,Classes.UniversalButton].join(' ')}>{props.title}</button>
}

export const CloseButton = (props)=>{
  return <button className={Classes.CloseButton} onClick={props.clicked}>{props.title}</button>
}

export const EditButton = (props)=>{
  return <input type="image" src={editIcon} alt="Edit" onClick={props.editClicked} className={Classes.EditButton}/>
}

export const DeleteButton = (props)=>{
  return <button className={[Classes.Button,Classes.DeleteButton].join(' ')} onClick={props.deleteClicked}>{props.title}</button>
}

export const UpdateButton = (props)=>{
  return <button className={[Classes.Button,Classes.UpdateButton].join(' ')} onClick={props.updateClicked}>{props.title}</button>
}