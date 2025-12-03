import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import api from "../../../service/api";


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const bookinglMovie = createAsyncThunk("bookingmovie", async (maLichChieu, { rejectWithValue }) => {
    try {
        const result = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)

        return result.data.content

    } catch (error) {
        return rejectWithValue(error)
    }
})



const bookingMovieslice = createSlice({
    name: "bookingMovieslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(bookinglMovie.pending, (state) => {
            state.loading = true
        });

        builder.addCase(bookinglMovie.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(bookinglMovie.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default bookingMovieslice.reducer