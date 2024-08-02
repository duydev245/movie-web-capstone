

import { useQuery } from '@tanstack/react-query'
import { Carousel } from 'antd'
import React, { useEffect } from 'react'
import { movieApi } from '../../../apis/movie.api'
import { BannerItem } from '../../../interfaces/movie.interface'


const Banner = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['list-banner'],
        queryFn: () => movieApi.listBanner(),
    });

    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }
    if (!data) return ''

    return (
        <div>

            <Carousel arrows infinite={false}>

                {data.map((item: BannerItem) => {
                    return (
                        <div key={item.maBanner} onClick={() => { }}>
                            <img src={item.hinhAnh} className='w-full h-[800px] object-center cursor-pointer' />
                        </div>
                    )
                })}

            </Carousel>

        </div>
    )
}

export default Banner