import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDetailMovie } from './slice';
import { Link } from "react-router-dom";

export default function DetailMovie() {
    const [activeSystem, setActiveSystem] = useState(0);
    const [activeDate, setActiveDate] = useState(0);

    const dispatch = useDispatch();
    const state = useSelector((state) => state.DetailMovieslice);
    const { schedule, movie } = state.data || {};

    const params = useParams();
    const { maPhim } = params;

    useEffect(() => {
        dispatch(fetchDetailMovie(maPhim));
    }, [maPhim]);

    // ⭐ Tạo danh sách Thứ 2 → Chủ Nhật tuần hiện tại
    const getCurrentWeek = () => {
        const today = new Date();
        const day = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((day + 6) % 7));

        const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];

        return weekdays.map((weekday, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);

            return {
                weekday,
                day: d.getDate(),
                raw: d.toISOString().slice(0, 10)
            };
        });
    };

    const dateList = getCurrentWeek();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">

            {/* ================== CONTENT CONTAINER ================== */}
            <div className="max-w-6xl mx-auto p-6">

                {/* ================== MOVIE INFO ================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-3xl font-bold mb-6 pb-2 border-b">Nội Dung Phim</h2>

                    <div className="flex gap-6 flex-col md:flex-row">
                        <img
                            src={movie?.hinhAnh}
                            alt="poster"
                            className="w-64 rounded-xl shadow-lg object-cover"
                        />

                        <div className="flex-1 space-y-3">
                            <h1 className="text-3xl font-bold flex items-center gap-3">
                                {movie?.tenPhim}
                                {movie?.hot && (
                                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                                        HOT
                                    </span>
                                )}
                            </h1>

                            <div className="flex flex-wrap gap-3 text-sm">
                                {movie?.dangChieu && (
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                                        Đang chiếu
                                    </span>
                                )}
                                {movie?.sapChieu && (
                                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
                                        Sắp chiếu
                                    </span>
                                )}
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                                    ⭐ {movie?.danhGia}/10
                                </span>
                            </div>

                            <p className="text-gray-700 leading-relaxed text-[15px]">
                                <b className="text-gray-900">Mô tả:</b> {movie?.moTa}
                            </p>

                            <p className="text-[15px]">
                                <b>Ngày khởi chiếu:</b>{" "}
                                {new Date(movie?.ngayKhoiChieu).toLocaleDateString("vi-VN")}
                            </p>

                            {/* <button className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-700 transition mt-3">
                                🎟 MUA VÉ
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* ================== TRAILER ================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h3 className="text-2xl font-bold mb-4">Trailer</h3>
                    <iframe
                        width="100%"
                        height="450"
                        src={movie?.trailer?.replace("watch?v=", "embed/")}
                        title="Trailer"
                        allowFullScreen
                        className="rounded-xl shadow-lg"
                    ></iframe>
                </div>


                {/* ================== LỊCH CHIẾU ================== */}
                <div className="flex gap-6">

                    {/* ======= SIDEBAR RẠP ======= */}
                    <div className="w-52 bg-white rounded-xl shadow p-4 border">
                        <h4 className="font-semibold mb-3 text-lg">Hệ thống rạp</h4>

                        <div className="space-y-2">
                            {schedule?.heThongRapChieu?.map((heThong, idx) => (
                                <div
                                    key={heThong.maHeThongRap}
                                    onClick={() => setActiveSystem(idx)}
                                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition
                                        ${activeSystem === idx ? "bg-red-50 border border-red-300" : "hover:bg-gray-100"}`}
                                >
                                    <img src={heThong.logo} className="w-8 h-8 object-contain" />
                                    <span className="text-sm">{heThong.tenHeThongRap}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ======= MAIN CONTENT ======= */}
                    <div className="flex-1">

                        {/* ======= TUẦN HIỆN TẠI (THỨ 2 → CN) ======= */}
                        <div className="bg-white rounded-xl shadow p-4 mb-6 border">
                            <h4 className="font-semibold mb-3 text-lg">Lịch chiếu theo ngày</h4>

                            <div className="flex gap-5 overflow-x-auto">
                                {dateList.map((d, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveDate(idx)}
                                        className={`cursor-pointer px-4 py-3 text-center rounded-lg min-w-[70px] transition
                                            ${activeDate === idx
                                                ? "bg-red-600 text-white font-semibold"
                                                : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                    >
                                        <div className="text-sm">{d.weekday}</div>
                                        <div className="text-lg font-semibold">{d.day}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ======= DANH SÁCH CỤM RẠP ======= */}
                        <div className="space-y-6">
                            {schedule?.heThongRapChieu?.[activeSystem]?.cumRapChieu?.map((cum) => (
                                <div key={cum.maCumRap} className="bg-white rounded-xl shadow p-5 border">

                                    <h4 className="font-semibold text-xl">{cum.tenCumRap}</h4>
                                    <p className="text-sm text-gray-500 mb-4">{cum.diaChi}</p>

                                    {/* ======= SUẤT CHIẾU ======= */}
                                    <div className="flex gap-3 flex-wrap">
                                        {cum.lichChieuPhim?.map((lich) => {
                                            const dt = new Date(lich.ngayChieuGioChieu);
                                            const day = dt.toLocaleDateString("vi-VN");
                                            const time = dt.toLocaleTimeString("vi-VN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            });

                                            return (
                                                <div key={lich.maLichChieu} className="bg-gray-50 rounded-lg border p-3 shadow-sm">
                                                    <div className="text-red-600 text-xs font-semibold">{day}</div>
                                                    <button
                                                        className="mt-1 border px-4 py-2 rounded-lg bg-white hover:bg-red-600 hover:text-white transition"
                                                    >
                                                        <Link to={`/booking/${lich.maLichChieu}`}>
                                                            {time}
                                                        </Link>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
