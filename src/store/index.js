import { configureStore } from "@reduxjs/toolkit"
import listMovieslice from "./../Page/Hometemple/Home/slice"
import DetailMovieslice from "./../Page/Hometemple/DetailMovie/slice"
import bookingMovieslice from "./../Page/Hometemple/booking/slice"
import registerMovieslice from "../Page/Hometemple/login/slice"
import authslice from "./../Page/Admin/auth/slice"

const store = configureStore({
    reducer: {
        listMovieslice,
        DetailMovieslice,
        bookingMovieslice,
        registerMovieslice,
        authslice


    },

}
)
export default store;