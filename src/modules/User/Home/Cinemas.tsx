

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { movieApi } from '../../../apis/movie.api';
import { Content } from 'antd/es/layout/layout';
import { Button, Card, Col, Divider, Row, Tabs, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link as Element } from 'react-scroll';
import { useAppDispatch } from '../../../redux/hooks';
import { setCinemasId } from '../../../redux/slices/movie.slice';



const Cinemas = () => {

    const [cinemaClick, setCinemaClick] = useState("BHDStar");
    const [cinemaIdClick, setCinemaIdClick] = useState("bhd-star-cineplex-3-2");

    const navigate = useNavigate()
    const distpatch = useAppDispatch()

    const { data: listCinemasId, isLoading, error } = useQuery({
        queryKey: ['list-cinemas'],
        queryFn: () => movieApi.listCinemasId(),
    });

    const { data: listCinemasName } = useQuery({

        queryKey: ['list-cinemas-name', cinemaClick],
        queryFn: () => {
            if (cinemaClick) {
                return movieApi.listCinemasName(cinemaClick)
            }
        },
        enabled: !!cinemaClick,
    });

    const { data: listMovieByCinemas } = useQuery({
        queryKey: ['list-movie-by-cinemas', cinemaClick],
        queryFn: () => {
            if (cinemaIdClick) {
                return movieApi.listMovieByCinemas(cinemaClick)
            }
        },
        enabled: !!cinemaClick,
    });

    const handleMaHeThongRap = (cinemaClick: any) => {
        setCinemaClick(cinemaClick)
    };

    const handleTenHeThongRap = (tenRap: any) => {
        setCinemaIdClick(tenRap)
    }

    const handleDetailMovie = (maPhim: any) => {
        navigate(`/movie-details/${maPhim}`)
    }

    useEffect(() => {
        distpatch(setCinemasId(listCinemasId))
    });

    useEffect(() => {
    }, [cinemaClick, cinemaIdClick]);


    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }

    if (!listCinemasId) return ''
    if (!listCinemasName) return ''
    if (!listMovieByCinemas) return ''

    return (
        <Content className='mx-60 mb-40'>
            <Element name='cinemas' className="cursor-default">
                <div style={{ height: 100, maxWidth: 940, margin: 'auto', width: '100%', background: 'url("img/back-news.png") 0% 0% / 100% no-repeat' }} />
            </Element>
            <Divider orientation="left">
                <Typography className=' text-3xl'>
                    Danh Sách Phim Theo Rạp
                </Typography>
            </Divider>
            <div className='mt-10'>
                <Tabs
                    tabPosition={'left'}
                    items={listCinemasId.map((item: any) => {
                        return {
                            label:
                                <div onClick={() => { handleMaHeThongRap(item.maHeThongRap) }}>
                                    <div className='w-full flex'>
                                        <img src={item.logo} className=' h-8 rounded-full' alt={`${item.tenHeThongRap} logo`}></img>
                                        <h1 className=' text-2xl'>{item.tenHeThongRap}</h1>
                                    </div>
                                </div>,
                            key: item.maHeThongRap,
                            children:
                                (
                                    <Row gutter={24}>
                                        <Col span={7} className='cursor-pointer block overflow-scroll h-[500px]'>
                                            {listCinemasName.map((cinema: any) => {
                                                return (

                                                    <div key={cinema.maCumRap}>

                                                        <Button onClick={() => { handleTenHeThongRap(cinema.maCumRap) }} className='btn-hover mb-2 w-60 h-[60px] flex-col items-start overflow-hidden'>
                                                            <h5 className='font-sans'>{cinema.tenCumRap}</h5>
                                                            <p className='righttoleft font-medium '>{cinema.diaChi}</p>
                                                        </Button>

                                                    </div>
                                                )
                                            })}
                                        </Col>
                                        <Col span={17}>
                                            {listMovieByCinemas.map((listcinemas: any) => {
                                                return listcinemas.lstCumRap.map((cinemaId: any) => {
                                                    if (cinemaId.maCumRap === cinemaIdClick) {
                                                        return (
                                                            <div key={cinemaId.maCumRap} className='flex grid grid-cols-4 gap-5 overflow-scroll h-[500px]'>
                                                                {cinemaId.danhSachPhim.map((phim: any) => {
                                                                    return (<Card.Grid key={phim.maPhim}>
                                                                        <div className='flex flex-col'>
                                                                            <img className='h-[100px] w-full object-contain' src={phim.hinhAnh} alt="" />
                                                                            <h4 className=' text-center'>{phim.tenPhim}</h4>
                                                                            <div className=' flex gap-2 justify-center'>
                                                                                <Button onClick={() => { handleDetailMovie(phim.maPhim) }} type='primary'>Chi tiết</Button>
                                                                            </div>
                                                                        </div>
                                                                    </Card.Grid>)
                                                                })}
                                                            </div>
                                                        )
                                                    }
                                                })
                                            })}
                                        </Col>
                                    </Row>
                                )
                        };
                    })}
                />
            </div>

        </Content>
    )
}

export default Cinemas