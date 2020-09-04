// import React, {useRef} from 'react';
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Classes from './RestrictedPage.module.css';

const RestrictedPage = (props) => {
  // const nodeRef = useRef(null);
  return (
    <CSSTransition
      // nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={3000}
      classNames={{
        enterActive: Classes['fadeslide-enter-active'],
      }}
    >
      <div className={Classes.RestrictedPageShow}>
        <p>Oops! Something went wrong,</p>
        <p>
          looks like you are not{' '}
          <a href="/login" className={Classes.ErrorLink}>
            logged in
          </a>
          .
        </p>
        If you do not have an account with us, please{' '}
        <a href="/signup" className={Classes.ErrorLink}>
          Sign up
        </a>
        .
      </div>
    </CSSTransition>
  );
};

export default RestrictedPage;