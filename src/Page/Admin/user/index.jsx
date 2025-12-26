import { useState } from "react";
import { adduser } from "./slice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Adduser() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        hoTen: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "KhachHang",
    });

    const [errors, setErrors] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        hoTen: ""
    });

    // ✅ validate từng field
    const validate = (name, value) => {
        let msg = "";

        switch (name) {
            case "taiKhoan":
                if (!value.trim()) msg = "Tài khoản không được để trống";
                else if (value.length < 4) msg = "Tối thiểu 4 ký tự";
                break;

            case "matKhau":
                if (!value.trim()) msg = "Mật khẩu không được để trống";
                else if (value.length < 6) msg = "Tối thiểu 6 ký tự";
                break;

            case "email":
                if (!value.trim()) msg = "Email không được để trống";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    msg = "Email không hợp lệ";
                break;

            case "soDt":
                if (!value.trim()) msg = "Số điện thoại không được để trống";
                else if (!/^\d{9,11}$/.test(value))
                    msg = "SĐT phải 9–11 chữ số";
                break;

            case "hoTen":
                if (!value.trim()) msg = "Họ tên không được để trống";
                break;

            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: msg }));
        return msg;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    // ✅ validate toàn bộ khi submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = {};

        Object.keys(form).forEach((key) => {
            const err = validate(key, form[key]);
            if (err) {
                newErrors[key] = err;
                hasError = true;
            }
        });

        if (hasError) return;

        // // ✅ submit data
        // console.log("Submit data:", form);
        // dispatch(adduser(form))

        try {
            await dispatch(adduser(form)).unwrap()
            message.success("Thêm người dùng thành công!");
            navigate("/admin/listuser");
        } catch (err) {
            message.error(err.response?.data?.content);
        }



    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-10">

            <h2 className="text-center text-3xl font-bold mb-8">
                Thêm người dùng
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Tài khoản */}
                <div>
                    <label className="block mb-1 font-medium">Tài khoản</label>
                    <input
                        name="taiKhoan"
                        value={form.taiKhoan}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border outline-none
                          ${errors.taiKhoan ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.taiKhoan && <p className="text-red-500 text-sm mt-1">{errors.taiKhoan}</p>}
                </div>

                {/* Mật khẩu */}
                <div>
                    <label className="block mb-1 font-medium">Mật khẩu</label>
                    <input
                        type="password"
                        name="matKhau"
                        value={form.matKhau}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border outline-none
                          ${errors.matKhau ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.matKhau && <p className="text-red-500 text-sm mt-1">{errors.matKhau}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border outline-none
                          ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Số điện thoại */}
                <div>
                    <label className="block mb-1 font-medium">Số điện thoại</label>
                    <input
                        name="soDt"
                        value={form.soDt}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border outline-none
                          ${errors.soDt ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.soDt && <p className="text-red-500 text-sm mt-1">{errors.soDt}</p>}
                </div>

                {/* Họ tên */}
                <div>
                    <label className="block mb-1 font-medium">Họ tên</label>
                    <input
                        name="hoTen"
                        value={form.hoTen}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border outline-none
                          ${errors.hoTen ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.hoTen && <p className="text-red-500 text-sm mt-1">{errors.hoTen}</p>}
                </div>

                {/* Button */}
                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg"
                    >
                        Thêm người dùng
                    </button>
                </div>

            </form>
        </div>
    );
}
