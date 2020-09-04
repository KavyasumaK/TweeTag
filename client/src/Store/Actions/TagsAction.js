import AxiosInstance from '../../AxiosInstance';

const setTags = (tags) => {
  return {
    type: 'POPULATE_TAGS',
    tags,
  };
};

const setCategory = (category) => {
  return {
    type: 'CATEGORY_CLICKED',
    category,
  };
};

const fetchTagsFailed = () => {
  return {
    type: 'FETCH_TAGS_FAILED',
  };
};
const postSuccess = (status) => {
  return {
    type: 'SUCCESS',
    status,
  };
};

const postFailure = (err) => {
  return {
    type: 'FAILURE',
    err,
  };
};

const deleteSuccess = (status) => {
  initMyTags();
  return {
    type: 'DELETE_SUCCESS',
  };
};

const deleteFailure = (err) => {
  return {
    type: 'DELETE_FAILURE',
    err,
  };
};

const updateFailure = (err) =>{
  return{
    type:'UPDATE_FAILURE',
    err,
  }
}

export const clearSuccess = () => {
  return {
    type: 'CLEAR_SUCCESS',
  };
};

export const categoryClicked = (category) => {
  return (dispatch) => {
    dispatch(setCategory(category));
  };
};

export const initTags = () => {
  return (dispatch) => {
    AxiosInstance.get('tags/gettags')
      .then((response) => {
        dispatch(setTags(response.data.tags));
      })
      .catch((err) => {
        dispatch(fetchTagsFailed());
      });
  };
};

export const initMyTags = () => {
  return (dispatch) => {
    AxiosInstance({
      method: 'GET',
      url: 'users/mytags',
      withCredentials: true,
    })
      .then((response) => {
        dispatch(setTags(response.data.myTags));
      })
      .catch((err) => {
        dispatch(fetchTagsFailed());
      });
  };
};

export const addTag = (formContent) => {
  return (dispatch) => {
    AxiosInstance({
      method: 'POST',
      url: 'tags/addtag',
      data: formContent,
      withCredentials: true,
    })
      .then((res) => {
        dispatch(postSuccess(res));
      })
      .catch((err) => {
        if (err.response) dispatch(postFailure(err.response));
        else dispatch(postFailure('Could not add the tag...'));
      });
  };
};

export const deleteTag = (userID, tagID) => {
  return (dispatch) => {
    AxiosInstance({
      method: 'DELETE',
      url: `/tags/:${tagID}`,
      data: {
        userID,
        tagID,
      },
      withCredentials: true,
    })
      .then((res) => {
        dispatch(deleteSuccess(res));
        dispatch(initMyTags())
      })
      .catch((err) => dispatch(deleteFailure(err)));
  };
};

export const updateTag = (userID,tagID, newTag)=>{
  return(dispatch=>{
    AxiosInstance({
      method:'PATCH',
      url:`/tags/${tagID}`,
      data: {
        userID,
        tagID,
        newTag
      },
      withCredentials:true
    }).then(res=>{
      dispatch(initMyTags());
    }).catch(err=>{
      console.log(err.response)
      dispatch(updateFailure(err));
    });
    });
  }