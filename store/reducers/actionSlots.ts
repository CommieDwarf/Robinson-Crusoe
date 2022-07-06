import { AnyAction } from 'redux'
import {ADD_ACTION_SLOT} from '../types'




const initialState = {
    
}



export default function(state = initialState, action: AnyAction){

    switch(action.type){

        case ADD_ACTION_SLOT:
        return {
           ...state,
           [action.id]: action.ref
        }
        
        default: return state
    }

}