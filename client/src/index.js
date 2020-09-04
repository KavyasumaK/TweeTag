import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux'; 
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import TagsReducer from './Store/Reducers/TagsReducer';
import AuthReducer from './Store/Reducers/AuthReducer';

const rootReducer = combineReducers({TagsReducer,AuthReducer})
const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


