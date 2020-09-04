import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import InputElements from '../../../components/InputElements/InputElements';
import { UniversalButton } from '../../../components/Button/Button';
import checkValidity from '../../../utils/checkValidity';
import Classes from './InsertTag.module.css';
import { checkAuthed } from '../../../Store/Actions/AuthAction';
import { addTag, clearSuccess } from '../../../Store/Actions/TagsAction';
import RestrictedPage from '../../../components/RestrictedPage/RestrictedPage';

class InsertTag extends React.Component {
  state = {
    errorMessage: '',
    controls: {
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
      category: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'General', displayValue: 'General' },
            { value: 'Fun', displayValue: 'Fun' },
            { value: 'LOTR', displayValue: 'LOTR' },
            { value: 'Anime', displayValue: 'Anime' },
          ],
        },
        value: 'General',
        validation: {
          required: true,
        },
        valid: true,
      },
    },
  };

  componentDidMount = () => {
    //Clear the success flags from previous auths
    this.props.onSuccessClear();
    //Check if the user has permission to access the page
    this.props.toCheckAuthed();
  };

  //To handle form submission
  taggedHandler = (event) => {
    event.preventDefault();
    let formContent;
    //When user inserted form is valid
    if (this.state.controls.tag.valid) {
      formContent = {
        tag: this.state.controls.tag.value,
        category: this.state.controls.category.value,
      };
      this.setState({ errorMessage: '' });
      this.props.onFormSubmit(formContent);
    }
    //To show error message in case of invalid entry.
    else {
      this.setState({
        errorMessage:
          'The tag description is required and should be less than 250 charactes',
      });
    }
  };

  //To handle change in input and check the validity as the user enters data.
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    let formShowArray = [Classes.InsertTag];
    if (this.props.isAuthFail) {
      formShowArray.push(Classes.InsertTagHide);
    }

    let success = '';
    if (this.props.success) {
      success = <Redirect to="/" />;
    }
    
    let failure = '';
    if (this.props.failure) {
      failure = <div>'Idea could not be tagged. Try again later.'</div>;
    }

    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = 'Loading...';
    form = formElementsArray.map((el) => (
      <InputElements
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        changed={(event) => this.inputChangedHandler(event, el.id)}
      />
    ));

  

    return (
      <>
        <RestrictedPage show={this.props.isAuthFail ? true : false} />
        {success}
        {failure}
        <div className={Classes.ErrorMessage}>{this.state.errorMessage}</div>
        <form className={formShowArray.join(' ')} onSubmit={this.taggedHandler}>
          {form}
          <UniversalButton title="Tagged"></UniversalButton>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthFail: state.AuthReducer.isAuthFail,
    success: state.TagsReducer.success,
    failure: state.TagsReducer.failure,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formContent) => {
      dispatch(addTag(formContent));
    },
    toCheckAuthed: () => {
      dispatch(checkAuthed());
    },
    onSuccessClear: () => {
      dispatch(clearSuccess());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertTag);
