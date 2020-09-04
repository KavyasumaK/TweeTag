import React from 'react';

import Classes from './InputElements.module.css';

//InputEls
const inputElements = (props)=>{
  let retElement = '';
  const inputClasses = [Classes.InputElement]
  if(props.invalid&&props.shouldValidate&&props.touched){
    inputClasses.push(Classes.Invalid)
  }
  if(props.elementType==='textarea'){
    inputClasses.push(Classes.TextArea)
  }
  switch (props.elementType) {
    case 'input':
      retElement= <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}></input> 
      break
     case 'textarea':
      retElement= <textarea  value={props.value} {...props.elementConfig} onChange={props.changed} className={inputClasses.join(' ')} required></textarea> 
      break;  
    case 'select':
      retElement=(<select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}> {props.elementConfig.options.map(option=>(<option key ={option.value}>{option.displayValue}</option>))}</select>)
      break;
    default:
      retElement= '';
      break;
    }
  return(
  <div className = {Classes.Input}> 
    {retElement}
  </div>);
}

export default inputElements;