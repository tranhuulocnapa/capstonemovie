import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const userinfoString = localStorage.getItem("user_admin")
const data = userinfoString ? JSON.parse(userinfoString) : null

const initialState = {
    loading: false,
    data: data, //giong nhau de data cung duoc
    error: null,
}


export const adduser = createAsyncThunk("user/adduserslice", async (user, { rejectWithValue }) => {
    try {
        const response = await api.post("QuanLyNguoiDung/ThemNguoiDung", user)

        return response.data.content
    } catch (error) {
        return rejectWithValue(error)
    }


})


const adduserslice = createSlice({
    name: "authslice",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(adduser.pending, (state) => {
                state.loading = true;
            })
            .addCase(adduser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(adduser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})



export default adduserslice.reducer