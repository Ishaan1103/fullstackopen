import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationSlice from '../redux/notificationSlice'
import blogReducer from '../redux/blogReducer'
import UserReducer from '../redux/userReducer'
import allusersReducer from '../redux/allusersReducer'

const rootreducer = combineReducers({
    notification: notificationSlice,
    blogs: blogReducer,
    loginUser: UserReducer,
    userList: allusersReducer
})

export const store = configureStore({
    reducer:rootreducer
})