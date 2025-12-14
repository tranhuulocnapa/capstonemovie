import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/api";

const userlogin = localStorage.getItem("user_login")
const data = userlogin ? JSON.parse(userlogin) : null

const initialState = {
    loading: false,
    data,
    error: null,
    registerSuccess: false,
};
export const loginMovie = createAsyncThunk(
    "user/loginMovie",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.post("QuanLyNguoiDung/DangNhap", user)

            if (response.data.content.maLoaiNguoiDung === "QuanTri") {
                return rejectWithValue({
                    response: {
                        data: {
                            content: "Hãy đăng nhập bằng tài khoản khách hàng"
                        }
                    }
                })
            }

            localStorage.setItem("user_login", JSON.stringify(response.data.content))

            return response.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const regisMovie = createAsyncThunk(
    "user/registerMovie",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.post("QuanLyNguoiDung/DangKy", user)

            return response.data.content;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


const loginMovieslice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(state) {
            state.data = null;
            localStorage.removeItem("user_login");
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(loginMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register
            .addCase(regisMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.registerSuccess = false;
            })
            .addCase(regisMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.registerSuccess = true;
            })
            .addCase(regisMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = loginMovieslice.actions;
export default loginMovieslice.reducer;
