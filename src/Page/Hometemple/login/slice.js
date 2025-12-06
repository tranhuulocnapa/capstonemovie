import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
};
export const registerMovie = createAsyncThunk(
    "user/registerMovie",
    async (data, thunkAPI) => {
        try {
            const res = await axios.post(
                "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
                data
            );
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const registerMovieslice = createSlice({
    name: "register",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(registerMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(registerMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default registerMovieslice.reducer;
