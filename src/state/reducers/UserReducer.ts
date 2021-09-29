import { Action } from '../actions/index'
import { ActionType } from '../action-types/index'

const initialState = {
    editState: false,
    previewState: false,
    clickedCL: []
}

function userReducer(state = initialState, action: Action) {
    switch(action.type) {
        case ActionType.SET_EDIT_STATE:
            return {...state, editState: action.payload}
        case ActionType.SET_PREVIEW_STATE:
            return {...state, previewState: action.payload}
        case ActionType.SET_CLICKED_CL_STATE:
            return {...state, clickedCL: action.payload}
        default:
            return state;
    }
}

export default userReducer