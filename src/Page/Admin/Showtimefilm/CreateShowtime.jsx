import { Form, Select, DatePicker, InputNumber, Button, Card, Image, message, Space } from "antd";
import { cinemaCluster, infocinema, showtime } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { getFilmDetail } from "../Managerfilm/slice";



const CreateShowtime = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [maHeThongRap, setMaHeThongRap] = useState("");

    const { filmDetail } = useSelector((state) => state.addFilmslice)

    const { data, cinemaClusters } = useSelector(
        (state) => state.createShowtimeSlice
    );

    useEffect(() => {
        dispatch(infocinema());
    }, [dispatch]);

    useEffect(() => {
        if (maHeThongRap) {
            dispatch(cinemaCluster(maHeThongRap));

        }
    }, [maHeThongRap, dispatch]);

    const handleshowtime = async (values) => {
        const payload = {
            maPhim: Number(id),
            maRap: values.maRap,
            giaVe: Number(values.giaVe),
            ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format("DD/MM/YYYY HH:mm:ss"),
        };

        console.log("payload gửi lên API:", payload);

        try {
            await dispatch(showtime(payload)).unwrap();
            message.success("Tạo lịch chiếu thành công 🎉");
            navigate("/admin");
        } catch (err) {
            message.error(err?.content || "Tạo lịch chiếu thất bại");
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(getFilmDetail(id))
        }

    }, [id])

    return (
        <div className="w-full p-4">
            <Card
                title={<span className="text-lg font-semibold">🎬 Tạo lịch chiếu</span>}
                className="w-full shadow-sm rounded-xl"
                styles={{
                    body: {
                        padding: 24,
                    },
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Poster */}

                    <div className="lg:col-span-4 xl:col-span-3 flex justify-center">
                        <div className="w-full max-w-[260px] text-center">
                            {/* Tên phim */}
                            <h2 className="mb-2 text-lg font-semibold flex items-center justify-center gap-2">
                                🎬 {filmDetail?.tenPhim}
                            </h2>

                            {/* Poster */}
                            <Image
                                src={filmDetail?.hinhAnh}
                                preview={false}
                                className="w-full rounded-xl shadow-md object-cover"
                            />
                        </div>
                    </div>


                    {/* Form */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleshowtime}
                        >
                            {/* Hệ thống & Cụm rạp */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Form.Item
                                    label="Hệ thống rạp"
                                    name="maHeThongRap"
                                    rules={[{ required: true, message: "Vui lòng chọn hệ thống rạp" }]}
                                >
                                    <Select
                                        placeholder="Chọn hệ thống rạp"
                                        size="large"
                                        onChange={(value) => {
                                            setMaHeThongRap(value);
                                            form.resetFields(["maRap"]);
                                        }}
                                    >
                                        {data?.map((rap) => (
                                            <Select.Option
                                                key={rap.maHeThongRap}
                                                value={rap.maHeThongRap}
                                            >
                                                {rap.tenHeThongRap}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Cụm rạp"
                                    name="maRap"
                                    rules={[{ required: true, message: "Vui lòng chọn cụm rạp" }]}
                                >
                                    <Select
                                        placeholder="Chọn cụm rạp"
                                        size="large"
                                        disabled={!cinemaClusters?.length}
                                    >
                                        {cinemaClusters?.map((cumRap) => (
                                            <Select.Option
                                                key={cumRap.maCumRap}
                                                value={cumRap.maCumRap}
                                            >
                                                {cumRap.tenCumRap}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            {/* Giá vé & Ngày giờ */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                                <Form.Item
                                    label="Giá vé"
                                    name="giaVe"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập giá vé" },
                                        {
                                            validator: (_, value) => {
                                                if (value === undefined || value === null) {
                                                    return Promise.reject("Vui lòng nhập giá vé");
                                                }
                                                if (Number(value) <= 0) {
                                                    return Promise.reject("Giá vé phải lớn hơn 0");
                                                }
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        size="large"
                                        className="w-full"
                                        min={1}
                                        step={1000}
                                        precision={0}
                                        addonAfter="VNĐ"
                                        placeholder="Ví dụ: 75000"
                                    />
                                </Form.Item>




                                <Form.Item
                                    label="Ngày & giờ chiếu"
                                    name="ngayChieuGioChieu"
                                    rules={[{ required: true, message: "Vui lòng chọn ngày chiếu" }]}
                                >
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm"
                                        size="large"
                                        className="w-full"
                                    />
                                </Form.Item>
                            </div>

                            {/* Button */}
                            <div className="flex justify-end mt-6">
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    className="px-8 rounded-lg"
                                >
                                    🎟️ Tạo lịch chiếu
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Card>
        </div>

    );
};

export default CreateShowtime;
