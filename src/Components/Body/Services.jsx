import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { servicesContext } from '../../App.jsx';

const Services = () => {
   const [services, setServices] = useContext(servicesContext);
   const [loading, setLoading] = useState(null);

   // get all services
   const getAllServices = async () => {
      setLoading(true);
      try {
         const services = await axios.get(
            'https://aecd-lab-api.onrender.com/api/service/all_services'
         );
         if (services.status === 200) {
            setServices(services.data);
            setLoading(false);
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
         setLoading(false);
      }
   };

   // useEffect
   useEffect(() => {
      getAllServices();
   }, []);

   return (
      <div className='section-horizontal-spacing section-vertical-spacing bg-off-white'>
         <div>
            {loading ? (
               <div className='text-center'>
                  <h3 className='text-xl'>Please wait...</h3>
               </div>
            ) : (
               <div>
                  {services.length !== 0 && (
                     <div className='space-y-12'>
                        {/* services heading */}
                        <div className='text-center space-y-2'>
                           <span className='text-dark capitalize text-base md:text-lg font-semibold'>
                              our services
                           </span>
                           <h2 className='text-primary capitalize text-2xl sm:text-3xl md:text-5xl font-extrabold'>
                              on going researchs
                           </h2>
                        </div>
                        {/* services card */}
                        <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-6 md:space-y-0 relative'>
                           {services.slice(0, 3).map((service) => {
                              const { serviceTitle, serviceDetail, _id } =
                                 service;
                              return (
                                 <div
                                    key={_id}
                                    className='rounded-md px-4 py-6 md:px-6 md:py-10 text-center space-y-8 hover:shadow-weight-line duration-300 bg-white'>
                                    <div className='space-y-4'>
                                       <h3 className='capitalize text-start font-bold text-xl md:text-2xl'>
                                          {serviceTitle}
                                       </h3>
                                       <p className='pb-10 text-justify'>
                                          {serviceDetail.slice(0, 140)}...
                                       </p>
                                    </div>

                                    <Link
                                       to={`/service/${_id}`}
                                       className='text-start bottom-4 absolute block'>
                                       <button className='capitalize font-semibold bg-off-white border-2 border-off-white px-4 py-2 rounded-md text-primary hover:bg-transparent hover:border-2 hover:text-primary duration-200'>
                                          read more
                                       </button>
                                    </Link>
                                 </div>
                              );
                           })}
                        </div>

                        <div className='text-center'>
                           <Link to='/all_services'>
                              <button className='capitalize border-2 border-primary bg-primary text-off-white px-10 py-4 rounded-md font-semibold hover:bg-white hover:text-primary duration-300'>
                                 all research work
                              </button>
                           </Link>
                        </div>
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Services;
