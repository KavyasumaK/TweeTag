import React from 'react';
import { NavLink } from 'react-router-dom';

import Classes from './Menu.module.css';

const menu = (props) => {
  let retModal = ''
  if(!props.isAuth){
    retModal = (
      <>
      <NavLink className={Classes.RedirectLink} to="/login">
        Login
      </NavLink>
      <NavLink className={Classes.RedirectLink} to="/signup">
        Signup
      </NavLink>
    </>
    )
  }else{
    retModal = (
      <>
      <NavLink className={Classes.RedirectLink} to="/mytags">
        My Tags
      </NavLink>
      <NavLink className={Classes.RedirectLink} to="/tagidea">
        Tag an Idea
      </NavLink>
      <NavLink className={Classes.RedirectLink} onClick={props.clicked} to="/">
        Logout
      </NavLink>
    </>
    )
  }
  return (
   <>{retModal}</>
  );
};

export default menu;
