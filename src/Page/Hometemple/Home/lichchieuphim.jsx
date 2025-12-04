import { useState } from "react";

export default function CinemaShowtimeUI() {

    // -------- DATA MẪU (CHƯA KẾT API) ---------
    const heThongRap = [
        { maHeThongRap: "BHD", logo: "/bhd.png", tenHeThongRap: "BHD Star" },
        { maHeThongRap: "CGV", logo: "/cgv.png", tenHeThongRap: "CGV" },
        { maHeThongRap: "GLX", logo: "/galaxy.png", tenHeThongRap: "Galaxy" },
    ];

    const cumRap = [
        {
            maCumRap: "bhd-q1",
            tenCumRap: "BHD Vincom Quận 1",
            diaChi: "Vincom Center Q1",
        },
        {
            maCumRap: "bhd-q9",
            tenCumRap: "BHD Vincom Quận 9",
            diaChi: "Vincom Q9",
        },
    ];

    const lichChieu = [
        {
            tenPhim: "Avengers: Endgame",
            poster: "/avengers.jpg",
            suatChieu: ["11:15", "12:30", "15:10", "17:50", "19:30"],
        },
        {
            tenPhim: "Fast & Furious 9",
            poster: "/fast9.jpg",
            suatChieu: ["10:30", "13:00", "16:00", "20:00"],
        },
    ];

    const [activeHeThong, setActiveHeThong] = useState(0);
    const [activeCumRap, setActiveCumRap] = useState(0);

    return (
        <div className="grid grid-cols-12 gap-4 w-full max-w-6xl mx-auto mt-8">

            {/* ------------------------------------- */}
            {/* CỘT 1 – HỆ THỐNG RẠP */}
            {/* ------------------------------------- */}
            <div className="col-span-2 bg-white rounded-xl shadow border">
                {heThongRap.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 px-3 py-4 cursor-pointer transition 
                            ${activeHeThong === index ? "bg-red-100 border-l-4 border-red-500" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveHeThong(index)}
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
                        key={index}
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
                <h3 className="font-semibold mb-4 text-lg">Lịch chiếu theo ngày</h3>

                {lichChieu.map((phim, index) => (
                    <div key={index} className="flex gap-4 mb-6 pb-4 border-b">

                        <img
                            src={phim.poster}
                            className="w-20 h-28 object-cover rounded-lg shadow"
                        />

                        <div>
                            <h4 className="text-xl font-semibold mb-2">{phim.tenPhim}</h4>

                            <div className="flex flex-wrap gap-3">
                                {phim.suatChieu.map((time, idx) => (
                                    <div
                                        key={idx}
                                        className="px-3 py-2 rounded-lg border border-red-500 text-red-600 font-semibold cursor-pointer hover:bg-red-500 hover:text-white transition"
                                    >
                                        {time}
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
