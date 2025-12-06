import React from "react";

const Sidebar = () => {
    return (
        <div className="w-64 bg-[#1f2937] text-white h-screen p-5 flex flex-col">
            <div className="text-xl font-bold mb-10">CYBERLEARN</div>

            <nav className="flex-1">
                <ul className="space-y-4">
                    <li>
                        <a className="hover:text-yellow-300 block" href="#">Users</a>
                    </li>
                    <li>
                        <a className="text-yellow-300 font-semibold block" href="#">Films</a>
                    </li>
                    <li>
                        <a className="hover:text-yellow-300 block" href="#">Showtime</a>
                    </li>
                </ul>
            </nav>

            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-auto">
                Đăng xuất
            </button>
        </div>
    );
};

export default Sidebar;
