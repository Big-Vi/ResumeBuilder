import {ActionType} from '../action-types/index';

interface EditstateAction {
  type: ActionType.SET_EDIT_STATE;
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

export type Action = EditstateAction | PreviewStateAction | ClickedCLAction;
