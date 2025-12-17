import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const initialState = {
    loading: false,
    data: [],
    error: null,
    cinemaClusters: [],
    showtimedata: null,
};

export const infocinema = createAsyncThunk(
    "infocinema/infocinemaslice",
    async (__, { rejectWithValue }) => {
        try {
            const response = await api.get(
                "QuanLyRap/LayThongTinHeThongRap",
            );
            return response.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

export const cinemaCluster = createAsyncThunk(
    "cinemaCluster/cinemaClusterslice",
    async (maHeThongRap, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
            );
            return response.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);

export const showtime = createAsyncThunk(
    "showtime/showtimeslice",
    async (schedule, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "QuanLyDatVe/TaoLichChieu", schedule
            );
            return response.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data || error);
        }
    }
);


const createShowtimeSlice = createSlice({
    name: "createShowtime",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(infocinema.pending, (state) => {
                state.loading = true;
            })
            .addCase(infocinema.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(infocinema.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(cinemaCluster.pending, (state) => {
                state.loading = true;
            })
            .addCase(cinemaCluster.fulfilled, (state, action) => {
                state.loading = false;
                state.cinemaClusters = action.payload;
            })
            .addCase(cinemaCluster.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(showtime.pending, (state) => {
                state.loading = true;
            })
            .addCase(showtime.fulfilled, (state, action) => {
                state.loading = false;
                state.showtimedata = action.payload;
            })
            .addCase(showtime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default createShowtimeSlice.reducer;
