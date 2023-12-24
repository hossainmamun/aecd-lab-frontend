import { useContext, useEffect, useState } from 'react';
import { servicesContext } from '../App.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllService = () => {
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
      <div className='section-horizontal-spacing section-vertical-spacing bg-off-white relative'>
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
                           <h2 className='text-primary capitalize text-2xl sm:text-3xl md:text-5xl font-extrabold'>
                              our all services
                           </h2>
                        </div>
                        {/* services card */}
                        <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-6 md:space-y-0'>
                           {services.map((service) => {
                              const { serviceTitle, serviceDetail, _id } =
                                 service;
                              return (
                                 <div
                                    key={_id}
                                    className='rounded-md px-4 py-6 md:px-6 md:py-10 text-center space-y-8 hover:shadow-weight-line duration-300 bg-white relative'>
                                    <div className='space-y-4'>
                                       <h3 className='text-start capitalize font-bold text-xl md:text-2xl'>
                                          {serviceTitle}
                                       </h3>
                                       <p className='text-start pb-10'>
                                          {serviceDetail.slice(0, 180)}...
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
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default AllService;
