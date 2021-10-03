import {Action} from '../actions/index';
import {ActionType} from '../action-types/index';

const initialState = {
  name: 'New resume',
  personalStatement: 'Hardworking',
  clickedResume: [],
};

function ResumeReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.SET_RESUME_NAME_STATE:
      return {
        ...state,
        name: action.payload,
      };
    case ActionType.SET_RESUME_PERSONAL_STATEMENT_STATE:
      return {
        ...state,
        personalStatement: action.payload,
      };
    case ActionType.SET_CLICKED_RESUME_STATE:
      return {...state, clickedResume: action.payload};
    default:
      return state;
  }
}

export default ResumeReducer;
