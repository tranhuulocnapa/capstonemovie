import { configureStore } from "@reduxjs/toolkit"
import listMovieslice from "./../Page/Hometemple/Home/slice"
import DetailMovieslice from "./../Page/Hometemple/DetailMovie/slice"
import bookingMovieslice from "./../Page/Hometemple/booking/slice"
import loginMovieslice from "../Page/Hometemple/login/slice"
import authslice from "./../Page/Admin/auth/slice"
import adduserslice from "./../Page/Admin/user/slice"
import filmslice from "./../Page/Admin/Movide/slice"
import addFilmslice from "./../Page/Admin/Managerfilm/slice"
import createShowtimeSlice from "./../Page/Admin/Showtimefilm/slice"

const store = configureStore({
    reducer: {
        listMovieslice,
        DetailMovieslice,
        bookingMovieslice,
        loginMovieslice,
        authslice,
        adduserslice,
        filmslice,
        addFilmslice,
        createShowtimeSlice

    },
}
)
export default store;