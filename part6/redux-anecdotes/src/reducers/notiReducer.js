import { createSlice } from "@reduxjs/toolkit"

const notiSlice = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        setNotificationDef(state,action){
            return action.payload
        },
        clearNotification(state,action){
            return ''
        }
    }
})
export const {setNotificationDef,clearNotification} = notiSlice.actions

export const setNotification = (message,duration)=>{
    return dispatch =>{
        dispatch(setNotificationDef(message))
        setTimeout(()=>{
            dispatch(clearNotification())
        },duration * 1000)
    }
} 

export default notiSlice.reducer