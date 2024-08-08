
import React from 'react';
import type { FormProps } from 'antd';
import { Col, Form, Input, Row, Table, Tag } from 'antd';
import { getLocalStorage } from '../../../utils';
import { Content } from 'antd/es/layout/layout';
import { useAppSelector } from '../../../redux/hooks';

const ProfilePage = () => {

    type FieldType = {
        username?: string;
        fullname?: string;
        password?: string;
        email?: string;
        phone?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //table

    const columns = [

        {
            title: <h4>Số ghế</h4>,
            key: 'ten-ghe',
            dataIndex: 'tenGhe',

        },
        {
            title: <h4>Mã vé</h4>,
            key: 'ma-ve',
            dataIndex: 'maGhe',

        },
        {
            title: <h4>Loại ghế</h4>,
            key: 'loai-ghe',
            dataIndex: 'loaiGhe',
            render: (_, { loaiGhe }) => {
                return <Tag color={loaiGhe === "Vip" ? 'error' : 'warning'}>{loaiGhe === "Vip" ? "Vip" : 'Thường'}</Tag>
            }

        },
        {
            title: <h4>Giá vé</h4>,
            key: 'gia-ve',
            dataIndex: 'giaVe',
            render: (_, { giaVe }) => {
                return <span>{giaVe} $</span>
            }

        },
    ];

    const listBooked = getLocalStorage('listChair')

    const currentUser = useAppSelector((state) => state.user.currentUser)

    const dataSource = listBooked || []

    return (

        <Content className='mx-auto max-w-8xl mt-20'>
            <Row gutter={24}>
                <Col className='flex flex-col items-center' span={12}>
                    <div className='text-center'>
                        <h1 className='text-center'>Thông tin tài khoản</h1>
                        <img className='rounded-full mt-5' src="https://ssl.gstatic.com/onebox/media/sports/headshots/SD5iRx-eis3AUVvq_108x108.jpg" alt="" />
                    </div>
                    <Form
                        className='mt-5 w-full max-w-2xl'
                        name="basic"
                        labelCol={{ span: 5 }}
                        labelAlign='left'
                        wrapperCol={{ span: 15 }}
                        initialValues={{
                            username: currentUser?.taiKhoan,
                            fullname: currentUser?.hoTen,
                            email: currentUser?.email,
                            phone: currentUser?.soDT,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label={<h4>Tài khoản</h4>}
                            name="username"
                            rules={[{ message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<h4>Họ và Tên</h4>}
                            name="fullname"
                            rules={[{ message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<h4>Email</h4>}
                            name="email"
                            rules={[{ message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<h4>Số điện thoại</h4>}
                            name="phone"
                            rules={[{ message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                    </Form>
                </Col>
                <Col span={12}>
                    <h1 className='text-center'>Vé đã đặt</h1>
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                </Col>
            </Row>s
        </Content>
    )
}

export default ProfilePage