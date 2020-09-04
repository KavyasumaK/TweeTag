import AxiosInstance from '../../AxiosInstance';

const postSuccess = (status, path) => {
  let actionType = path === 'login' ? 'LOGIN_SUCCESS' : 'SIGNIN_SUCCESS';
  return {
    type: actionType,
    status,
  };
};

const postFailure = (err, path) => {
  let actionType = path === 'login' ? 'LOGIN_FAILURE' : 'SIGNIN_FAILURE';
  return {
    type: actionType,
    err,
  };
};

const isAuthSuccess = (user) => {
  return {
    type: 'IS_AUTH_SUCCESS',
    user,
  };
};

const isAuthFailure = (err) => {
  return {
    type: 'IS_AUTH_FAILURE',
    err,
  };
};

const postToDB = (formObj, path) => {
  return (dispatch) => {
    AxiosInstance({
      method: 'post',
      url: `users/${path}`,
      data: formObj,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        dispatch(postSuccess(res.data.data.user, path));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response)
          dispatch(postFailure(err.response.data.message, path));
        else dispatch(postFailure('Could not add...'));
      });
  };
};

const logOutSuccess = () => {
  return { type: 'LOGOUT_SUCCESS' };
};

export const clearLogin = () => {
  return {
    type: 'CLEAR_LOGIN',
  };
};

export const clearSignup = () => {
  return {
    type: 'CLEAR_LOGIN',
  };
};

export const submitForm = (formData, path) => {
  return (dispatch) => {
    let formObj = {};
    formData.forEach((element) => {
      formObj[element.id] = element.value;
    });
    dispatch(postToDB(formObj, path));
  };
};

export const checkAuthed = () => {
  return (dispatch) => {
    AxiosInstance({
      method: 'GET',
      url: 'users/userexists',
      withCredentials: true,
    })
      .then((res) => {
        dispatch(isAuthSuccess(res.data.data.user));
      })
      .catch((err) => {
        if (err.response) dispatch(isAuthFailure(err.response.data.message));
        else dispatch(isAuthFailure('Something went wrong...'));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    AxiosInstance({
      method: 'GET',
      url: 'users/logout',
      withCredentials: true,
    })
      .then((res) => {
        dispatch(logOutSuccess());
      })
      .catch((err) => {
        dispatch(isAuthFailure(err.response.data.message));
      });
  };
};
