import { useState } from "react";
import { useSelector } from "react-redux";

export default function CinemaShowtimeUI() {
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

    return (
        <div className="grid grid-cols-12 gap-4 w-full max-w-6xl mx-auto mt-8">

            {/* ------------------------------------- */}
            {/* CỘT 1 – HỆ THỐNG RẠP */}
            {/* ------------------------------------- */}
            <div className="col-span-2 bg-white rounded-xl shadow border">
                {cinemaSystems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-4 cursor-pointer transition 
                            ${activeHeThong === index ? "bg-red-100 border-l-4 border-red-500" : "hover:bg-gray-100"}`}
                        onClick={() => {
                            setActiveHeThong(index);
                            setActiveCumRap(0); // reset cụm rạp
                        }}
                    >
                        <img src={item.logo} className="w-10 h-10 object-contain" />
                        <span className="font-medium">{item.tenHeThongRap}</span>
                    </div>
                ))}
            </div>

            {/* ------------------------------------- */}
            {/* CỘT 2 – CỤM RẠP */}
            {/* ------------------------------------- */}
            <div className="col-span-4 bg-white rounded-xl shadow border p-4">
                <h3 className="font-semibold mb-4 text-lg">Cụm rạp</h3>

                {cumRap.map((item, index) => (
                    <div
                        key={item.maCumRap}
                        onClick={() => setActiveCumRap(index)}
                        className={`p-3 rounded-lg cursor-pointer mb-3 transition border 
                            ${activeCumRap === index ? "border-red-500 bg-red-50" : "hover:bg-gray-100"}`}
                    >
                        <h4 className="font-semibold">{item.tenCumRap}</h4>
                        <p className="text-sm text-gray-500">{item.diaChi}</p>
                    </div>
                ))}
            </div>

            {/* ------------------------------------- */}
            {/* CỘT 3 – LỊCH CHIẾU */}
            {/* ------------------------------------- */}
            <div className="col-span-6 bg-white rounded-xl shadow border p-4">
                <h3 className="font-semibold mb-4 text-lg">Lịch chiếu</h3>

                {movies.map((phim) => (
                    <div key={phim.maPhim} className="flex gap-4 mb-6 pb-4 border-b">

                        <img
                            src={phim.hinhAnh}
                            className="w-20 h-28 object-cover rounded-lg shadow"
                        />

                        <div>
                            <h4 className="text-xl font-semibold mb-2">{phim.tenPhim}</h4>

                            <div className="flex flex-wrap gap-3">
                                {phim.lstLichChieuTheoPhim.map((lich) => (
                                    <div
                                        key={lich.maLichChieu}
                                        className="px-3 py-2 rounded-lg border border-red-500 
                                        text-red-600 font-semibold cursor-pointer hover:bg-red-500 
                                        hover:text-white transition"
                                    >
                                        {new Date(lich.ngayChieuGioChieu).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
