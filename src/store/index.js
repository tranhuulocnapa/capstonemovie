import { configureStore } from "@reduxjs/toolkit"
import listMovieslice from "./../Page/Hometemple/Home/slice"
import DetailMovieslice from "./../Page/Hometemple/DetailMovie/slice"
import bookingMovieslice from "./../Page/Hometemple/booking/slice"
import userSlice from "../Page/Hometemple/login/slice"

const store = configureStore({
    reducer: {
        listMovieslice,
        DetailMovieslice,
        bookingMovieslice,
        userSlice,


    },

}
)
export default store;