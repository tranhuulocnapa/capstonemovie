import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setselectedSeats } from "./slice"


export default function Seats() {

    const data = useSelector((state) => state.movieslice)

    const selectedSeats = useSelector((state) => state.movieslice.selectedSeats)
    const bookedSeats = useSelector((state) => state.movieslice.bookedSeats)

    const dispatch = useDispatch();

    return (
        <div className="flex-1">

            <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 text-center text-gray-700 py-3 mb-8 rounded-lg shadow-inner font-semibold uppercase tracking-wide border border-gray-300">
                Màn Hình
            </div>

            <div className="flex flex-col items-center overflow-x-auto">
                <table className="mx-auto border-separate border-spacing-2">
                    <tbody>

                        <tr>
                            <td className="w-8"></td>
                            {Array.from({ length: 12 }, (_, i) => (
                                <td
                                    key={i}
                                    className="text-center text-sm font-bold text-gray-800 px-1"
                                >
                                    {i + 1}
                                </td>
                            ))}
                        </tr>

                        {data.products?.map((row, rowIndex) => {

                            if (!row.hang) return null;

                            return (
                                <tr key={rowIndex} className="text-center">

                                    <td className="font-semibold text-gray-700 pr-2">
                                        {row.hang}
                                    </td>

                                    {row.danhSachGhe.map((seat, seatIndex) => {

                                        let bgClass = "";
                                        let isBooked = bookedSeats.some((item) => item.seatNumber === seat.soGhe);
                                        let isSelected = selectedSeats.some(
                                            (item) => item.seatNumber === seat.soGhe
                                        );

                                        if (isBooked) {

                                            bgClass =
                                                "bg-orange-400 cursor-not-allowed hover:bg-orange-400";
                                        } else if (isSelected) {

                                            bgClass =
                                                "bg-green-500 border-green-600 hover:bg-green-600";
                                        } else {

                                            bgClass =
                                                "bg-white hover:bg-blue-100 cursor-pointer";
                                        }

                                        return (
                                            <td key={seatIndex} className="px-1 py-1">
                                                <div
                                                    title={seat.soGhe}
                                                    onClick={() => dispatch(setselectedSeats(seat))}


                                                    className={`
                                        w-6 h-6 rounded-md border border-gray-400 
                                        transition-all duration-200 hover:shadow-md 
                                        ${bgClass}
                                    `}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>


            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-700">
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
