import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletefilm } from "./slice";
import { message, Popconfirm } from "antd";

const FilmTable = ({ films }) => {
    const dispatch = useDispatch()
    const handledelete = async (maPhim) => {
        try {
            await dispatch(deletefilm(maPhim)).unwrap();
            message.success("Xóa phim thành công");
        } catch (err) {
            message.error(err?.content || "Xóa phim thất bại");
        }
    };

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
                    {films?.map((film) => (
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
                            <td className="p-3 border text-center space-x-3">
                                {/* Sửa phim */}
                                <Link
                                    to={`addfilm/${film.maPhim}`}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Cập nhật phim"
                                >
                                    ✏️
                                </Link>

                                {/* Tạo lịch chiếu */}
                                <Link
                                    to={`films/showtime/${film.maPhim}`}
                                    className="text-green-600 hover:text-green-800"
                                    title="Tạo lịch chiếu"
                                >
                                    ⏰
                                </Link>

                                {/* Xóa phim */}
                                <Popconfirm
                                    title="Xóa phim"
                                    description="Bạn có chắc muốn xóa phim này?"
                                    okText="Xóa"
                                    cancelText="Hủy"
                                    onConfirm={() => handledelete(film.maPhim)}
                                >
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        title="Xóa phim"
                                    >
                                        🗑️
                                    </button>
                                </Popconfirm>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default FilmTable;
