import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const initialState = {
    loading: false,
    data: [],
    error: null,
}

export const film = createAsyncThunk("film/filmslice", async (__, { rejectWithValue }) => {
    try {
        const response = await api.get("QuanLyPhim/LayDanhSachPhim")

        return response.data.content
    } catch (error) {
        return rejectWithValue(error)
    }
})

const filmslice = createSlice({
    name: "filmslice",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(film.pending, (state) => {
                state.loading = true;
            })
            .addCase(film.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(film.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default filmslice.reducer