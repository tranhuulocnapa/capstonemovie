import { configureStore } from "@reduxjs/toolkit"
import listMovieslice from "./../Page/Hometemple/Home/slice"

const store = configureStore({
    reducer: {
        listMovieslice
    },

}
)
export default store;