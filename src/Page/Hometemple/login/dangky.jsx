import { useState } from "react";
import { Link } from "react-router-dom";
import { registerMovie } from "./slice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.registerMovieslice);

    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        hoTen: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.taiKhoan) newErrors.taiKhoan = "Tài khoản không được để trống";
        if (!form.matKhau) newErrors.matKhau = "Mật khẩu không được để trống";
        if (!form.email) newErrors.email = "Email không được để trống";
        if (!form.soDt) newErrors.soDt = "Số điện thoại không được để trống";
        if (!form.hoTen) newErrors.hoTen = "Họ tên không được để trống";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("DATA GỬI LÊN API:", form); // <-- đúng
        dispatch(registerMovie(form));
    };


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Đăng ký</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label>Tài khoản</label>
                        <input
                            name="taiKhoan"
                            value={form.taiKhoan}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.taiKhoan && <p className="text-red-600">{errors.taiKhoan}</p>}
                    </div>

                    <div>
                        <label>Mật khẩu</label>
                        <input
                            name="matKhau"
                            type="password"
                            value={form.matKhau}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.matKhau && <p className="text-red-600">{errors.matKhau}</p>}
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.email && <p className="text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label>Số điện thoại</label>
                        <input
                            name="soDt"
                            value={form.soDt}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.soDt && <p className="text-red-600">{errors.soDt}</p>}
                    </div>

                    <div>
                        <label>Họ tên</label>
                        <input
                            name="hoTen"
                            value={form.hoTen}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        />
                        {errors.hoTen && <p className="text-red-600">{errors.hoTen}</p>}
                    </div>

                    <button className="w-full bg-green-600 text-white py-3 rounded-lg">
                        {loading ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>

                {error && <p className="text-red-600 text-center mt-4">{error}</p>}

                <p className="text-center mt-4">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
