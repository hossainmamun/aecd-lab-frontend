import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ServiceContent from '../ContentList/serviceContent.jsx';

const UploadService = () => {
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const [serviceTitle, setServiceTitle] = useState('');
   const [serviceDetail, setServiceDetail] = useState('');

   const handleServiceSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const service = await axios.post(
            'https://aecd-lab-api.onrender.com/api/service/create_service',
            {
               serviceTitle: serviceTitle,
               serviceDetail: serviceDetail,
            }
         );

         if (service.status === 201) {
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'Banner has been uploaded',
            });
            setLoading(false);
            setSuccess(true);
            setError(false);
            setServiceTitle('');
            setServiceDetail('');
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });

         setError(true);
         setLoading(false);
         setSuccess(false);
      }
   };
   return (
      <div className='mt-16 space-y-10 w-full min-h-screen'>
         <div className='flex justify-center capitalize font-extrabold text-2xl sm:text-3xl lg:text-4xl text-dark'>
            <h2>upload service content</h2>
         </div>
         {/* ----- upload form section ------ */}
         <div className=''>
            <form onSubmit={handleServiceSubmit} className='space-y-4 py-6'>
               {/* service header */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Upload service title</label>
                  <input
                     type='text'
                     name='serviceTitle'
                     onChange={(e) => setServiceTitle(e.target.value)}
                     value={serviceTitle}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='service title'
                  />
               </div>
               {/* service detail */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Upload service detail</label>
                  <textarea
                     name='serviceDetail'
                     onChange={(e) => setServiceDetail(e.target.value)}
                     value={serviceDetail}
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
                     value={loading ? 'WAIT' : 'PUBLISH'}
                     className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                        loading ? 'cursor-wait' : 'cursor-pointer'
                     } hover:bg-transparent hover:text-dark duration-300`}
                     disabled={loading}
                  />
               </div>
            </form>
         </div>
         {/* load service */}
         <ServiceContent />
      </div>
   );
};

export default UploadService;
