import { useState } from "react";
import FilmTable from "./FilmTable";


const FilmManagement = () => {
    const [search, setSearch] = useState("");

    const films = [
        { id: 1314, title: "Mỹ Toàn", description: "Phim hay quá", image: "/img/1.jpg" },
        { id: 1329, title: "Bố Già Rồi", description: "Tui cười rồi nên tui biết", image: "/img/2.jpg" },
        { id: 1344, title: "Avenger", description: "Giam Mục Bóng Tối", image: "/img/3.jpg" },
    ];

    const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">Quản lý Phim</h1>

            <div className="flex justify-between items-center mb-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    Thêm phim
                </button>

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
