import React from 'react';

import Classes from './TagCards.module.css';

const whenCategorySelected = (props) => {
  const newTag = (
    <React.Fragment>
      {props.tags.map((el) => {
        if (el.category === props.category) {
          return (
            <div className={Classes.NewTag} key={el._id}>
              <p className={Classes.UserName}>{el.user[0].name}</p>
              <p className={Classes.Tag}>{el.tag}</p>
            </div>
          );
        } else return '';
      })}
    </React.Fragment>
  );
  return newTag;
};

const noCategorySelected = (props) => {
  let tagClass = [Classes.Tag];
  let newTag = '';
  newTag = (
    <React.Fragment>
      {props.tags.map((el) => {
        return (
          <div className={Classes.NewTag} key={el._id}>
            <p className={Classes.UserName}>{el.user[0].name}</p>
            <p className={tagClass.join(' ')}>{el.tag}</p>
          </div>
        );
      })}
    </React.Fragment>
  );
  return newTag;
};

const tagCard = (props) => {
  let newTag = '';
  if (props.tags && (props.category === 'All' || !props.category)) {
    newTag = noCategorySelected(props);
  } else if (props.tags && props.category) {
    newTag = whenCategorySelected(props);
  }
  return <div className={Classes.AllTags}>{newTag}</div>;
};

export default tagCard;
