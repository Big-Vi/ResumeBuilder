import {Action} from '../actions/index';
import {ActionType} from '../action-types/index';

const initialState = {
  resumeTitle: '',
  name: '',
  personalStatement: '',
  email: '',
  mobile: '',
  visaStatus: '',
  location: '',
  experiences: [],
  clickedResume: [],
};

function ResumeReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.SET_RESUME_TITLE_STATE:
      return {
        ...state,
        resumeTitle: action.payload,
      };
    case ActionType.SET_RESUME_NAME_STATE:
      return {
        ...state,
        name: action.payload,
      };
    case ActionType.SET_RESUME_EMAIL_STATE:
      return {
        ...state,
        email: action.payload,
      };
    case ActionType.SET_RESUME_MOBILE_STATE:
      return {
        ...state,
        mobile: action.payload,
      };
    case ActionType.SET_RESUME_VISA_STATE:
      return {
        ...state,
        visa: action.payload,
      };
    case ActionType.SET_RESUME_LOCATION_STATE:
      return {
        ...state,
        location: action.payload,
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
