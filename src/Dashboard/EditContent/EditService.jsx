import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditService = () => {
   const { serviceId } = useParams();
   const [loading, setLoading] = useState(false);
   const [service, setService] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const navigate = useNavigate();

   // load service by id
   const getServiceById = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            `https://aecd-lab-api.onrender.com/api/service/${serviceId}`
         );
         if (content.status === 200) {
            setService(content.data);
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

   useEffect(() => {
      getServiceById();
   }, []);

   const handleServiceEdit = (e) => {
      const newServiceData = { ...service };
      newServiceData[e.target.name] = e.target.value;
      setService(newServiceData);
   };

   const handleServiceUpdate = async (e) => {
      e.preventDefault();
      try {
         const content = await axios.patch(
            `https://aecd-lab-api.onrender.com/api/service/update_service/${serviceId}`,
            {
               serviceTitle: service.serviceTitle,
               serviceDetail: service.serviceDetail,
            }
         );
         if (content.status === 200) {
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'service has been update',
            });
            setLoading(false);
            navigate('/dashboard/upload_service', { replace: true });
         }
      } catch (error) {
         setError(true);
         setSuccess(false);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   return (
      <div>
         <div className='space-y-10 md:space-y-28 pb-14'>
            <div className='mt-16 space-y-10 w-full'>
               <div className='text-center space-y-4'>
                  <h2 className='capitalize font-extrabold text-2xl sm:text-2xl lg:text-3xl text-primary'>
                     update service
                  </h2>
                  <p className='text-offWhite'>service Id: {serviceId}</p>
               </div>
            </div>

            <div>
               <form onSubmit={handleServiceUpdate} className='space-y-4 py-6'>
                  {/* service header */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor='serviceTitle'>Upload service title</label>
                     <input
                        type='text'
                        name='serviceTitle'
                        onChange={handleServiceEdit}
                        value={service?.serviceTitle || ''}
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        placeholder='service title'
                     />
                  </div>
                  {/* service detail */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor='serviceDetail'>
                        Upload service detail
                     </label>
                     <textarea
                        name='serviceDetail'
                        onChange={handleServiceEdit}
                        value={service?.serviceDetail || ''}
                        cols='30'
                        rows='8'
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        placeholder='service detail'
                     />
                  </div>

                  {/* submit button */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <input
                        type='submit'
                        value={loading ? 'WAIT' : 'UPDATE'}
                        className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                           loading ? 'cursor-wait' : 'cursor-pointer'
                        } hover:bg-transparent hover:text-dark duration-300`}
                        disabled={loading}
                     />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default EditService;
