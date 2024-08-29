import { createSlice } from '@reduxjs/toolkit'

const initialState = null


const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        addNotification:(state,action)=>{
            return {
                text : action.payload.text,
                type : action.payload.type
            };
        },
        clearNotifications:()=>{
            return null
        }
    }
})

export const {addNotification, clearNotifications} = notificationSlice.actions

export default notificationSlice.reducer