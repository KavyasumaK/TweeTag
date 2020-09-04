import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import './App.css';

import ToolBar from './containers/NavigationBar/Toolbar/Toolbar';
import TagPage from './containers/UI/TagPage/TagPage';
import MyTagPage from './containers/UI/MyTagPage/MyTagPage';
import Login from './containers/UI/Login/Login';
import Signup from './containers/UI/Signup/Signup';
import InsertTag from './containers/UI/InsertTag/InsertTag';
import Page404 from './components/Page404/Page404';

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <ToolBar></ToolBar>
        <Switch>
          <Route exact path='/' component={TagPage} />
          <Route path='/mytags' component={MyTagPage} />
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/tagidea' component={InsertTag}/>
          <Route component={Page404}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
