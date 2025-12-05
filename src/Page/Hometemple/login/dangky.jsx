import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangKyThunk } from "./slice";

export default function Register() {
    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        hoTen: "",

    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.user?.loading);
    const error = useSelector(state => state.user?.error);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(dangKyThunk(form));

        if (dangKyThunk.fulfilled.match(result)) {
            alert("Đăng ký thành công! Mời bạn đăng nhập.");
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Đăng ký</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="w-full p-3 border rounded-lg"
                        name="taiKhoan" placeholder="Tài khoản"
                        onChange={handleChange}
                    />
                    <input className="w-full p-3 border rounded-lg"
                        name="matKhau" type="password" placeholder="Mật khẩu"
                        onChange={handleChange}
                    />
                    <input className="w-full p-3 border rounded-lg"
                        name="email" placeholder="Email"
                        onChange={handleChange}
                    />
                    <input className="w-full p-3 border rounded-lg"
                        name="soDt" placeholder="Số điện thoại"
                        onChange={handleChange}
                    />
                    <input className="w-full p-3 border rounded-lg"
                        name="hoTen" placeholder="Họ tên"
                        onChange={handleChange}
                    />

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg"
                    >
                        {loading ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}
