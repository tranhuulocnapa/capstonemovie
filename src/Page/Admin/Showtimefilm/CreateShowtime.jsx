import { Form, Select, DatePicker, InputNumber, Button, Card, Image, message } from "antd";
import { cinemaCluster, infocinema, showtime } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const CreateShowtime = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // ID phim từ URL params
    const [maHeThongRap, setMaHeThongRap] = useState("");
    const [raps, setRaps] = useState([]);
    const [maCumRap, setMaCumRap] = useState(null); // lưu cụm rạp đã chọn

    const { data, cinemaClusters } = useSelector(
        (state) => state.createShowtimeSlice
    );

    useEffect(() => {
        dispatch(infocinema());
    }, [dispatch]);

    useEffect(() => {
        if (maHeThongRap) {
            dispatch(cinemaCluster(maHeThongRap));
            setRaps([]); // reset rạp khi đổi hệ thống rạp
            setMaCumRap(null);
        }
    }, [maHeThongRap, dispatch]);

    const handleshowtime = async (values) => {
        const payload = {
            maPhim: Number(id),
            maRap: Number(values.maRap),
            giaVe: Number(values.giaVe),
            ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format("DD/MM/YYYY HH:mm:ss"),
        };

        console.log("payload gửi lên API:", payload);

        try {
            await dispatch(showtime(payload)).unwrap();
            message.success("Tạo lịch chiếu thành công 🎉");
        } catch (err) {
            message.error(err?.content || "Tạo lịch chiếu thất bại");
        }
    };

    return (
        <div className="w-full px-2 md:px-4">
            <Card
                title={<span className="text-lg font-semibold">🎬 Tạo lịch chiếu</span>}
                className="w-full shadow-sm rounded-xl"
                style={{ padding: 24 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Poster */}
                    <div className="lg:col-span-3 flex justify-center">
                        <Image
                            src="https://via.placeholder.com/300x450?text=Movie+Poster"
                            className="rounded-lg shadow-md"
                            preview={false}
                        />
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-9">
                        <Form layout="vertical" onFinish={handleshowtime}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item label="Hệ thống rạp" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Chọn hệ thống rạp"
                                        size="large"
                                        onChange={(value) => setMaHeThongRap(value)}
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

                                <Form.Item label="Cụm rạp" rules={[{ required: true }]}>
                                    <Select
                                        placeholder="Chọn cụm rạp"
                                        size="large"
                                        disabled={!cinemaClusters?.length}
                                        onChange={(value) => {
                                            setMaCumRap(value); // lưu cụm rạp
                                            const selected = cinemaClusters.find(c => c.maCumRap === value);
                                            setRaps(selected?.danhSachRap || []);
                                        }}
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    label="Rạp chiếu"
                                    name="maRap"
                                    rules={[{ required: true, message: "Vui lòng chọn rạp" }]}
                                >
                                    <Select placeholder="Chọn rạp" size="large" disabled={!raps.length}>
                                        {raps.map((rap) => (
                                            <Select.Option
                                                key={rap.maRap}
                                                value={Number(rap.maRap)}
                                            >
                                                {rap.tenRap}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Giá vé (VNĐ)"
                                    name="giaVe"
                                    rules={[{ required: true, message: "Vui lòng nhập giá vé" }]}
                                >
                                    <InputNumber min={75000} step={5000} size="large" className="w-full" />
                                </Form.Item>
                            </div>

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

                            <Form.Item className="pt-4">
                                <Button type="primary" size="large" htmlType="submit" className="w-full md:w-64">
                                    🎟️ Tạo lịch chiếu
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CreateShowtime;
