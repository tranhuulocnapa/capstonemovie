import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginMovie } from "./slice"

export default function Login() {
    const dispatch = useDispatch()
    const loginstate = useSelector((state) => state.loginMovieslice)
    const { loading, data, error } = loginstate

    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    const [errors, setErrors] = useState({}); // Lỗi validate

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Validate login
    const validate = () => {
        let newErrors = {};

        if (!form.taiKhoan.trim()) {
            newErrors.taiKhoan = "Tài khoản không được bỏ trống";
        } else if (/\s/.test(form.taiKhoan)) {
            newErrors.taiKhoan = "Tài khoản không được chứa khoảng trắng";
        }

        if (!form.matKhau.trim()) {
            newErrors.matKhau = "Mật khẩu không được bỏ trống";
        } else if (form.matKhau.length < 6) {
            newErrors.matKhau = "Mật khẩu phải ít nhất 6 ký tự";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        dispatch(loginMovie(form))
    };

    if (data) return <Navigate to="/" />

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Đăng nhập</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {error && (<div className="text-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                        {error.response.data.content}
                    </div>)
                    }

                    {/* Tài khoản */}
                    <div>
                        <label className="block mb-1 font-medium">Tài khoản</label>
                        <input
                            name="taiKhoan"
                            value={form.taiKhoan}
                            onChange={handleChange}
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tài khoản..."
                        />
                        {errors.taiKhoan && (
                            <p className="text-red-600 text-sm mt-1">{errors.taiKhoan}</p>
                        )}
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu</label>
                        <input
                            name="matKhau"
                            value={form.matKhau}
                            onChange={handleChange}
                            type="password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu..."
                        />
                        {errors.matKhau && (
                            <p className="text-red-600 text-sm mt-1">{errors.matKhau}</p>
                        )}
                    </div>

                    <button className="w-full bg-green-600 text-white py-3 rounded-lg">
                        Đăng nhập
                    </button>
                </form>

                <p className="text-center mt-4">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
