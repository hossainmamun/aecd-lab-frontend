import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useContext, useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/authContext.jsx';
import Swal from 'sweetalert2';
import axios from 'axios';

const Testimonial = () => {
   const [sliderRef, setSliderRef] = useState(null);
   const { user } = useContext(authContext);
   const [loading, setLoading] = useState(null);
   const [review, setReview] = useState([]);

   // load all reveiw
   const getAllReview = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/testimonial/all_testimonial'
         );
         if (content.status === 200) {
            setReview(content.data);
            setLoading(false);
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   // useEffect
   useEffect(() => {
      getAllReview();
   }, []);

   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      speed: 500,
      autoplaySpeed: 8000,
      pauseOnHover: false,
      cssEase: 'linear',
      arrows: false,
   };

   return (
      <div className='section-horizontal-spacing section-vertical-spacing '>
         {loading ? (
            <div className='text-center'>
               <h3 className='text-xl'>Please wait...</h3>
            </div>
         ) : (
            <div className='space-y-10 text-center'>
               <div className='space-y-2'>
                  <span className='text-lg focus-color font-semibold text-dark'>
                     Client Feedback
                  </span>
                  <h2 className='text-3xl lg:text-4xl xl:text-5xl font-bold text-primary capitalize'>
                     What Our Clients Say!
                  </h2>
               </div>

               <Slider ref={setSliderRef} {...settings}>
                  {review.map((item, index) => (
                     <div key={index} className='space-y-6'>
                        <div className='space-y-4'>
                           <FaUserCircle className='text-6xl text-primary  inline-block' />
                           <div>
                              <span className='capitalize text-primary font-semibold text-xl'>
                                 {item.reviewerName}
                              </span>
                              <p className='capitalize text-dark'>
                                 {item.identity}
                              </p>
                           </div>
                        </div>
                        <p className='text-primary'>{item.comments}</p>
                     </div>
                  ))}
               </Slider>

               {/* slider arrow button */}
               <div className='md:flex justify-between items-center md:px-9 space-y-4 md:space-y-0'>
                  <div className='space-x-2'>
                     <button
                        className='text-primary border border-primary p-4 rounded-md hover:focus-color hover:bg-primary hover:text-off-white duration-200'
                        onClick={sliderRef?.slickPrev}>
                        <SlArrowLeft />
                     </button>
                     <button
                        className='text-primary border border-primary p-4 rounded-md hover:focus-color hover:bg-primary hover:text-off-white duration-200'
                        onClick={sliderRef?.slickNext}>
                        <SlArrowRight />
                     </button>
                  </div>

                  <div>
                     <Link to={user ? '/user_review' : '/user/login'}>
                        <button className='capitalize border-2 border-primary bg-primary font-semibold px-9 py-3 rounded-md text-off-white hover:bg-transparent hover:text-primary duration-300 block md:inline-block m-auto'>
                           write review
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Testimonial;
