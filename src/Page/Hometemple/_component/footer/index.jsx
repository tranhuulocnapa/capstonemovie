import { NavLink } from "react-router-dom";

export default function Footer() {
    const linkClasses =
        "text-body hover:text-fg-brand font-medium transition-colors";

    const activeClasses =
        "text-fg-brand font-semibold";

    return (
        <footer className="bg-neutral-primary text-body border-t border-default">
            <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Logo + address */}
                <div className="space-y-4">
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

                    <p className="leading-relaxed text-body">
                        197 Học Viện Công Nghệ Bưu Chính Viễn Thông
                        <br />
                        Quận 9, Thành Phố Hồ Chí Minh
                    </p>

                    <p className="text-heading font-medium">
                        Call us: <span className="font-semibold">(+84) 39 888 4505</span>
                    </p>
                </div>

                {/* Chính Sách */}
                <div>
                    <h3 className="text-heading font-semibold text-lg mb-4">Chính Sách</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/terms"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                Terms of Use
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/privacy"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                Privacy Policy
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/security"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                Security
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Tài Khoản */}
                <div>
                    <h3 className="text-heading font-semibold text-lg mb-4">Tài Khoản</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/account"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                My Account
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/watchlist"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                Watchlist
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/collections"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                Collections
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/guide"
                                className={({ isActive }) =>
                                    `${linkClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                User Guide
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-default text-center py-6 text-body text-sm">
                © 2025 Movie Capstone – All Rights Reserved.
            </div>
        </footer>
    );
}
