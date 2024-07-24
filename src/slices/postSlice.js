//deprecated
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit" 

export const addPost = createAsyncThunk("post/addPost", async(reqInfo)=>{
    const res = await fetch('http://localhost:3080/api/post', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(reqInfo)
    })
    const data =  await res.json()
    return data
})

const postSlice = createSlice({
    name : "post",
    initialState:{
        posts:[],
        status:"idle",
        error:null
    },
    reducers:{
        appendPost(state, action){
            state.posts.push(action.payload)
        },
        setPosts(state, action){
            state.posts = action.payload
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(addPost.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(addPost.fulfilled, (state, action)=>{
            state.status = "succeeded"
        })
        .addCase(addPost.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export const {appendPost, setPosts} = postSlice.actions
export default postSlice.reducer