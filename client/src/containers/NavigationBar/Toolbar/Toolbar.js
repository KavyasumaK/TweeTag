import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Classes from './Toolbar.module.css';
import { categoryClicked } from '../../../Store/Actions/TagsAction';
import { checkAuthed, logout } from '../../../Store/Actions/AuthAction';
import Logo from '../../../assets/Images/logo.png';
import IMGCat from '../../../assets/Images/YelloCat.png';
import Menu from '../../../components/Menu/Menu';
import SideDrawer from '../../../components/SideDrawer/SideDrawer';

class toolBar extends React.Component {
  state = {
    showMenu: 'close',
    showSideDrawer: 'close',
  };

  componentDidMount=()=>{
    this.props.oncheckIsAuth();
  }

  openCloseHandler = (key) => {
    let menuState = this.state[key] === 'open' ? 'close' : 'open';
    this.setState({ [key]: menuState });
  };

  onCategoryClickedHandler = (el) => {
    this.props.onCategoryClicked(el);
    this.setState({ showSideDrawer: 'close' });
  };

  render() {
    let filterClasses = [Classes.Filter];
    if(window.location.href.includes('login')||window.location.href.includes('signup')||window.location.href.includes('tagidea')||window.location.href.includes('mytags')) filterClasses.push(Classes.FilterRestriction);

    
    let drawerClasses = [Classes.ModalItems,Classes.DrawerItems];
    if (this.state.showSideDrawer === 'close') {
      drawerClasses.push(Classes.Close);
    }
    
    let categories = '';
    if (this.props.tags && !this.props.error) {
      categories = (
        <SideDrawer
          tags={[...this.props.tags]}
          categoryClicked={this.onCategoryClickedHandler}
        ></SideDrawer>
      );
    }

    return (
      <div className={Classes.ToolBar}>
        {/* Show sideDrawer omenu only on smaller screens */}
        <div onClick={()=>this.openCloseHandler('showSideDrawer')} className={Classes.CategoryContainer}>
          <img src={IMGCat} alt="Categories" className={filterClasses.join(' ')}></img>
          <div className={drawerClasses.join(' ')}>{categories}</div>
        </div>

        {/* Renders Logo links to home page */}
        <Link to="/">
          <img src={Logo} alt="Tag" className={Classes.Logo}></img>
        </Link>

        {/* Menu drop down */}
       
            <div>
            <Menu isAuth={this.props.isAuth} clicked = {this.props.onLogout}/>
            </div>      

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tags: state.TagsReducer.tags,
    error: state.TagsReducer.error,
    isAuth: state.AuthReducer.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryClicked: (category) => dispatch(categoryClicked(category)),
    oncheckIsAuth: () => dispatch(checkAuthed()),
    onLogout: ()=> dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toolBar);
