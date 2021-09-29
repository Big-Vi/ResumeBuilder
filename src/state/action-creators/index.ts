import { ActionType } from '../action-types'
import { Dispatch } from'redux'
import { Action } from '../actions/index'

export const setEditState = (payload: boolean) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_EDIT_STATE,
            payload: payload
        })
    }
}

export const setPreviewState = (payload: boolean) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_PREVIEW_STATE,
            payload: payload
        })
    }
}

export const setClickedCL = (payload: []) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_CLICKED_CL_STATE,
            payload: payload
        })
    }
}