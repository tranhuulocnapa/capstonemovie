import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailMovie } from './slice';

export default function DetailMovie() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.DetailMovieslice)
    const { schedule, movie } = state.data || {};

    const params = useParams()
    const { maPhim } = params

    useEffect(() => {
        dispatch(fetchDetailMovie(maPhim))

    }, [maPhim])

    return (
        <>
            <div className="max-w-5xl mx-auto p-6 pb-20">
                {/* Title */}
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">Nội Dung Phim</h2>

                <div className="flex gap-6 flex-col md:flex-row">
                    {/* Poster */}
                    <img
                        src={movie?.hinhAnh}
                        alt="poster"
                        className="w-64 rounded-xl shadow-lg object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 space-y-3">
                        {/* Movie Name */}
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            {movie?.tenPhim}

                            {/* Hot Badge */}
                            {movie?.hot && (
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                                    HOT
                                </span>
                            )}
                        </h1>

                        {/* Status */}
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

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed text-[15px]">
                            <b className="text-gray-900">Mô tả:</b> {movie?.moTa}
                        </p>

                        {/* Release Date */}
                        <p className="text-[15px]">
                            <b>Ngày khởi chiếu:</b>{" "}
                            {new Date(movie?.ngayKhoiChieu).toLocaleDateString("vi-VN")}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            <button className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-700 transition">
                                🎟 MUA VÉ
                            </button>

                        </div>
                    </div>
                </div>

                {/* Trailer */}
                <div className="mt-10">
                    <h3 className="text-2xl font-bold mb-4">Trailer</h3>

                    <iframe
                        width="100%"
                        height="420"
                        src={movie?.trailer?.replace("watch?v=", "embed/")}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-xl shadow-lg"
                    ></iframe>
                </div>
            </div>


            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    Lịch Chiếu
                </h2>

                <div className="space-y-8">
                    {/* Lặp qua hệ thống rạp */}
                    {schedule?.heThongRapChieu?.map((heThong) => (
                        <div key={heThong.maHeThongRap} className="border rounded-xl p-5 shadow-sm bg-white">

                            {/* Header hệ thống rạp */}
                            <div className="flex items-center gap-4 mb-5">
                                <img
                                    src={heThong.logo}
                                    alt={heThong.tenHeThongRap}
                                    className="w-12 h-12 object-contain"
                                />
                                <h3 className="text-2xl font-semibold">{heThong.tenHeThongRap}</h3>
                            </div>

                            {/* Lặp cụm rạp */}
                            <div className="space-y-6 pl-4 border-l">
                                {heThong.cumRapChieu.map((cumRap) => (
                                    <div key={cumRap.maCumRap} className="pb-4 border-b">

                                        {/* Tên + hình cụm rạp */}
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={cumRap.hinhAnh}
                                                className="w-20 h-20 object-cover rounded-lg shadow-md"
                                                alt={cumRap.tenCumRap}
                                            />

                                            <div>
                                                <h4 className="text-xl font-bold">{cumRap.tenCumRap}</h4>
                                                <p className="text-gray-500 text-sm">{cumRap.diaChi}</p>
                                            </div>
                                        </div>

                                        {/* Danh sách suất chiếu */}
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {cumRap.lichChieuPhim.map((lich) => (
                                                <button
                                                    key={lich.maLichChieu}
                                                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white transition shadow-sm"
                                                >
                                                    <div className="text-sm font-semibold">
                                                        {new Date(lich.ngayChieuGioChieu).toLocaleTimeString("vi-VN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </div>
                                                    <div className="text-xs opacity-80">
                                                        Giá: {lich.giaVe.toLocaleString()}₫
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>

    )
}

