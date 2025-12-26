import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const userinfoString = localStorage.getItem("user_admin")
const data = userinfoString ? JSON.parse(userinfoString) : null

const initialState = {
    loading: false,
    data: data,
    error: null,
    users: [],

}


export const adduser = createAsyncThunk("user/adduserslice", async (user, { rejectWithValue }) => {
    try {
        const response = await api.post("QuanLyNguoiDung/ThemNguoiDung", user)

        return response.data.content
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const listuser = createAsyncThunk("listuser/listuserslice", async (__, { rejectWithValue }) => {
    try {
        const response = await api.get("https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")

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

            .addCase(listuser.pending, (state) => {
                state.loading = true;
            })
            .addCase(listuser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(listuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
})



export default adduserslice.reducer