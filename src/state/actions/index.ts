import {ActionType} from '../action-types/index';

interface EditstateAction {
  type: ActionType.SET_EDIT_STATE;
  payload: boolean;
}
interface ViewstateAction {
  type: ActionType.SET_VIEW_STATE;
  payload: boolean;
}
interface PreviewStateAction {
  type: ActionType.SET_PREVIEW_STATE;
  payload: boolean;
}
interface ClickedCLAction {
  type: ActionType.SET_CLICKED_CL_STATE;
  payload: [];
}
interface ClickedResumeAction {
  type: ActionType.SET_CLICKED_RESUME_STATE;
  payload: [];
}
interface ResumeNameAction {
  type: ActionType.SET_RESUME_NAME_STATE;
  payload: string;
}
interface ResumePersonalStatmentAction {
  type: ActionType.SET_RESUME_PERSONAL_STATEMENT_STATE;
  payload: string;
}

export type Action =
  | EditstateAction
  | ViewstateAction
  | PreviewStateAction
  | ClickedCLAction
  | ClickedResumeAction
  | ResumeNameAction
  | ResumePersonalStatmentAction;
