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
        const movies = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
        const cinemaSystems = await api.get("QuanLyRap/LayThongTinHeThongRap")
        const hethongrap = await api.get("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01")


        return {
            movies: movies.data.content,
            cinemaSystems: cinemaSystems.data.content,
            hethongrap: hethongrap.data.content,
        }

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