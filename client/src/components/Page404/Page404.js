import React from 'react';

import Classes from './Page404.module.css';
import searching from '../../assets/Images/Willie.gif';

const Page404 = ()=>{
  return(
    <>
  <h1 className={Classes.Page404}>
    Page you are looking for doesn't exist.
  </h1>
  <div>
    <img src={searching} alt={'Searching...'} className={Classes.Willie}></img>
  </div>
  
  </>
  )
} 

export default Page404;
