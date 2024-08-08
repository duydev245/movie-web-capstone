import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, Button, Col, Row, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../../apis/movie.api';
import Swal from 'sweetalert2';
import { getLocalStorage, setLocalStorage } from '../../../utils';

const { Content } = Layout;

const BookingTicketPage = () => {
    const [listChairsSelected, setListChairsSelected] = useState([]);
    const [giaVe, setGiaVe] = useState([]);

    const { id } = useParams();

    const { data: movieBooking, isLoading, error } = useQuery({
        queryKey: ['movie-booking', id],
        queryFn: () => movieApi.movieBooking(id),
    });

    const handleChairSelected = (ghe) => {
        const isSeatSelected = listChairsSelected.some(chair => chair.maGhe === ghe.maGhe);

        if (isSeatSelected) {
            setListChairsSelected(prev => prev.filter(chair => chair.maGhe !== ghe.maGhe));
            setGiaVe(prev => prev.filter(gia => gia !== ghe.giaVe));
        } else {
            setListChairsSelected(prev => [...prev, ghe]);
            setGiaVe(prev => [...prev, ghe.giaVe]);
        }
    };

    const total = giaVe.reduce((tong, giaVe) => tong + giaVe, 0);

    const handlePayTickets = () => {
        Swal.fire({
            title: "Xác nhận đặt vé",
            text: "Bạn có chắc chắn muốn đặt chỗ ngồi này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Hủy",
            confirmButtonText: "Xác nhận"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Thành công!",
                    text: "Bạn đã đặt vé thành công.",
                    icon: "success"
                });

                const updatedChairs = listChairsSelected.map(chair => ({
                    ...chair,
                    daDat: true
                }));

                setListChairsSelected(updatedChairs);
                setGiaVe([]);
                setLocalStorage('listChair', updatedChairs);
            }
        });
    };

    useEffect(() => {
        getLocalStorage('listchair');
    }, [listChairsSelected]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong</div>;
    }

    if (!movieBooking) return '';

    return (
        <Content className="mx-auto">
            <Row gutter={24} className="mt-4 w-full p-5">
                <Col span={2}>
                    <div className="pt-40">
                        <Button type="dashed" className="w-full">
                            Đã đặt
                        </Button>
                        <Button type="primary" className="w-full mt-2">
                            Chưa đặt
                        </Button>
                        <Button type="default" className="w-full mt-2">
                            Đang chọn
                        </Button>
                    </div>
                </Col>
                <Col span={14}>
                    <div className="h-20 text-center text-white transform rounded-sm">
                        <img src="https://movie-booking-project.vercel.app/img/bookticket/screen.png" alt="" />
                    </div>
                    <div className="grid grid-cols-10 gap-2 text-center mt-5">
                        {movieBooking.danhSachGhe.map((ghe) => {
                            const isSelected = listChairsSelected.some(chair => chair.maGhe === ghe.maGhe);
                            return (
                                <Button
                                    disabled={ghe.daDat}
                                    onClick={() => handleChairSelected(ghe)}
                                    type={ghe.daDat ? 'dashed' : isSelected ? 'default' : 'primary'}
                                    key={ghe.maGhe}
                                >
                                    {ghe.tenGhe}
                                </Button>
                            );
                        })}
                    </div>
                </Col>
                <Col span={8}>
                    <div>
                        <Typography className=' text-center text-3xl font-semibold text-green-700 my-3 '>
                            {movieBooking.thongTinPhim.tenPhim}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-between my-3'>
                        <Typography className=' text-xl font-semibold'>
                            Giờ chiếu / Ngày chiếu
                        </Typography>
                        <Typography className=' font-normal'>
                            {movieBooking.thongTinPhim.gioChieu} - {movieBooking.thongTinPhim.ngayChieu}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-between my-3'>
                        <Typography className=' text-xl font-semibold'>
                            Cụm Rạp
                        </Typography>
                        <Typography className=' font-normal'>
                            {movieBooking.thongTinPhim.tenCumRap}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-between my-3'>
                        <Typography className=' text-xl font-semibold'>
                            Rạp
                        </Typography>
                        <Typography className=' font-normal'>
                            {movieBooking.thongTinPhim.tenRap}
                        </Typography>
                    </div>
                    <hr />
                    <Row gutter={24} className='flex my-3 h-[350px] p-5'>
                        <Col span={8} className=' text-xl font-semibold'>
                            Ghế đã chọn
                        </Col>
                        <Col span={16} className='h-full font-normal flex flex-col overflow-scroll items-end'>
                            {listChairsSelected.map((chair) => (
                                !chair.daDat && (
                                    <Button key={chair.maGhe} className='w-52 mb-1'>
                                        <p>
                                            Ghế {chair.tenGhe} giá:
                                            <span className='text-green-600'>
                                                {chair.giaVe} $
                                            </span>
                                        </p>
                                    </Button>
                                )
                            ))}
                        </Col>
                    </Row>
                    <div className='flex justify-between mt-3'>
                        <Typography className=' text-xl font-semibold'>
                            Ưu đãi
                        </Typography>
                        <Typography className=' font-normal'>
                            0%
                        </Typography>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <Typography className=' text-xl font-semibold'>
                            Tổng tiền
                        </Typography>
                        <Typography className=' font-normal'>
                            <p className='text-green-600'>{total} $</p>
                        </Typography>
                    </div>
                    <div className='mt-5'>
                        <Button onClick={handlePayTickets} className='w-full bg-green-700 text-white font-bold'>Thanh toán</Button>
                    </div>
                </Col>
            </Row>
        </Content>
    );
};

export default BookingTicketPage;
