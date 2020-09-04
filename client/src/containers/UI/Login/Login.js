import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Classes from './Login.module.css';
import InputElements from '../../../components/InputElements/InputElements';
import { UniversalButton } from '../../../components/Button/Button';
import { submitForm, clearLogin } from '../../../Store/Actions/AuthAction';
import checkValidity from '../../../utils/checkValidity';

class Login extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'Email',
          placeholder: 'email address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
  };
  
  onComponentDidMount() {
    this.props.onClearLogin();
  }

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

  FormSubmitted = (event) => {
    event.preventDefault();
    let formContent = [];
    let formValid = true;
    for (let key in this.state.controls) {
      if (this.state.controls[key].value) {
        formContent.push({
          id: key,
          value: this.state.controls[key].value,
        });
      }
      formValid = formValid && this.state.controls[key].valid;
    }
    if (formContent.length !== 2) {
      this.setState({ errorMessage: 'Please enter all the fields' });
      return;
    }
    if (!formValid) {
      this.setState({ errorMessage: 'Please correct the highlighted fields' });
      return;
    } else {
      this.setState({ errorMessage: '' });
      this.props.onFormSubmit(formContent, 'login');
    }
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((el) => (
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
    let renderContent = '';
    if (this.props.success || this.props.signinSuccess)
      renderContent = <Redirect to="/" />;
    let error = this.props.failure;
    if (error) error = <div className={Classes.ErrorMessage}>{error}</div>;
    return (
      <>
        {renderContent}
        <form className={Classes.LoginForm} onSubmit={this.FormSubmitted}>
          {error}
          <div className={Classes.ErrorMessage}>{this.state.errorMessage}</div>
          {form}
          <UniversalButton title="Login"></UniversalButton>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signinSuccess: state.AuthReducer.signinSuccess,
    success: state.AuthReducer.loginSuccess,
    failure: state.AuthReducer.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formContent, path) =>
      dispatch(submitForm(formContent, path)),
    onClearLogin: () => dispatch(clearLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
