import {createSlice, createAsyncThunk} from "@reduxjs/toolkit" 

const draftSlice = createSlice({
    name : "draft",
    initialState:{
        text:"",
        status:"idle",
        error:null
    },
    reducers:{
        setDraft(state, action){
            state.text = action.payload.text
        }
    }
})

export const {setDraft} = draftSlice.actions
export default draftSlice.reducer