import { Link } from "react-router-dom";

const FilmTable = ({ films }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-[1000px] border-collapse w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 border w-20 text-center">Mã phim</th>
                        <th className="p-3 border w-28 text-center">Hình ảnh</th>
                        <th className="p-3 border w-56 text-center">Tên phim</th>
                        <th className="p-3 border w-96">Mô tả</th>
                        <th className="p-3 border w-32 text-center">Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {films.map((film) => (
                        <tr key={film.maPhim} className="hover:bg-gray-100">
                            <td className="p-3 border text-center">{film.maPhim}</td>
                            <td className="p-3 border text-center">
                                <img
                                    src={film.hinhAnh}
                                    alt={film.biDanh}
                                    className="w-24 h-24 object-cover rounded mx-auto"
                                />
                            </td>
                            <td className="p-3 border text-center">{film.tenPhim}</td>
                            <td className="p-3 border text-sm">{film.moTa}</td>
                            <td className="p-3 border text-center space-x-2">
                                <Link to={`addfilm/${film.maPhim}`} className="text-blue-500 hover:text-blue-700">✏️</Link>
                                <button className="text-red-500 hover:text-red-700">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default FilmTable;
