import { useEffect, useState } from "react";
import FilmTable from "./FilmTable";
import { useDispatch, useSelector } from "react-redux";
import { film } from "./slice";
import { Link } from "react-router-dom";


const FilmManagement = () => {
    const dispatch = useDispatch();
    const listfilm = useSelector((state) => state.filmslice.data || [])

    const [search, setSearch] = useState("");

    const filtered = listfilm.filter((film) =>
        film.tenPhim.toLowerCase().includes(search.toLowerCase())
    );


    useEffect(() => {
        dispatch(film());
    }, []);

    return (
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">Quản lý Phim</h1>

            <div className="flex justify-between items-center mb-4">
                <Link to="/admin/addfilm" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    Thêm phim
                </Link>

                <input
                    type="text"
                    placeholder="Input search text"
                    className="border p-2 rounded w-72"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <FilmTable films={filtered} />
        </div>

    );
};

export default FilmManagement;
