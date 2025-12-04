import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "./slice";

export default function Seats() {
    const { data, selectedSeats } = useSelector((state) => state.bookingMovieslice);

    const dispatch = useDispatch();

    if (!data) return <p>Đang tải dữ liệu ghế...</p>;

    const seats = data.danhSachGhe || [];

    // chia ghế thành từng hàng 10 ghế
    const seatRows = [];
    for (let i = 0; i < seats.length; i += 10) {
        seatRows.push(seats.slice(i, i + 10));
    }

    return (
        <div className="w-full">
            {/* MÀN HÌNH */}
            <div className="text-center text-gray-700 py-3 mb-6 rounded-lg shadow-inner bg-gray-200 font-semibold uppercase tracking-wide border border-gray-300">
                Màn Hình
            </div>

            {/* DANH SÁCH GHẾ */}
            <div className="flex flex-col items-center overflow-x-auto">
                <table className="mx-auto border-separate border-spacing-2">
                    <tbody>
                        {seatRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                                {row.map((seat) => {
                                    const isBooked = seat.daDat;
                                    const isSelected = selectedSeats.some((s) => s.maGhe === seat.maGhe);

                                    let bgClass = isBooked
                                        ? "bg-orange-400 cursor-not-allowed text-white"
                                        : isSelected
                                            ? "bg-green-500 hover:bg-green-600 text-white"
                                            : "bg-white hover:bg-blue-100 cursor-pointer";

                                    return (
                                        <td key={seat.maGhe} className="px-1 py-1">
                                            <div
                                                title={`Ghế ${seat.tenGhe}`}
                                                onClick={() => !isBooked && dispatch(toggleSeat(seat))}
                                                className={`w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 
                                                            text-sm font-medium transition-all duration-200 ${bgClass}`}
                                            >
                                                {seat.tenGhe}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CHÚ THÍCH */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
                <Legend color="bg-green-500" text="Đã chọn" />
                <Legend color="bg-orange-400" text="Đã đặt" />
                <Legend color="bg-white" text="Còn trống" />
            </div>
        </div>
    );
}

function Legend({ color, text }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded border border-gray-400 ${color}`}></div>
            <span>{text}</span>
        </div>
    );
}
