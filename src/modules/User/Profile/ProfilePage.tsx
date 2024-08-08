
import React from 'react';
import type { FormProps, TableProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row, Space, Table, Tag } from 'antd';
import { getLocalStorage } from '../../../utils';
import { Content } from 'antd/es/layout/layout';

const ProfilePage = () => {

    type FieldType = {
        username?: string;
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
            title: <h4>Tên ghế</h4>,
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
    console.log('list: ', listBooked);

    const dataSource = listBooked || []

    return (

        <Content className='mx-auto max-w-8xl mt-20'>
            <Row gutter={24}>
                <Col className='flex flex-col justify-center items-center' span={12}>
                    <h1 className='text-center'>Thông tin tài khoản</h1>
                    <div className='text-center'>
                        <img className='rounded-full' src="https://ssl.gstatic.com/onebox/media/sports/headshots/SD5iRx-eis3AUVvq_108x108.jpg" alt="" />
                    </div>
                    <Form
                        className='mt-5 w-full max-w-2xl'
                        name="basic"
                        labelCol={{ span: 5 }}
                        labelAlign='left'
                        wrapperCol={{ span: 15 }}
                        initialValues={{ remember: true }}
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
                            label={<h4>Mật khẩu</h4>}
                            name="password"
                            rules={[{ message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<h4>Email</h4>}
                            name="phone"
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