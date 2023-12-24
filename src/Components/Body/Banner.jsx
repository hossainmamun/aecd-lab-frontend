import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Banner = () => {
   const [sliderRef, setSliderRef] = useState(null);
   const [banner, setBanner] = useState([]);

   const [loading, setLoading] = useState(null);

   const settings = {
      fade: true,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 6000,
      pauseOnHover: false,
      cssEase: 'linear',
      arrows: false,
   };

   // get all banner content
   const getAllBanner = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/hero/get_All_hero'
         );
         if (content.status === 200) {
            setBanner(content.data);
            setLoading(false);
         }
      } catch (error) {
         setLoading(false);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   // useEffect hook
   useEffect(() => {
      getAllBanner();
   }, []);

   return (
      <div>
         {loading ? (
            <div className='text-center'>
               <h3 className='text-xl'>Please wait...</h3>
            </div>
         ) : (
            <div className='h-dvh'>
               {banner.length != 0 && (
                  <div className='lg:grid lg:grid-cols-2 gap-x-12 items-center space-y-10 md:space-y-0'>
                     {/* banner image */}
                     <Slider ref={setSliderRef} {...settings}>
                        {banner.map((banner) => (
                           <div key={banner._id} className='h-dvh'>
                              <img
                                 src={banner.heroImage}
                                 alt='banner image'
                                 className='w-full h-dvh'
                              />
                           </div>
                        ))}
                     </Slider>
                     {/* banner content */}
                     <div className='space-y-4 lg:space-y-8 text-center lg:text-start py-10'>
                        <Slider ref={setSliderRef} {...settings}>
                           {banner.map((banner) => (
                              <div key={banner._id} className='space-y-4'>
                                 <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold capitalize text-primary lg:w-9/12'>
                                    {banner.heroHeader}
                                 </h1>
                                 <p className='text-base text-justify lg:text-lg xl:text-xl lg:w-10/12 px-5 lg:px-0'>
                                    {banner.heroDetail}
                                 </p>
                              </div>
                           ))}
                        </Slider>

                        <div className='md:space-x-2'>
                           <Link to='/all_services'>
                              <button className='capitalize border-2 border-primary bg-primary font-semibold px-9 py-3 rounded-md text-off-white hover:bg-transparent hover:text-primary duration-300 block md:inline-block m-auto'>
                                 our all service
                              </button>
                           </Link>
                        </div>

                        {/* slider button */}
                        <div className='flex justify-center lg:justify-start items-center space-x-3'>
                           <button
                              className='border border-primary text-primary rounded-md p-4'
                              onClick={sliderRef?.slickPrev}>
                              <SlArrowLeft />
                           </button>
                           <button
                              className='border border-primary text-primary rounded-md p-4'
                              onClick={sliderRef?.slickNext}>
                              <SlArrowRight />
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default Banner;
