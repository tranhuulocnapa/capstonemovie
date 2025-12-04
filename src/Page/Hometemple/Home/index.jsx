import { useEffect } from 'react'
import Moive from './Moive'
import { fetchdata } from "./slice"
import { useDispatch, useSelector } from 'react-redux'
import CinemaShowtimeUI from './CinemaShowtimeUI'


export default function Home() {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.listMovieslice)

    useEffect(() => {
        dispatch(fetchdata())
    }, [])

    const renderMovie = () => {
        if (!state.data) return null; // tránh crash

        const { movies } = state.data;
        return movies?.map((movie) => <Moive key={movie.maPhim} data={movie} />)

    }

    if (state.loading) return <div>Loandding...</div>

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="max-w-screen-xl w-full mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6 pb-20 justify-items-center">
                        {renderMovie()}
                    </div>
                </div>
            </div>

            <CinemaShowtimeUI />
        </>




    )
}
