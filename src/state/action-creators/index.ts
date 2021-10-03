import {ActionType} from '../action-types';
import {Dispatch} from 'redux';
import {Action} from '../actions/index';

export const setEditState = (payload: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_EDIT_STATE,
      payload: payload,
    });
  };
};

export const setViewState = (payload: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_VIEW_STATE,
      payload: payload,
    });
  };
};

export const setPreviewState = (payload: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_PREVIEW_STATE,
      payload: payload,
    });
  };
};

export const setClickedCL = (payload: []) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CLICKED_CL_STATE,
      payload: payload,
    });
  };
};

export const setClickedResume = (payload: []) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_CLICKED_RESUME_STATE,
      payload: payload,
    });
  };
};

export const setResumeName = (payload: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_RESUME_NAME_STATE,
      payload: payload,
    });
  };
};

export const setResumePersonalStatement = (payload: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_RESUME_PERSONAL_STATEMENT_STATE,
      payload: payload,
    });
  };
};
