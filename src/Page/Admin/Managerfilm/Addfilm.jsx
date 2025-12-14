import { useEffect, useState } from "react";
import { Input, DatePicker, Switch, Button, message } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addFlim, getFilmDetail, updateFilm } from "./slice";
import { useParams } from "react-router-dom";


export default function Addfilm() {
    const [imgPreview, setImgPreview] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const dispatch = useDispatch();

    const { id } = useParams()

    const [film, setFilm] = useState({
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "GP01",
        ngayKhoiChieu: "",
        sapChieu: false,
        dangChieu: false,
        hot: false,
        danhGia: "",
    });

    const { filmDetail } = useSelector((state) => state.addFilmslice)
    const [errors, setErrors] = useState({});

    // ---------------- HANDLE INPUT ----------------
    const handleChange = (name, value) => {
        setFilm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImgFile(file);
        setImgPreview(URL.createObjectURL(file));
    };

    // ---------------- VALIDATE ----------------
    const validate = () => {
        let newErrors = {};

        if (!film.tenPhim.trim()) newErrors.tenPhim = "Tên phim không được để trống";
        if (!film.trailer.trim()) newErrors.trailer = "Trailer không được để trống";
        if (!film.moTa.trim()) newErrors.moTa = "Mô tả không được để trống";
        if (!film.ngayKhoiChieu) newErrors.ngayKhoiChieu = "Chọn ngày khởi chiếu";
        if (!film.danhGia || film.danhGia < 0 || film.danhGia > 5)
            newErrors.danhGia = "Số sao phải từ 0 - 5";
        if (!id && !imgFile)
            newErrors.hinhAnh = "Chọn hình ảnh";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ---------------- HANDLE SUBMIT ----------------
    const handleAdd = () => {
        if (!validate()) {
            message.error("Vui lòng kiểm tra lại thông tin!");
            return;
        }

        // Gửi đúng chuẩn API: FormData
        const formData = new FormData();
        formData.append("tenPhim", film.tenPhim);
        formData.append("trailer", film.trailer);
        formData.append("moTa", film.moTa);
        formData.append("maNhom", "GP01");
        formData.append("ngayKhoiChieu", film.ngayKhoiChieu);
        formData.append("sapChieu", film.sapChieu);
        formData.append("dangChieu", film.dangChieu);
        formData.append("hot", film.hot);
        formData.append("danhGia", film.danhGia);
        formData.append("hinhAnh", imgFile, imgFile.name);

        dispatch(addFlim(formData)); // <--- gửi FormData THẬT

        message.success("Thêm phim thành công!");
    };

    useEffect(() => {
        if (id) {
            dispatch(getFilmDetail(id))

        }

    }, [id])

    useEffect(() => {
        if (filmDetail && id) {
            setFilm({
                tenPhim: filmDetail.tenPhim,
                trailer: filmDetail.trailer,
                moTa: filmDetail.moTa,
                maNhom: filmDetail.maNhom,
                ngayKhoiChieu: filmDetail.ngayKhoiChieu,
                sapChieu: filmDetail.sapChieu,
                dangChieu: filmDetail.dangChieu,
                hot: filmDetail.hot,
                danhGia: filmDetail.danhGia,
            });

            setImgPreview(filmDetail.hinhAnh);
        }
    }, [filmDetail]);

    const handleUpdate = () => {
        if (!validate()) {
            message.error("Vui lòng kiểm tra lại thông tin!");
            return;
        }

        const formData = new FormData();
        formData.append("maPhim", id);
        formData.append("tenPhim", film.tenPhim);
        formData.append("trailer", film.trailer);
        formData.append("moTa", film.moTa);
        formData.append("maNhom", film.maNhom);
        formData.append("ngayKhoiChieu", film.ngayKhoiChieu);
        formData.append("sapChieu", film.sapChieu);
        formData.append("dangChieu", film.dangChieu);
        formData.append("hot", film.hot);
        formData.append("danhGia", film.danhGia);

        if (imgFile) {
            formData.append("hinhAnh", imgFile, imgFile.name);
        }

        dispatch(updateFilm(formData));
        message.success("Cập nhật phim thành công!");
    }


    return (
        <div className="flex-1 p-10 bg-white min-h-screen">
            <h2 className="text-2xl font-bold mb-8">
                {id ? "Cập nhật phim" : "Thêm mới phim"}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">

                    {/* TÊN PHIM */}
                    <div>
                        <label className="font-semibold">Tên phim:</label>
                        <Input value={film.tenPhim} onChange={(e) => handleChange("tenPhim", e.target.value)} />
                        {errors.tenPhim && <p className="text-red-600">{errors.tenPhim}</p>}
                    </div>

                    {/* TRAILER */}
                    <div>
                        <label className="font-semibold">Trailer:</label>
                        <Input value={film.trailer} onChange={(e) => handleChange("trailer", e.target.value)} />
                        {errors.trailer && <p className="text-red-600">{errors.trailer}</p>}
                    </div>

                    {/* MÔ TẢ */}
                    <div>
                        <label className="font-semibold">Mô tả:</label>
                        <Input.TextArea value={film.moTa} rows={4} onChange={(e) => handleChange("moTa", e.target.value)} />
                        {errors.moTa && <p className="text-red-600">{errors.moTa}</p>}
                    </div>

                    {/* NGÀY KHỞI CHIẾU */}
                    <div>
                        <label className="font-semibold">Ngày khởi chiếu:</label>
                        <DatePicker
                            value={film.ngayKhoiChieu ? dayjs(film.ngayKhoiChieu, "DD/MM/YYYY") : null}
                            className="w-full"
                            format="DD/MM/YYYY"
                            onChange={(date) =>
                                handleChange("ngayKhoiChieu", dayjs(date).format("DD/MM/YYYY"))
                            }
                        />
                        {errors.ngayKhoiChieu && (
                            <p className="text-red-600">{errors.ngayKhoiChieu}</p>
                        )}
                    </div>

                    {/* SWITCHES */}
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Đang chiếu:</span>
                        <Switch checked={film.dangChieu}
                            onChange={(v) => handleChange("dangChieu", v)} />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Sắp chiếu:</span>
                        <Switch checked={film.sapChieu}
                            onChange={(v) => handleChange("sapChieu", v)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Hot:</span>
                        <Switch checked={film.hot}
                            onChange={(v) => handleChange("hot", v)}
                        />
                    </div>

                    {/* SỐ SAO */}
                    <div>
                        <label className="font-semibold">Số sao:</label>
                        <Input
                            value={film.danhGia}
                            type="number"
                            min="0"
                            max="5"
                            onChange={(e) => handleChange("danhGia", e.target.value)}
                        />
                        {errors.danhGia && <p className="text-red-600">{errors.danhGia}</p>}
                    </div>

                    {/* HÌNH ẢNH */}
                    <div>
                        <label className="font-semibold block mb-1">Hình ảnh:</label>
                        <input type="file" accept="image/*" onChange={handleImage} />
                        {errors.hinhAnh && <p className="text-red-600">{errors.hinhAnh}</p>}
                    </div>
                </div>

                {/* PREVIEW */}
                <div className="flex justify-center items-start">
                    {imgPreview ? (
                        <img src={imgPreview} className="w-72 h-96 object-cover rounded-lg shadow-md" />
                    ) : (
                        <div className="w-72 h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            Chưa có hình
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10">
                <Button type="primary" size="large" className="bg-blue-600" onClick={id ? handleUpdate : handleAdd}>
                    {id ? "Cập nhật phim" : "Thêm phim"}
                </Button>
            </div>
        </div>
    );
}
