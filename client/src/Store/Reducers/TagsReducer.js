const intialState = {
  tags: '',
  category: 'All',
  success: '',
  failure: '',
  deleteSuccess:'',
  deleteFailure:'',
  updateFailure:'',
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'POPULATE_TAGS': {
      return { ...state, tags: action.tags, error: false, success:'' };//success set to null for insert Tag page(had to be double clicked without that even with clear success)
    }
    case 'CATEGORY_CLICKED': {
      return { ...state, category: action.category };
    }
    case 'FETCH_TAGS_FAILED': {
      return { ...state, error: true, tags: '' };
    }
    case 'SUCCESS': {
      return { ...state, success: true, failure: false };
    }
    case 'FAILURE': {
      return { ...state, failure: true, success: false };
    }
    case 'DELETE_SUCCESS': {
      return { ...state, deleteSuccess: true, deleteFailure: '' };
    }
    case 'DELETE_FAILURE': {
      return { ...state, deleteFailure: action.err, deleteSuccess: false };
    }
    case 'UPDATE_FAILURE': {
      return { ...state, updateFailure: action.err};
    }
    case 'CLEAR_SUCCESS':{
      return {...state, success: false, failure: false, deleteSuccess:'',deleteFailure:''}
    }
    default:
      return state;
  }
};

export default reducer;
