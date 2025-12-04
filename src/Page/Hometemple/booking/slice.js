import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
    selectedSeats: []
};

// 👉 Chỉ GET danh sách phòng vé — KHÔNG đặt vé ở đây
export const bookinglMovie = createAsyncThunk(
    "bookingmovie/getRoom",
    async (maLichChieu, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
            );
            return res.data.content;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// 👉 API đặt vé gọi riêng khi người dùng Nhấn Thanh Toán
export const submitBooking = createAsyncThunk(
    "bookingmovie/submitBooking",
    async (ticket, { rejectWithValue }) => {
        try {
            const res = await api.post("QuanLyDatVe/DatVe", ticket);
            return res.data.content;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


const bookingMovieslice = createSlice({
    name: "bookingMovieslice",
    initialState,
    reducers: {
        toggleSeat(state, action) {
            const seat = action.payload;

            const exists = state.selectedSeats.find(s => s.maGhe === seat.maGhe);

            if (exists) {
                state.selectedSeats = state.selectedSeats.filter(
                    s => s.maGhe !== seat.maGhe
                );
            } else {
                state.selectedSeats.push(seat);
            }
        },

        setcomfirmBooking(state) {
            state.selectedSeats = [];
        }
    },

    extraReducers: (builder) => {
        builder
            // GET ROOM
            .addCase(bookinglMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(bookinglMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(bookinglMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SUBMIT BOOKING
            .addCase(submitBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitBooking.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(submitBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { toggleSeat, setcomfirmBooking } = bookingMovieslice.actions;
export default bookingMovieslice.reducer;
