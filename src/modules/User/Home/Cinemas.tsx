

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { movieApi } from '../../../apis/movie.api';
import { Content } from 'antd/es/layout/layout';
import { Button, Card, Divider, Tabs, Typography } from 'antd';
import { useAppDispatch } from '../../../redux/hooks';
import { setCinemas, setCinemasInfo } from '../../../redux/slices/movie.slice';

const Cinemas = () => {

    const [cinemaClick, setCinemaClick] = useState("BHDStar");

    const dispatch = useAppDispatch();

    const { data: listCinemas, isLoading, error } = useQuery({
        queryKey: ['list-cinemas'],
        queryFn: () => movieApi.listCinemas(),
    });

    const { data: listMovieByCinemas } = useQuery({
        queryKey: ['list-movie-by-cinemas', cinemaClick],
        queryFn: () => movieApi.listMovieByCinemas(cinemaClick),
        enabled: !!cinemaClick,
    });
    console.log("listMBC", listMovieByCinemas);

    const handleMaHeThongRap = (cinemaClick: any) => {
        console.log('cinemaClick: ', cinemaClick);
        setCinemaClick(cinemaClick)
    };

    useEffect(() => {
        dispatch(setCinemas(listCinemas))
        dispatch(setCinemasInfo(listMovieByCinemas))
    }, [listCinemas, listMovieByCinemas, dispatch]);


    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }

    if (!listCinemas) return ''
    if (!listMovieByCinemas) return ''

    return (
        <Content className='mx-60 mb-36'>
            <Divider orientation="left">
                <Typography className=' text-3xl'>
                    Danh Sách Phim Theo Rạp
                </Typography>
            </Divider>
            <div className=''>
                <Tabs
                    className=''
                    tabPosition={'left'}
                    items={listCinemas.map((item: any) => {
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
                                (<div className='cursor-pointer block mt-5'>
                                    {listMovieByCinemas.map((cinema: any) => {
                                        return (
                                            <div key={cinema.maCumRap}>
                                                <Button className='mb-2 w-60 h-[60px] flex-col items-start truncate'>
                                                    <h4 className='font-sans'>{cinema.tenCumRap}</h4>
                                                    <p className='font-medium'>{cinema.diaChi}</p>
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </div>)
                        };
                    })}
                />
            </div>

        </Content>
    )
}

export default Cinemas

// <div key={cinema.maHeThongRap}>
//     {/* {cenema.lstCumRap.map((cumRap) => {
//         return (
//             <div key={cumRap.maHeThongRap}>
//                 <Card title={cumRap.tenCumRap}>
//                     {cumRap.danhSachPhim.map((listPhim) => {
//                         return (
//                             <Card.Grid key={listPhim.maPhim} onClick={() => { handleDetailMovie(listPhim.maPhim) }}>
//                                 <div>
//                                     <img className='h-60 w-full object-contain' src={listPhim.hinhAnh} alt="" />
//                                 </div>
//                                 <h1 className='text-center mt-5 text-3xl font-thin'>
//                                     {listPhim.tenPhim}
//                                 </h1>
//                             </Card.Grid>
//                         )
//                     })}
//                 </Card>
//             </div>
//         )
//     })} */}
// </div>