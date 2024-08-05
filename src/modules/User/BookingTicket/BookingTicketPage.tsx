

import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout';
import { Button, Col, Row, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../../apis/movie.api';

const BookingTicketPage = () => {

    const { id } = useParams()
    console.log('id: ', id);

    const { data: movieBooking, isLoading, error } = useQuery({
        queryKey: ['movie-booking'],
        queryFn: () => movieApi.movieBooking(id),
    })

    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }

    if (!movieBooking) return ''

    return (
        <Content className='mx-auto max-w-screen-2xl'>
            <nav className="  dark:bg-gray-900 border-gray-200 dark:border-gray-700 z-10 w-full rounded">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movie</span>
                    </Link>
                    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 bg-transparent">
                            <li >

                                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:bg-sky-800" aria-current="page" >
                                    Home
                                </Link>

                            </li>
                            <li>
                                <Link to={`/movie-details`} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-1  dark:bg-blue-600 md:dark:bg-transparent hover:bg-sky-800" aria-current="page" >
                                    Detail Movie
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-1  dark:bg-blue-600 md:dark:bg-transparent hover:bg-sky-800" aria-current="page" >
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <Link to="auth/login" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-1 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent hover:bg-green-500 hover:text-white" aria-current="page" >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
            <Row gutter={24} className='mt-4'>
                <Col span={2}>
                    <div className='pt-40'>
                        <Button type='primary' className='w-full'>Đã đặt</Button>
                        <Button type='default' className='w-full mt-2'>Chưa đặt</Button>
                        <Button type='dashed' className='w-full mt-2'>Đang chọn</Button>
                    </div>
                </Col>
                <Col span={14}>
                    <div className=' h-20 text-center bg-black text-white transform pt-5'>
                        <h3 className='text-2xl'>Screen</h3>
                    </div>
                    <div className="grid grid-cols-10 gap-2 text-center mt-5">
                        {movieBooking.danhSachGhe.map((ghe) => {
                            return (
                                <Button type={`${ghe.daDat ? 'primary' : 'default'}`} key={ghe.maGhe}>
                                    {ghe.stt}
                                </Button>
                            )
                        })}
                    </div>
                </Col>

                <Col span={8}>
                    <div>
                        <Typography className=' text-3xl font-semibold text-green-600 flex justify-center'>
                            <img className='object-contain' style={{ width: '300px', height: '300px' }} src={movieBooking.thongTinPhim.hinhAnh} alt="" />
                        </Typography>
                        <Typography className=' text-center text-3xl font-semibold text-green-700 my-3 '>
                            {movieBooking.thongTinPhim.tenPhim}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-between mt-3'>
                        <Typography className=' text-xl font-semibold'>
                            Giờ chiếu / Ngày chiếu
                        </Typography>
                        <Typography className=' font-normal'>
                            {movieBooking.thongTinPhim.gioChieu}-{movieBooking.thongTinPhim.ngayChieu}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-between mt-3'>
                        <Typography className=' text-xl font-semibold'>
                            Cụm Rạp
                        </Typography>
                        <Typography className=' font-normal'>
                            {movieBooking.thongTinPhim.tenCumRap}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-between mt-3'>
                        <Typography className=' text-xl font-semibold'>
                            Rạp
                        </Typography>
                        <Typography className=' font-normal'>
                            {movieBooking.thongTinPhim.tenRap}
                        </Typography>
                    </div>
                    <hr />
                    <div className='flex justify-around mt-3 h-20 p-5'>
                        <Typography className=' text-xl font-semibold'>
                            Ghế đã chọn
                        </Typography>
                        <Typography className=' font-normal'>
                            <Button>99</Button>
                        </Typography>
                    </div>
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
                            6000$
                        </Typography>
                    </div>
                    <div className='mt-5'>
                        <Button className='w-full bg-green-700 text-white font-bold'>Thanh toán</Button>
                    </div>
                </Col>
            </Row>
        </Content >
    )
}

export default BookingTicketPage