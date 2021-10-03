import {combineReducers} from 'redux';
import userReducer from './UserReducer';
import ResumeReducer from './ResumeReducer';
const reducers = combineReducers({
  userReducer,
  ResumeReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
