import {combineReducers} from 'redux'
import {authReducers} from './authReducers'
import {productReducers} from './productReducers'
export const Reducers = combineReducers({
    authReducers,
    productReducers
})
