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
      <nav className="bg-white border-gray-200 dark:border-gray-700 z-10 w-full shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0 ">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://movie-booking-project.vercel.app/img/headTixLogo.png" className="h-16" alt="Flowbite Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="list-none flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 bg-transparent">
              <li>
                <Link to="/" className="block py-2 px-3 text-black text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="block py-2 px-3 text-black text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600" aria-current="page">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
          tabPosition={'left'}
          items={movieDetails.heThongRapChieu.map((item: any) => {
            return {
              label: <img src={item.logo} className=' w-8 h-8 rounded-full'></img>,
              key: item.maHeThongRap,
              children: <div>
                {item.cumRapChieu.map((cumRap: any) => {
                  return (
                    <Space size={30} key={cumRap.maCumRap} direction='vertical'>
                      <Typography className='font-bold text-2xl'>
                        {cumRap.tenCumRap}
                      </Typography>

                      <Typography>
                        {cumRap.diaChi}
                      </Typography>

                      <div>
                        {cumRap.lichChieuPhim.map((lichChieu: any) => {
                          return (
                            <Button onClick={() => { handleBookingTickets(lichChieu.maLichChieu) }} type='default' key={lichChieu.maLichChieu}>
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
