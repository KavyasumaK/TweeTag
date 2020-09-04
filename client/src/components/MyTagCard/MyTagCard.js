import React from 'react';
import { connect } from 'react-redux';

import Classes from './MyTagCard.module.css';
import EditModal from './EditModal/EditModal';
import { deleteTag, updateTag } from '../../Store/Actions/TagsAction';
import {EditButton} from '../Button/Button';

class TagCard extends React.Component {
  state = {
    showModal: false,
    updateTag: '',
  };

  showModal = (el) => {
    this.setState({
      updateTag: el,
      showModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      updateTag: '',
      showModal: false,
    });
  };

  deleteATag = (userID, tagID) => {
    this.props.onDeleteTag(userID, tagID);
    this.closeModal();
  };

  updateATag = (userID, tagID, body)=>{
    this.props.onUpdateTag(userID, tagID, body);
    this.closeModal();
  }

  render() {
    let tagClass = [Classes.Tag];
    let newTag = (
      <React.Fragment>
        {this.props.tags.map((el) => {
          return (
            <div className={Classes.NewTag} key={el._id}>
              <div className={tagClass.join(' ')}>{el.tag}</div>
              <EditButton editClicked={() => this.showModal(el)}></EditButton>
            </div>
          );
        })}

        <EditModal
          tagToBeUpdated={this.state.updateTag}
          show={this.state.showModal}
          close={this.closeModal}
          toDelete={this.deleteATag}
          toUpdate={this.updateATag}
        ></EditModal>
      </React.Fragment>
    );

    return (
      <>
        <div className={Classes.AllTags}>{newTag}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDelete: state.TagsReducer.deleteSuccess,
    isDeleteFail: state.TagsReducer.deleteFailure,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteTag: (userID, tagID) => dispatch(deleteTag(userID, tagID)),
    onUpdateTag: (userID, tagID, body) => dispatch(updateTag(userID, tagID, body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagCard);
