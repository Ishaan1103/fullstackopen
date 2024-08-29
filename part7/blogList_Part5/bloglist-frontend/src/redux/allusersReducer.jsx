import { createSlice } from '@reduxjs/toolkit'
const initialState = []

const userListSlicer = createSlice({
    name:'USER_ALL',
    initialState,
    reducers:{
        getUser:(state,action)=>{
            state.push(action.payload)
        }
    }
})

export const { getUser } = userListSlicer.actions

export default userListSlicer.reducer

