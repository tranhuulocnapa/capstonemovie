import React from 'react'
import { Link } from "react-router-dom";

export default function Moive(props) {
    const { data } = props
    return (

        <div className="group relative w-full max-w-[260px] cursor-pointer transition-all">
            {/* Poster */}
            <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                    src={data.hinhAnh}
                    alt={data.biDanh}
                    className="w-full h-[360px] object-cover rounded-2xl transition-all duration-500 group-hover:scale-105 group-hover:brightness-50"
                />

                {/* Mờ nền gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>

                {/* Buttons */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="px-7 py-2 bg-white text-black font-semibold rounded-xl shadow hover:scale-105 transition">
                        Đặt vé
                    </button>

                    <button className="px-7 py-2 bg-white/10 border border-white text-white font-medium rounded-xl hover:bg-white hover:text-black hover:scale-105 transition">
                        <Link to={`/detail/${data.maPhim}`}>
                            Chi tiết
                        </Link>
                    </button>

                </div>
            </div>

            {/* Info */}
            <div className="mt-3 px-1">
                <h3 className="font-semibold text-base text-gray-900 line-clamp-1">
                    {data.tenPhim}
                </h3>
            </div>
        </div >



    )
}
