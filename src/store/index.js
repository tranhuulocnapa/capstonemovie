import { configureStore } from "@reduxjs/toolkit"
import listMovieslice from "./../Page/Hometemple/Home/slice"
import DetailMovieslice from "./../Page/Hometemple/DetailMovie/slice"

const store = configureStore({
    reducer: {
        listMovieslice,
        DetailMovieslice

    },

}
)
export default store;