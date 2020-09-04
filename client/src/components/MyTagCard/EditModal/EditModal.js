import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import InputElements from '../../InputElements/InputElements';
import checkValidity from '../../../utils/checkValidity';
import { CloseButton, UpdateButton, DeleteButton } from '../../Button/Button';
import Classes from './EditModal.module.css';

class EditModal extends React.Component {
  state = {
    tag: {
      elementType: 'textarea',
      elementConfig: {
        type: 'Textarea',
        placeholder:
          'What do you want to tag? Tell the world in 250 characters.',
      },
      value: '',
      validation: {
        required: true,
        maxLength: 250,
      },
      valid: false,
      touched: false,
    },
  };

  inputChangedHandler = (event) => {
    const updatedControls = {
      ...this.state.tag,
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.tag.validation),
      touched: true,
    };
    this.setState({ tag: updatedControls });
  };

  render() {
    let tagToUpdate = this.state.tag;
    return (
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={this.props.show}
        timeout={3000}
        classNames={{
          enterActive: Classes['fadeslide-enter-active'],
          exitActive: Classes['fadeslide-exit-active'],
        }}
      >
        <div className={Classes.ModalBackground}>
          <div className={Classes.EditModal}>
            <CloseButton clicked={this.props.close} title="x" />
            <InputElements
              elementType={tagToUpdate.elementType}
              elementConfig={tagToUpdate.elementConfig}
              value={
                tagToUpdate.value
                  ? tagToUpdate.value
                  : this.props.tagToBeUpdated.tag
              }
              invalid={!tagToUpdate.valid}
              shouldValidate={tagToUpdate.validation}
              touched={tagToUpdate.touched}
              changed={(event) => this.inputChangedHandler(event)}
            />
            <div className={Classes.ButtonPositions}>
              <UpdateButton
                updateClicked={() =>
                  this.props.toUpdate(
                    this.props.tagToBeUpdated.user[0]._id,
                    this.props.tagToBeUpdated._id,
                    tagToUpdate.value
                  )
                }
                title={'Update'}
              />
              <DeleteButton
                deleteClicked={() =>
                  this.props.toDelete(
                    this.props.tagToBeUpdated.user[0]._id,
                    this.props.tagToBeUpdated._id
                  )
                }
                title={'Delete'}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default EditModal;
