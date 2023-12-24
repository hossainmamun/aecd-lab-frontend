import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ServiceContent = () => {
   const [service, setService] = useState([]);
   const [uniqId, setUniqId] = useState(null);
   const [dailog, setDailog] = useState(false);
   const [deleteSuccess, setDeleteSuccess] = useState(false);

   // get all researcher
   const allService = async () => {
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/service/all_services'
         );
         if (content.status === 200) {
            setService(content.data);
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   // load data
   useEffect(() => {
      allService();
   }, []);

   // delete researcher
   const showDailog = (id) => {
      setUniqId(id);
      setDailog(true);
      setDeleteSuccess(false);
   };

   const deleteSuccessMsg = () => {
      setDailog(false);
   };

   // delete researcher profile
   const handleDeleteService = async (id) => {
      try {
         const content = await axios.delete(
            `https://aecd-lab-api.onrender.com/api/service/delete_service/${id}`
         );
         if (content.status === 200) {
            allService();
            setDeleteSuccess(true);
         }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   return (
      <div className='py-16 section-horizontal-spacing'>
         {service.length > 0 && (
            <div className='flex flex-col justify-center items-center mb-16 space-y-2'>
               <h2 className='capitalize text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold text-primary'>
                  total service list
               </h2>
               <p className='capitalize text-xl font-bold text-primary'>
                  total: {service.length} found
               </p>
            </div>
         )}

         <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {service.map((item) => {
               const { serviceTitle, serviceDetail, _id } = item;
               return (
                  <div
                     key={_id}
                     className='rounded-sm relative space-y-6 shadow-custom-shadow h-max'>
                     {/* body */}
                     <div className='p-8 box-border h-80 overflow-y-auto space-y-2'>
                        <h3 className='text-lg'>
                           <span className='font-semibold'>
                              Title: {serviceTitle}
                           </span>
                        </h3>
                        <p>
                           <span className='font-semibold text-lg'>
                              Detail:
                           </span>{' '}
                           {serviceDetail}
                        </p>
                     </div>
                     {/* footer */}
                     <div className='mt-auto w-full flex justify-between items-center space-x-1 p-1'>
                        <Link
                           to={`/dashboard/edit_service/${_id}`}
                           className='w-full'>
                           <button className='uppercase border border-blue-500 bg-blue-500 text-off-white w-full py-4 rounded-sm hover:bg-blue-600 hover:border-blue-600 duration-300'>
                              <FaEdit className='m-auto' />
                           </button>
                        </Link>

                        <button
                           onClick={() => showDailog(_id)}
                           className='uppercase border border-red-500 bg-red-500 text-off-white w-full py-4 rounded-sm hover:bg-red-600 hover:border-red-600 duration-300'>
                           <FaTrashAlt className='m-auto' />
                        </button>
                     </div>
                  </div>
               );
            })}
         </div>

         {dailog && (
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-blur flex justify-center items-center'>
               <div className='p-14 shadow-weight-line z-10 bg-primary rounded-md text-center space-y-6'>
                  {!deleteSuccess ? (
                     <div>
                        <span className='capitalize text-orange-400 text-5xl font-semibold inline-block'>
                           <FiAlertCircle />
                        </span>
                        <h3 className='capitalize text-off-white text-lg font-bold'>
                           are you sure to delete this item?
                        </h3>
                     </div>
                  ) : (
                     <div>
                        <span className='capitalize text-green-400 text-5xl font-semibold inline-block'>
                           <FiCheckCircle />
                        </span>
                        <h3 className='capitalize text-off-white text-lg font-bold'>
                           item deleted successfully
                        </h3>
                     </div>
                  )}
                  <div>
                     {!deleteSuccess ? (
                        <div className='space-x-3 space-y-3 md:space-y-0'>
                           <button
                              onClick={() => handleDeleteService(uniqId)}
                              className='bg-red-600 py-3 px-6 rounded-md text-off-white'>
                              Yes
                           </button>
                           <button
                              onClick={() => setDailog(!dailog)}
                              className='bg-green-600 py-3 px-6 rounded-md text-off-white'>
                              Cancel
                           </button>
                        </div>
                     ) : (
                        <button
                           onClick={() => deleteSuccessMsg(!deleteSuccess)}
                           className='bg-blue-600 py-3 px-6 rounded-md text-off-white'>
                           Ok
                        </button>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ServiceContent;
