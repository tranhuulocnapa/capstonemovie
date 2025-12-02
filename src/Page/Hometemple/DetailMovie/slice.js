import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'
import api from "../../../service/api";


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const fetchDetailMovie = createAsyncThunk("detailmovie", async (maPhim, { rejectWithValue }) => {
    try {
        // const result = await axios({
        //     url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
        //     method: "GET",
        //     headers: {
        //         TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk"
        //     },
        // })


        const result = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)

        const schedule = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
        return {
            schedule: schedule.data.content,
            movie: result.data.content
        }
    } catch (error) {
        return rejectWithValue(error)
    }
})



const DetailMovieslice = createSlice({
    name: "DetailMovieslice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetailMovie.pending, (state) => {
            state.loading = true
        });

        builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(fetchDetailMovie.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default DetailMovieslice.reducer