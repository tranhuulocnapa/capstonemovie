import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailMovie } from './slice';

export default function DetailMovie() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.DetailMovieslice)
    const { data } = state;

    const params = useParams()
    const { maPhim } = params

    useEffect(() => {
        dispatch(fetchDetailMovie(maPhim))

    }, [maPhim])

    return (
        <div className="max-w-5xl mx-auto p-6 pb-20">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b">Nội Dung Phim</h2>

            <div className="flex gap-6 flex-col md:flex-row">
                {/* Poster */}
                <img
                    src={data?.hinhAnh}
                    alt="poster"
                    className="w-64 rounded-xl shadow-lg object-cover"
                />

                {/* Info */}
                <div className="flex-1 space-y-3">
                    {/* Movie Name */}
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        {data?.tenPhim}

                        {/* Hot Badge */}
                        {data?.hot && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                                HOT
                            </span>
                        )}
                    </h1>

                    {/* Status */}
                    <div className="flex flex-wrap gap-3 text-sm">
                        {data?.dangChieu && (
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                                Đang chiếu
                            </span>
                        )}

                        {data?.sapChieu && (
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
                                Sắp chiếu
                            </span>
                        )}

                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                            ⭐ {data?.danhGia}/10
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-[15px]">
                        <b className="text-gray-900">Mô tả:</b> {data?.moTa}
                    </p>

                    {/* Release Date */}
                    <p className="text-[15px]">
                        <b>Ngày khởi chiếu:</b>{" "}
                        {new Date(data?.ngayKhoiChieu).toLocaleDateString("vi-VN")}
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
                    src={data?.trailer?.replace("watch?v=", "embed/")}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl shadow-lg"
                ></iframe>
            </div>
        </div>

    )
}

