import { useContext, useEffect, useState } from 'react';
import { teamContext } from '../../App.jsx';
import Swal from 'sweetalert2';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const Team = () => {
   const [team, setTeam] = useContext(teamContext);
   const [loading, setLoading] = useState(null);
   const [sliderRef, setSliderRef] = useState(null);

   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 6000,
      pauseOnHover: false,
      cssEase: 'linear',
      arrows: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   // get all team members
   const allTeamMembers = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/team/all_team_member'
         );
         if (content.status === 200) {
            setTeam(content.data);
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

   // useEffects
   useEffect(() => {
      allTeamMembers();
   }, []);

   return (
      <div className='section-horizontal-spacing section-vertical-spacing bg-off-white'>
         <div>
            {loading ? (
               <div className='text-center'>
                  <h3 className='text-xl'>Please wait...</h3>
               </div>
            ) : (
               <div className='space-y-12'>
                  {/* services heading */}
                  <div className='text-center space-y-2'>
                     <span className='text-dark capitalize text-base md:text-lg font-semibold'>
                        team
                     </span>
                     <h2 className='text-primary capitalize text-2xl sm:text-3xl md:text-5xl font-extrabold'>
                        meet our members
                     </h2>
                  </div>
                  {/* services card */}
                  <Slider ref={setSliderRef} {...settings}>
                     {team.map((member) => {
                        const {
                           _id,
                           teamMemberImg,
                           teamMemeberName,
                           teamMemberDesignation,
                           teamMemberDegree,
                        } = member;
                        return (
                           <div key={_id}>
                              <div className='mx-3 rounded-md space-y-3 hover:shadow-weight-line duration-300 bg-white'>
                                 <img
                                    src={teamMemberImg}
                                    alt='team image'
                                    className='rounded-t-md md:h-60 w-full'
                                 />
                                 <div className='p-6 space-y-1 md:h-52 overflow-y-auto'>
                                    <h3 className='capitalize text-xl'>
                                       <span className='font-semibold'>
                                          Name:{' '}
                                       </span>
                                       {teamMemeberName}
                                    </h3>
                                    <p className='capitalize'>
                                       <span className='font-semibold'>
                                          Designation:{' '}
                                       </span>
                                       {teamMemberDesignation}
                                    </p>
                                    <p className='capitalize'>
                                       <span className='font-semibold'>
                                          Degree:{' '}
                                       </span>
                                       {teamMemberDegree}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </Slider>

                  {/* slider button */}
                  <div className='flex justify-center items-center space-x-3'>
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
            )}
         </div>
      </div>
   );
};

export default Team;
