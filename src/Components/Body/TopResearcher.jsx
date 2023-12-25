import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { researcherContext } from '../../App.jsx';

const TopResearcher = () => {
   const [researcher, setResearcher] = useContext(researcherContext);
   const [loading, setLoading] = useState(null);

   const settings = {
      fade: false,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 6000,
      pauseOnHover: true,
      cssEase: 'linear',
      arrows: false,
   };

   const getAllResearcher = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/researcher/all_researcher'
         );
         if (content.status === 200) {
            setResearcher(content.data);
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
      getAllResearcher();
   }, []);

   return (
      <div className='section-horizontal-spacing section-vertical-spacing'>
         {loading ? (
            <div className='text-center'>
               <h3 className='text-xl'>Please wait...</h3>
            </div>
         ) : (
            <Slider {...settings} className='grid grid-cols-1'>
               {researcher.map((researcher) => {
                  const {
                     _id,
                     researcherName,
                     designation,
                     degree,
                     expertise,
                  } = researcher;
                  return (
                     <div key={_id}>
                        <div className='md:grid grid-cols-2 gap-10 space-y-10 md:space-y-0'>
                           <div>
                              <img
                                 src={researcher.researcherImg}
                                 alt='researcher image'
                              />
                           </div>

                           <div className='space-y-6'>
                              <div className='space-y-3'>
                                 <span className='block capitalize font-semibold text-lg sm:text-xl text-primary'>
                                    top researcher
                                 </span>
                                 <h3 className='capitalize font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-primary'>
                                    {researcherName}
                                 </h3>
                                 <p className='capitalize font-semibold text-xl sm:text-2xl md:text-3xl'>
                                    {designation}
                                 </p>
                                 <p className='capitalize font-semibold text-lg'>
                                    {degree}
                                 </p>
                                 <p>{expertise}</p>
                              </div>

                              <div>
                                 <Link to={`/researcher/${_id}`}>
                                    <button className='capitalize border-2 border-primary bg-primary font-semibold px-6 py-3 rounded-md text-off-white hover:bg-transparent hover:text-primary duration-300'>
                                       see profile
                                    </button>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </Slider>
         )}
      </div>
   );
};

export default TopResearcher;
