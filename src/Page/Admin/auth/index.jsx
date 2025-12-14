import { useState } from "react";
import { authService } from "./slice.js"
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = () => {
    const dispatch = useDispatch()
    const authstate = useSelector((state) => state.authslice)
    const { loading, data, error } = authstate;

    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: ""
    });

    const [errors, setErrors] = useState({
        taiKhoan: "",
        matKhau: ""
    });

    const validate = (name, value) => {
        let msg = "";

        if (name === "taiKhoan") {
            if (!value.trim()) msg = "Tài khoản không được để trống";
            else if (value.length < 4) msg = "Tài khoản phải ít nhất 4 ký tự";
        }

        if (name === "matKhau") {
            if (!value.trim()) msg = "Mật khẩu không được để trống";
            else if (value.length < 6) msg = "Mật khẩu phải ít nhất 6 ký tự";
        }

        setErrors((prev) => ({ ...prev, [name]: msg }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(authService(form))
        // if (!errors.taiKhoan && !errors.matKhau && form.taiKhoan && form.matKhau) {
        //     alert("Đăng nhập thành công");
        //     // Xử lý gọi API tại đây
        // }
    };


    if (data) {
        return <Navigate to="/admin" />
    }


    if (loading) return <div>loading...</div>

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg p-8 rounded-lg w-96"
            >

                {error && (<div className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                    {error.response.data.content}
                </div>)
                }

                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

                {/* taiKhoan */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Tài khoản</label>
                    <input
                        type="text"
                        name="taiKhoan"
                        value={form.taiKhoan}
                        onChange={handleChange}
                        className={`w-full border p-2 rounded outline-none 
              ${errors.taiKhoan ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Nhập tài khoản"
                    />
                    {errors.taiKhoan && (
                        <p className="text-red-500 text-sm mt-1">{errors.taiKhoan}</p>
                    )}
                </div>

                {/* matKhau */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Mật khẩu</label>
                    <input
                        type="password"
                        name="matKhau"
                        value={form.matKhau}
                        onChange={handleChange}
                        className={`w-full border p-2 rounded outline-none 
              ${errors.matKhau ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.matKhau && (
                        <p className="text-red-500 text-sm mt-1">{errors.matKhau}</p>
                    )}
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default Auth;
