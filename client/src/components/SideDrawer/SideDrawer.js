import React from 'react';

import Classes from './SideDrawer.module.css';


const sideDrawer =(props)=>{
  let categoryElements='';
  if(props.tags){
    let distinctCategory = Array.from(new Set(props.tags.map(el=>el.category)));
    distinctCategory.sort();
    categoryElements = (
      <React.Fragment>
        {distinctCategory.map(el=>{
          return <p key={el} onClick={()=>props.categoryClicked(el)}>{el}</p>
        })}
      </React.Fragment>
    );
  }
    return(
      <div className={Classes.SideDrawer}>
        <p onClick={()=>props.categoryClicked('All')}>All Categories</p>
        {categoryElements}
      </div>
    );
}

export default sideDrawer;