import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    Card,
    Spin,
    Alert,
    Tag,
    Input,
    Space,
    Typography,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { listuser } from "./slice";

const { Title } = Typography;

const ListUser = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(
        (state) => state.adduserslice
    );

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(listuser());
    }, [dispatch]);

    const filteredUsers = users.filter((u) =>
        `${u.taiKhoan} ${u.hoTen} ${u.email}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            key: "taiKhoan",
            render: (text) => (
                <span className="font-medium text-gray-800">{text}</span>
            ),
        },
        {
            title: "Họ tên",
            dataIndex: "hoTen",
            key: "hoTen",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "SĐT",
            dataIndex: "soDT",
            key: "soDT",
        },
        {
            title: "Quyền",
            dataIndex: "maLoaiNguoiDung",
            key: "maLoaiNguoiDung",
            render: (role) =>
                role === "QuanTri" ? (
                    <Tag color="red">Quản trị</Tag>
                ) : (
                    <Tag color="blue">Khách hàng</Tag>
                ),
        },
    ];

    return (
        <Card
            className="shadow-md"
            bodyStyle={{ padding: 20 }}
            title={
                <div className="flex items-center justify-between">
                    <Title level={4} style={{ margin: 0 }}>
                        Danh sách người dùng
                    </Title>

                    <Input
                        allowClear
                        placeholder="Tìm theo tài khoản, tên, email..."
                        prefix={<SearchOutlined />}
                        style={{ width: 280 }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            }
        >
            {loading && (
                <div className="flex justify-center py-10">
                    <Spin size="large" />
                </div>
            )}

            {error && (
                <Alert
                    type="error"
                    message="Không thể tải danh sách"
                    description={error?.message}
                />
            )}

            {!loading && !error && (
                <Table
                    rowKey="taiKhoan"
                    columns={columns}
                    dataSource={filteredUsers}
                    pagination={{
                        pageSize: 8,
                        showSizeChanger: false,
                    }}
                    bordered
                />
            )}
        </Card>
    );
};

export default ListUser;
