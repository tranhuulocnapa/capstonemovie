import React from "react";

const FilmTable = ({ films }) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-3 border">Mã phim</th>
                    <th className="p-3 border">Hình ảnh</th>
                    <th className="p-3 border">Tên phim</th>
                    <th className="p-3 border">Mô tả</th>
                    <th className="p-3 border">Hành động</th>
                </tr>
            </thead>

            <tbody>
                {films.map((film) => (
                    <tr key={film.id} className="hover:bg-gray-100">
                        <td className="p-3 border">{film.id}</td>
                        <td className="p-3 border">
                            <img
                                src={film.image}
                                alt={film.title}
                                className="w-14 h-14 object-cover rounded"
                            />
                        </td>
                        <td className="p-3 border">{film.title}</td>
                        <td className="p-3 border text-sm">{film.description}</td>
                        <td className="p-3 border space-x-2">
                            <button className="text-blue-500 hover:text-blue-700">
                                ✏️
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                                🗑️
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FilmTable;
