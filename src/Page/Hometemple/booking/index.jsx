import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookinglMovie, setcomfirmBooking } from "./slice";
import Seats from "./seats";
import { Navigate, useParams } from "react-router-dom";

export default function BookingMovie() {
    const userLogin = useSelector((state) => state.loginMovieslice)
    if (!userLogin.data) {
        alert("bạn chưa đăng nhâp")
        return <Navigate to="/login" />
    }
    const dispatch = useDispatch();
    const { data, selectedSeats } = useSelector((state) => state.bookingMovieslice);

    const [customerName, setCustomerName] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0);

    const { maLichChieu } = useParams();

    useEffect(() => {
        if (maLichChieu) dispatch(bookinglMovie(maLichChieu));
    }, [maLichChieu]);

    return (
        <>

            <div className="w-full max-w-7xl mx-auto mt-10 px-4 flex flex-col md:flex-row gap-10">

                {/* --- Cột trái: Thông tin đặt vé --- */}
                <div className="md:w-1/3 w-full bg-white p-6 rounded-xl shadow-lg border space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
                        Thông Tin Đặt Vé
                    </h2>

                    {data && (
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Phim:</strong> {data.thongTinPhim.tenPhim}</p>
                            <p><strong>Rạp:</strong> {data.thongTinPhim.tenCumRap} – {data.thongTinPhim.tenRap}</p>
                            <p><strong>Ngày chiếu:</strong> {data.thongTinPhim.ngayChieu}</p>
                            <p><strong>Giờ chiếu:</strong> {data.thongTinPhim.gioChieu}</p>
                        </div>
                    )}

                    {/* <div>
                        <label className="block text-sm font-medium mb-1">Tên của bạn</label>
                        <input
                            type="text"
                            placeholder="Nhập tên của bạn"
                            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div> */}

                    <div>
                        <p className="font-medium">Tổng cộng:</p>
                        <p className="text-3xl font-semibold text-blue-600">
                            {totalPrice.toLocaleString("vi-VN")} ₫
                        </p>
                    </div>

                    <button
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => {
                            if (!selectedSeats.length) {
                                alert("Bạn chưa chọn ghế!");
                                return;
                            }

                            setOpenModal(true);
                        }}
                    >
                        Xác Nhận Đặt Vé
                    </button>

                    <div className="border-t pt-4 flex flex-col h-full">
                        <h3 className="font-semibold mb-3 text-lg">Ghế đã chọn:</h3>
                        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scroll">
                            {selectedSeats.length ? (
                                selectedSeats.map((seat) => (
                                    <div
                                        key={seat.maGhe}
                                        className="flex justify-between bg-green-50 border rounded-md px-3 py-2"
                                    >
                                        <span>{seat.tenGhe}</span>
                                        <span>{seat.giaVe.toLocaleString("vi-VN")} ₫</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Chưa chọn ghế nào</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Cột phải: Ghế --- */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border">
                    <Seats />
                </div>

                {openModal && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center"
                        onClick={() => setOpenModal(false)}
                    >
                        <div
                            className="bg-white w-[400px] rounded-xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold text-center mb-4">Thông Tin Vé</h2>

                            <p><strong>Tên khách hàng:</strong> {customerName}</p>
                            <p><strong>Ghế:</strong> {selectedSeats.map(s => s.tenGhe).join(", ")}</p>

                            <p className="text-lg font-bold mt-4">
                                Tổng tiền: {totalPrice.toLocaleString("vi-VN")} ₫
                            </p>

                            <button
                                className="w-full bg-blue-600 text-white mt-6 py-2 rounded-lg hover:bg-blue-700"
                                onClick={() => {
                                    alert("Thanh toán thành công!");

                                    dispatch(setcomfirmBooking({
                                        maLichChieu,
                                        danhSachVe: selectedSeats.map(seat => ({
                                            maGhe: seat.maGhe,
                                            giaVe: seat.giaVe
                                        })),
                                    }));

                                    setOpenModal(false);
                                }}
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}
