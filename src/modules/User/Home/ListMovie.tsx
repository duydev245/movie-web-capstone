import { useQuery } from '@tanstack/react-query';
import { Button, Card, Divider, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { movieApi } from '../../../apis/movie.api';
import { MovieItem } from '../../../interfaces/movie.interface';
import { useNavigate } from 'react-router-dom';
import { Link as Element } from 'react-scroll';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListMovie = () => {
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['list-movie'],
        queryFn: () => movieApi.listMovie(),
    });

    const handleDetailMovie = (maPhim: any) => {
        navigate(`/movie-details/${maPhim}`);
    };

    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }
    if (!data) return '';

    // Slick slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
    };

    return (
        <Content className='mx-auto max-w-7xl'>
            <Element name='listMovie' className="cursor-default">
                <div style={{ height: 100, maxWidth: 940, margin: 'auto', width: '100%' }} />
            </Element>
            <Divider orientation="left">
                <Typography className=' text-3xl'>Phim đang chiếu</Typography>
            </Divider>

            <Slider {...settings}>
                {data.map((movie: MovieItem) => (
                    <div key={movie.maPhim}>
                        <Card
                            hoverable
                            style={{ width: 300, margin: 'auto' }}
                        >
                            <img className=' object-cover w-full h-96 rounded' alt="example" src={movie.hinhAnh} />
                            <Typography className=' text-2xl truncate my-5 font-bold'>
                                {movie.tenPhim}
                            </Typography>
                            <div className='flex justify-around'>
                                <Button onClick={() => { handleDetailMovie(movie.maPhim) }} type='primary' className='mt-5 font-medium p-5 w-full'>Chi tiết</Button>
                            </div>
                        </Card>
                    </div>
                ))}
            </Slider>
        </Content>
    );
};

export default ListMovie;
