import { NavLink } from "react-router-dom";
import { logout } from "../auth/slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Sidebar = () => {
    const [openFilms, setOpenFilms] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const dispatch = useDispatch()

    const handlelogout = () => {
        dispatch(logout())

    }


    return (
        <div className="w-64 bg-[#1f2937] text-white h-screen p-5 flex flex-col sticky top-0">
            <div className="text-xl font-bold mb-10">CYBER_FILM</div>

            <nav className="flex-1">
                <ul className="space-y-4">

                    <li>
                        <button
                            onClick={() => setOpenUser(!openUser)}
                            className="w-full text-left hover:text-yellow-300 flex justify-between items-center"
                        >
                            <span className="font-semibold">Users</span>
                            <span>{openFilms ? "▲" : "▼"}</span>
                        </button>

                        {openUser && (
                            <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                    <NavLink
                                        to="listuser"
                                        end
                                        className={({ isActive }) =>
                                            `block hover:text-yellow-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
                                        }
                                    >
                                        List user
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="adduser"
                                        className={({ isActive }) =>
                                            `block hover:text-yellow-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
                                        }
                                    >
                                        Thêm users
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <button
                            onClick={() => setOpenFilms(!openFilms)}
                            className="w-full text-left hover:text-yellow-300 flex justify-between items-center"
                        >
                            <span className="font-semibold">Films</span>
                            <span>{openFilms ? "▲" : "▼"}</span>
                        </button>

                        {openFilms && (
                            <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                    <NavLink
                                        to="/admin"
                                        end
                                        className={({ isActive }) =>
                                            `block hover:text-yellow-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
                                        }
                                    >
                                        Danh sách phim
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/addfilm"
                                        className={({ isActive }) =>
                                            `block hover:text-yellow-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
                                        }
                                    >
                                        Thêm phim mới
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* <li>
                        <a className="hover:text-yellow-300 block" href="#">Showtime</a>
                    </li> */}
                </ul>
            </nav>

            <button onClick={() => { handlelogout() }} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-auto">
                Log out
            </button>
        </div>
    );
};

export default Sidebar;
