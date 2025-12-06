import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../../../service/api";

const initialState = {
    loading: false,
    data: null,
    error: null,
}


export const authService = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
    try {
        const response = await api.post("QuanLyNguoiDung/DangNhap", user)


        const roloes = response.data.content.maLoaiNguoiDung
        if (roloes === "KhachHang") {
            return rejectWithValue({
                response: {
                    data: {
                        content: "bạn không có quyền truy cập trang này"
                    }
                }
            })
        }

        return response.data.content
    } catch (error) {
        return rejectWithValue(error)
    }


})


const authslice = createSlice({
    name: "authslice",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(authService.pending, (state) => {
                state.loading = true;
            })
            .addCase(authService.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(authService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})



export default authslice.reducer