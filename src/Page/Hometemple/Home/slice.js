import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import api from "../../../service/api";


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchdata = createAsyncThunk("listmovie", async (__, { rejectWithValue }) => {
    try {
        // const result = await axios({
        //     url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
        //     method: "GET",
        //     headers: {
        //         TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk"
        //     },
        // })
        const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01")

        return result.data.content;
    } catch (error) {
        return rejectWithValue(error)
    }
})



const listMovieslice = createSlice({
    name: "listMovieslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchdata.pending, (state) => {
            state.loading = true
        });

        builder.addCase(fetchdata.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(fetchdata.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listMovieslice.reducer