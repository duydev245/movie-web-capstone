


import { useQuery } from '@tanstack/react-query'
import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import { movieApi } from '../../../apis/movie.api'
import { BannerItem } from '../../../interfaces/movie.interface'
import { useNavigate } from "react-router-dom";


const Banner = () => {

    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['list-banner'],
        queryFn: () => movieApi.listBanner(),
    });

    const handleDetailMovie = (maPhim: any) => {
        navigate(`/movie-details/${maPhim}`);
    };

    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }

    if (!data) return ''

    return (
        <div>
            <Carousel arrows infinite={true} dots={false}>
                {data.map((item: BannerItem) => {
                    return (
                        <div onClick={() => { handleDetailMovie(item.maPhim) }} className='mt-[64px]' key={item.maBanner}>

                            <img src={item.hinhAnh} className='w-full h-[800px] object-center cursor-pointer' />
                        </div>
                    )
                })}

            </Carousel>

        </div>
    )
}

export default Banner