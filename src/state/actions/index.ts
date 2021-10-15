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
interface ResumeTitleAction {
  type: ActionType.SET_RESUME_TITLE_STATE;
  payload: string;
}
interface ResumeNameAction {
  type: ActionType.SET_RESUME_NAME_STATE;
  payload: string;
}
interface ResumeEmailAction {
  type: ActionType.SET_RESUME_EMAIL_STATE;
  payload: string;
}
interface ResumeMobileAction {
  type: ActionType.SET_RESUME_MOBILE_STATE;
  payload: string;
}
interface ResumeVisaAction {
  type: ActionType.SET_RESUME_VISA_STATE;
  payload: string;
}
interface ResumeLocationAction {
  type: ActionType.SET_RESUME_LOCATION_STATE;
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
  | ResumeTitleAction
  | ResumeNameAction
  | ResumeEmailAction
  | ResumeMobileAction
  | ResumeLocationAction
  | ResumeVisaAction
  | ResumePersonalStatmentAction;
