

import { useQuery } from '@tanstack/react-query';
import { Button, Card, Col, Divider, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { movieApi } from '../../../apis/movie.api';
import { MovieItem } from '../../../interfaces/movie.interface';
import { useNavigate } from 'react-router-dom';

const ListMovie = () => {

    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ['list-movie'],
        queryFn: () => movieApi.listMovie(),
    });

    const handleDetailMovie = (maPhim: any) => {
        navigate(`/movie-details/${maPhim}`)
    }

    if (!isLoading && error) {
        return <div>Something went wrong</div>;
    }
    if (!data) return ''

    return (
        <Content className='mx-auto max-w-7xl'>
            <Divider orientation="left">
                <Typography className=' text-3xl'>
                    Danh Sách Phim
                </Typography>
            </Divider>

            <Row gutter={[16, 24]}>
                {data.map((movie: MovieItem) => {
                    return (
                        <Col key={movie.maPhim} className="gutter-row" span={6}>
                            <Card
                                hoverable
                                style={{ width: 300 }}
                            >
                                <img className=' object-cover w-full h-96 rounded' alt="example" src={movie.hinhAnh} />
                                <Typography className=' text-2xl truncate my-5 font-bold'>
                                    {movie.tenPhim}
                                </Typography>
                                <div className='flex justify-around'>
                                    <Button onClick={() => { handleDetailMovie(movie.maPhim) }} type='primary' className='mt-5 font-medium p-5 w-full'>Chi tiết</Button>
                                </div>
                            </Card>
                        </Col>

                    )
                })}
            </Row>

        </Content>
    )
}

export default ListMovie