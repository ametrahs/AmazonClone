import { useReducer } from 'react'
import {Type} from './action.type'

export const initialState ={
    basket :[]
}

export const reducer =(state,action) =>{
 switch(action.type){
    case Type.ADD_TO_BASKET:
        const existingItem =state.basket.find((item) => item.id === action.item.id )
       /*  return{
           ...state,
           basket:[...state.basket,action.item]
        } */
        
        default:
        return state;
 }
}
// const [state, dispatch] = useReducer(reducer,initialState)