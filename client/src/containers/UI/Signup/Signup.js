import React from 'react';
import { connect } from 'react-redux';

import InputElements from '../../../components/InputElements/InputElements';
import {UniversalButton} from '../../../components/Button/Button';
import Classes from './Signup.module.css';
import checkValidity from '../../../utils/checkValidity';
import { submitForm, clearSignup } from '../../../Store/Actions/AuthAction';
import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
  state = {
    errorMessage: '',
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'UserName',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
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
      DOB: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'YYYY-MM-DD (Date of Birth)',
        },
        value: '',
        validation: {
          required: true,
          isDate: true,
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
      passwordConfirm: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm password',
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

  componentDidMount = () => {
    this.props.onclearSignup();
  };

  onChangedHandler = (event, controlName) => {
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
    if (formContent.length !== 5) {
      this.setState({ errorMessage: 'Please enter all the fields' });
      return;
    }
    if (!formValid) {
      this.setState({ errorMessage: 'Please correct the highlighted fields' });
      return;
    }
    if (formContent[3].value !== formContent[4].value) {
      this.setState({ errorMessage: 'Passwords do not Match' });
      return;
    } else {
      this.setState({ errorMessage: '' });
      this.props.onFormSubmit(formContent, 'signup');
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
        changed={(event) => this.onChangedHandler(event, el.id)}
      />
    ));
    let redirectContent = '';
    if (this.props.success || this.props.loginSuccess)
      redirectContent = <Redirect to="/" />;
    let error = this.props.failure;
    if (error) error = <div className={Classes.ErrorMessage}>{error}</div>;

    return (
      <>
        {redirectContent}
        <form className={Classes.SignupForm} onSubmit={this.FormSubmitted}>
          {error}
          <div className={Classes.ErrorMessage}>{this.state.errorMessage}</div>
          {form}
          <UniversalButton title="Register"></UniversalButton>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginSuccess: state.AuthReducer.loginSuccess,
    success: state.AuthReducer.signinSuccess,
    failure: state.AuthReducer.signinFailure,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formContent, path) =>
      dispatch(submitForm(formContent, path)),
    onclearSignup: () => dispatch(clearSignup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
