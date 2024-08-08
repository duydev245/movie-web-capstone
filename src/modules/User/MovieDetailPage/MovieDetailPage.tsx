import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Space, Tabs, Typography } from "antd";
import { format } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { movieApi } from "../../../apis/movie.api";

const MovieDetailPage = () => {

  const { id } = useParams();
  console.log('id: ', id);

  const navigate = useNavigate()

  const { data: movieDetails, isLoading, error } = useQuery({
    queryKey: ['movie-details'],
    queryFn: () => movieApi.movieDetails(id),

  });

  const handleBookingTickets = (maLichChieu: any) => {
    console.log('maLichChieu: ', maLichChieu);

    navigate(`/booking/${maLichChieu}`)

  }

  if (!isLoading && error) {
    return <div>Something went wrong</div>;
  }

  if (!movieDetails) return ''

  return (
    <Content className='mx-auto max-w-full' >
      <Row gutter={24} className='mt-4'>
        <Col span={10}>
          <img src={movieDetails.hinhAnh} className='h-64 w-full object-contain' alt={movieDetails.tenPhim} />
        </Col>
        <Col span={14}>
          <Typography className=' text-3xl font-semibold text-green-600'>
            {movieDetails.tenPhim}
          </Typography>
          <Typography className=' text-2xl font-semibold mt-3'>
            <h3> Mô tả:</h3>
            <p className='font-thin ml-3'>{movieDetails.moTa}</p>
          </Typography>
          <Typography className=' text-2xl font-semibold flex'>
            <h3>Ngày khởi chiếu:</h3>
            <p className='font-thin ml-3'>{format(movieDetails.ngayKhoiChieu, 'PPpp')}</p>
          </Typography>
        </Col>
      </Row>

      <div className='mt-8 px-40'>
        <Tabs
          className=""
          tabPosition={'left'}
          items={movieDetails.heThongRapChieu.map((item: any) => {
            return {
              label: <img src={item.logo} className=' w-8 h-8 rounded-full'></img>,
              key: item.maHeThongRap,
              children: <div className="h-[400px] overflow-scroll">
                {item.cumRapChieu.map((cumRap: any) => {
                  return (
                    <Space className="flex mb-5" size={30} key={cumRap.maCumRap} direction='vertical'>
                      <Typography className='font-bold text-2xl'>
                        {cumRap.tenCumRap}
                      </Typography>

                      <Typography>
                        {cumRap.diaChi}
                      </Typography>

                      <div>
                        {cumRap.lichChieuPhim.map((lichChieu: any) => {
                          return (
                            <Button className="mr-5 mb-5" onClick={() => { handleBookingTickets(lichChieu.maLichChieu) }} type='default' key={lichChieu.maLichChieu}>
                              {format(lichChieu.ngayChieuGioChieu, 'PPpp')}
                            </Button>
                          )
                        })}
                      </div>

                    </Space>)
                })}
              </div>,
            };
          })}
        />
      </div>
    </Content>

  )
}

export default MovieDetailPage
