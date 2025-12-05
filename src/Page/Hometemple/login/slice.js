import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/api";

// Đăng nhập
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (payload, thunkAPI) => {
        try {
            const res = await api.post("QuanLyNguoiDung/DangNhap", payload);
            return res.data.content; // API trả về { content: {...} }
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.content || "Đăng nhập thất bại"
            );
        }
    }
);

// Đăng ký
export const dangKyThunk = createAsyncThunk(
    "user/dangKyThunk",
    async (payload, thunkAPI) => {
        try {
            const res = await api.post("QuanLyNguoiDung/DangKy", payload);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.content || "Đăng ký thất bại"
            );
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        userInfo: JSON.parse(localStorage.getItem("user")) || null,
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;

                // Lưu localStorage
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
