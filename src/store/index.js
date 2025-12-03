import { configureStore } from "@reduxjs/toolkit"
import listMovieslice from "./../Page/Hometemple/Home/slice"
import DetailMovieslice from "./../Page/Hometemple/DetailMovie/slice"
import bookingMovieslice from "./../Page/Hometemple/booking/slice"

const store = configureStore({
    reducer: {
        listMovieslice,
        DetailMovieslice,
        bookingMovieslice

    },

}
)
export default store;