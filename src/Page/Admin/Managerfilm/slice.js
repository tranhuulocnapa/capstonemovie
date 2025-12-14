import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
    filmDetail: null
}

export const addFlim = createAsyncThunk("film/addfilmslice", async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post("QuanLyPhim/ThemPhimUploadHinh", formData)

        return response.data.content
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getFilmDetail = createAsyncThunk(
    "film/detail",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
            );
            return res.data.content;
        } catch (err) {
            return rejectWithValue(err.response?.data || err);
        }
    }
);

export const updateFilm = createAsyncThunk(
    "film/update",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.post(
                "QuanLyPhim/CapNhatPhimUpload",
                formData
            );
            return res.data.content;
        } catch (err) {
            return rejectWithValue(err.response?.data || err);
        }
    }
);

const addFilmslice = createSlice({
    name: "filmslice",
    initialState,
    reducers: {
        clearFilmDetail: (state) => {
            state.filmDetail = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(addFlim.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFlim.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addFlim.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------- DETAIL ---------- */
            .addCase(getFilmDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFilmDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.filmDetail = action.payload;
            })
            .addCase(getFilmDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------- UPDATE ---------- */
            .addCase(updateFilm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFilm.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(updateFilm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})


export const { clearFilmDetail } = addFilmslice.actions;
export default addFilmslice.reducer