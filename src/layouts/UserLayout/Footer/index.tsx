

import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../redux/hooks'

const Footer = () => {
    const data = useAppSelector((state) => state.dataMovie.cinemasId)
    console.log('data: ', data);
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-around">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://movie-booking-project.vercel.app/img/headTixLogo.png" className="h-16 w-16" alt="Flowbite Logo" />
                    </Link>
                    <div>
                        <h5 className='text-white'>Đối tác</h5>
                        <div className='grid grid-cols-3 gap-4 mt-5'>
                            {data?.map((item: any) => {
                                return (
                                    <div className=''>
                                        <img width={50} src={item.logo} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            </div>
        </footer>
    )
}

export default Footer