import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const userMenuRef = useRef(null);

    // CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setOpenUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-neutral-primary w-full z-20 top-0 start-0 border-b border-default">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <img
                        src="https://png.pngtree.com/png-clipart/20191123/original/pngtree-movie-ticket-vector-icon-png-image_5196972.jpg"
                        className="h-7"
                        alt="Logo"
                    />
                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
                        Movie Capstone
                    </span>
                </a>

                {/* Right Section */}
                <div className="flex items-center md:order-2 space-x-3">

                    {/* Avatar + Dropdown Wrapper */}
                    <div ref={userMenuRef} className="relative">   {/* ← đặt ref đúng chỗ */}

                        {/* Avatar Button */}
                        <button
                            onClick={() => setOpenUserMenu(!openUserMenu)}
                            type="button"
                            className="flex text-sm bg-neutral-primary rounded-full focus:ring-4 focus:ring-neutral-tertiary"
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://cdn.tgdd.vn/GameApp/2/228128/Screentshots/cach-tra-ma-van-don-theo-doi-vi-tri-tren-shopee-228128-logo-03-09-2020.png"
                                alt="user"
                            />
                        </button>

                        {/* Dropdown */}
                        {openUserMenu && (
                            <div
                                className="absolute top-full right-0 mt-2 z-50 bg-white border rounded-xl shadow-lg w-44"
                            >
                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/login"
                                            onClick={() => setOpenUserMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/register"
                                            onClick={() => setOpenUserMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Đăng ký
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/"
                                            onClick={() => setOpenUserMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Log out
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setOpenMobileMenu(!openMobileMenu)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 md:hidden"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <div
                    className={`${openMobileMenu ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
                >
                    <ul className="font-medium flex flex-col p-4 md:flex-row md:space-x-8 mt-4 md:mt-0">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li><a href="#" className="block py-2 px-3">About</a></li>
                        <li><a href="#" className="block py-2 px-3">Services</a></li>
                        <li><a href="#" className="block py-2 px-3">Pricing</a></li>
                        <li><a href="#" className="block py-2 px-3">Contact</a></li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
