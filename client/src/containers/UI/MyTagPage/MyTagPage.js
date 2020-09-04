import React from 'react';
import { connect } from 'react-redux';

import Classes from './MyTagPage.module.css';
import { initMyTags, clearSuccess } from '../../../Store/Actions/TagsAction';
import { checkAuthed } from '../../../Store/Actions/AuthAction';
import MyTagCards from '../../../components/MyTagCard/MyTagCard';
import RestrictedPage from '../../../components/RestrictedPage/RestrictedPage';

class MyTagPage extends React.Component {
  state = {
    tTags: '',
  };

  componentDidMount() {
    this.props.onCheckAuthed();
    this.props.onInitMyTags();
  }

  static getDerivedStateFromProps(nextProps) {
    return { tTags: [...nextProps.tags] };
  }

  render() {
    const tempTags = [...this.state.tTags];
    const authFail = this.props.isAuthFail;
    let tagsGotten = '';
    if (!authFail) {
      tagsGotten = this.props.error ? (
        <div>Tags not found</div>
      ) : (
        <div>Loading...</div>
      );
      if (tempTags && !this.props.error) {
        tagsGotten = <MyTagCards tags={tempTags} myTags={true}></MyTagCards>;
      }
    }

    if (this.props.isAuth && tempTags.length === 0) {
      tagsGotten = (
        <div className={Classes.NoTags}>
          You do not have any tagged ideas yet. Please tag one.
        </div>
      );
    }
    return (
      <>
        <div className={Classes.MyTagPage}>
          {tagsGotten}
        </div>
        <RestrictedPage show={authFail ? true : false}>
          <p>Oops! Cannot find your tags</p>
        </RestrictedPage>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.TagsReducer.tags,
    error: state.TagsReducer.error,
    isAuthFail: state.AuthReducer.isAuthFail,
    isAuth: state.AuthReducer.isAuth,
    isDeleteFail: state.TagsReducer.deleteFailure,
    isUpdateFail: state.TagsReducer.updateFailure,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMyTags: () => dispatch(initMyTags()),
    onCheckAuthed: () => dispatch(checkAuthed()),
    onClearSuccess: () => dispatch(clearSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTagPage);
