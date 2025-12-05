import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./slice";

export default function Login() {
    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: "",
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

        const res = await dispatch(loginUser(form));

        if (loginUser.fulfilled.match(res)) {
            alert("Đăng nhập thành công!");
            navigate("/");

            
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Đăng nhập</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Tài khoản</label>
                        <input
                            name="taiKhoan"
                            value={form.taiKhoan}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            type="text"
                            placeholder="Nhập tài khoản..."
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu</label>
                        <input
                            name="matKhau"
                            value={form.matKhau}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            type="password"
                            placeholder="Nhập mật khẩu..."
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
