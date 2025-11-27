import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

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
                    <div className="relative">
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
                        <div
                            className={`${openUserMenu ? "block" : "hidden"
                                } absolute top-full right-0 mt-2 z-50 bg-neutral-primary-medium border border-default-medium rounded-xl shadow-lg w-44`}
                        >
                            <div className="px-4 py-3 text-sm border-b border-default">
                                <span className="block text-heading font-medium">Joseph McFall</span>
                                <span className="block text-body truncate">name@flowbite.com</span>
                            </div>
                            <ul className="p-2 text-sm text-body font-medium">
                                <li>
                                    <a className="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="#">
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a className="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="#">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a className="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="#">
                                        Earnings
                                    </a>
                                </li>
                                <li>
                                    <a className="block p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded" href="#">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setOpenMobileMenu(!openMobileMenu)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:ring-2 focus:ring-neutral-tertiary"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <div
                    className={`${openMobileMenu ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <NavLink to="/" className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading hover:text-fg-brand">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
