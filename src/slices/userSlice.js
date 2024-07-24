import {createSlice, createAsyncThunk} from "@reduxjs/toolkit" 

export const fetchLogin = createAsyncThunk("user/fetchLogin", async(reqInfo)=>{
    const res = await fetch('http://localhost:3080/api/auth', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(reqInfo)
    })
    const data =  await res.json()
    return data
})      

export const addUser = createAsyncThunk("user/addUser", async(reqInfo)=>{
    const res = await fetch('http://localhost:3080/api/signup', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(reqInfo)
    })
    const data =  await res.json()
    return data
})      

const userSlice = createSlice({
    name : "user",
    initialState:{
        loggedIn : false,
        email: null,
        status:"idle",
        error:null
    },
    reducers:{
        setLogin(state, action){
            state.loggedIn = action.payload.loggedIn
        },
        setEmail(state, action){
            state.email = action.payload.email
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchLogin.pending, (state, action)=>{
            state.status = "loading"
        })
        .addCase(fetchLogin.fulfilled, (state, action)=>{
            state.status = "succeeded"
        })
        .addCase(fetchLogin.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.error.message
        })
        .addCase(addUser.rejected, (state, action)=>{
            state.error = action.error.message
        })
    }
})

export const {setLogin, setEmail} = userSlice.actions
export default userSlice.reducer