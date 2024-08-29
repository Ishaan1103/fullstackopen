import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogReducer = createSlice({
    name:'blogs',
    initialState,
    reducers:{
        addBlog:(state,action)=>{
            state.push(action.payload)
        },
        setBlogs: (state, action) => {
            return action.payload;
        },
        addlike:(state,action)=>{
            return state.map( (blog) => blog.id === action.payload.id ? action.payload: blog)
        },
        removeBlog:(state,action)=>{
            return state.filter( (blog) => blog.id !== action.payload.id )
        }
    }
})

export const { addBlog, setBlogs, addlike, removeBlog } = blogReducer.actions

export default blogReducer.reducer