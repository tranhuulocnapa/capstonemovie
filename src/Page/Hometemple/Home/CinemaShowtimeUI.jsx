import { useSelector } from "react-redux";
import { Pagination } from "antd";
import { useMemo, useState } from "react";

export default function CinemaShowtime() {
    const PAGE_SIZE = 3; // số phim mỗi trang

    const [currentPage, setCurrentPage] = useState(1);
    const state = useSelector((state) => state.listMovieslice);

    if (!state.data) return <div>Loading...</div>;

    const { cinemaSystems, hethongrap } = state.data;

    const [activeHeThong, setActiveHeThong] = useState(0);
    const [activeCumRap, setActiveCumRap] = useState(0);

    // ---- Lấy dữ liệu đúng từ API ----
    const heThongDangChon = hethongrap[activeHeThong]; // 1 hệ thống
    const cumRap = heThongDangChon?.lstCumRap || [];   // list cụm rạp

    const cumRapDangChon = cumRap[activeCumRap];
    const movies = cumRapDangChon?.danhSachPhim || []; // list phim trong cụm rạp

    const pagedMovies = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return movies.slice(start, end);
    }, [movies, currentPage]);

    return (
        <div className="col-span-6">
            {/* CONTAINER THẬT */}
            <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">

                {/* HEADER */}
                <div className="px-6 py-4 border-b">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        🎬 Lịch chiếu
                    </h3>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {pagedMovies.map((phim) => (
                        <div
                            key={phim.maPhim}
                            className="flex gap-4 pb-6 border-b last:border-b-0"
                        >
                            <img
                                src={phim.hinhAnh}
                                className="w-24 h-32 object-cover rounded-xl shadow-md"
                            />

                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-3 line-clamp-2">
                                    {phim.tenPhim}
                                </h4>

                                <div className="flex flex-wrap gap-3">
                                    {phim.lstLichChieuTheoPhim.map((lich) => (
                                        <button
                                            key={lich.maLichChieu}
                                            className="
                                        px-4 py-2 rounded-lg border border-red-500
                                        text-red-600 font-semibold text-sm
                                        hover:bg-red-500 hover:text-white
                                        transition-all
                                        shadow-sm hover:shadow-md
                                    "
                                        >
                                            {new Date(lich.ngayChieuGioChieu).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t flex justify-center bg-gray-50 rounded-b-2xl">
                    <Pagination
                        current={currentPage}
                        pageSize={PAGE_SIZE}
                        total={movies.length}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </div>




    );
}
