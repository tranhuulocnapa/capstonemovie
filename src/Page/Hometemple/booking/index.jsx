import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setcomfirmBooking } from "./slice"
import Seats from "./seats";
import { bookinglMovie } from "./slice"
import { useParams } from "react-router-dom";

export default function BookingMovie() {
    const selectedSeats = useSelector((state) => state.bookingMovieslice);
    const dispatch = useDispatch();

    const [customerName, setCustomerName] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.setPrice, 0);

    const params = useParams();
    const { maLichChieu } = params;

    useEffect(() => {
        dispatch(bookinglMovie(maLichChieu));
    }, [maPhim]);

    return (
        <>
            <div className="md:w-1/3 w-full space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 border-gray-300">
                    Thông Tin Đặt Vé
                </h2>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Tên của bạn
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tên của bạn"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>

                <div>
                    <p className="font-medium text-gray-700">Tổng cộng:</p>
                    <p className="text-3xl font-semibold text-blue-600">
                        {totalPrice.toLocaleString("vi-VN")} ₫
                    </p>
                </div>

                <button
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => {
                        if (selectedSeats.length === 0) {
                            alert("Bạn chưa chọn ghế nào!");
                            return;
                        }
                        setOpenModal(true);
                    }}
                >
                    Xác Nhận Đặt Vé
                </button>

                {/* Danh sách ghế */}
                <div className="border-t border-gray-300 pt-4">
                    <h3 className="font-semibold mb-3 text-gray-800 text-lg">Ghế đã chọn:</h3>
                    <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
                        {selectedSeats.length > 0 ? (
                            selectedSeats.map((seat) => (
                                <div
                                    key={seat.seatNumber}
                                    className="flex justify-between items-center bg-green-50 border border-green-200 rounded-md px-3 py-2 text-sm"
                                >
                                    <span className="font-semibold text-gray-700">
                                        {seat.seatNumber}
                                    </span>
                                    <span className="text-green-700 font-medium">
                                        {seat.setPrice.toLocaleString("vi-VN")} ₫
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Chưa chọn ghế nào</p>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL*/}
            {openModal && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
                    onClick={() => setOpenModal(false)}
                >

                    <div
                        className="bg-white w-[400px] rounded-xl shadow-lg p-6"
                        onClick={(e) => e.stopPropagation()} // chặn tắt khi click trong modal
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Thông Tin Vé Đã Đặt
                        </h2>


                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Tên khách hàng:</span>{" "}
                            {customerName || "Chưa nhập"}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Ghế đã chọn:</span>{" "}
                            {selectedSeats.map((s) => s.seatNumber).join(", ")}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Giá vé:</span>{" "}
                            {selectedSeats[0]?.setPrice?.toLocaleString("vi-VN")} ₫
                        </p>

                        <p className="text-gray-900 font-bold text-lg mb-6">
                            Tổng tiền: {totalPrice.toLocaleString("vi-VN")} ₫
                        </p>

                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                onClick={() => {
                                    alert("Thanh toán thành công!");
                                    setOpenModal(false);
                                    { dispatch(setcomfirmBooking(selectedSeats)) }

                                }}
                            >
                                Thanh toán
                            </button>

                        </div>
                    </div>
                </div>
            )}

            <Seats />
        </>
    );
}
