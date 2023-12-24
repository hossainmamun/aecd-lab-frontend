import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ReadService = () => {
   const { serviceId } = useParams();
   const [service, setService] = useState({});
   const [loading, setLoading] = useState(null);
   console.log(serviceId);

   // data fatch by service id
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

   return (
      <div className='section-horizontal-spacing section-vertical-spacing'>
         {loading ? (
            <div className='text-center'>
               <h3 className='text-xl'>Please wait...</h3>
            </div>
         ) : (
            <div className='space-y-4'>
               <h3 className='text-justify capitalize font-bold text-xl md:text-4xl'>
                  {service?.serviceTitle}
               </h3>
               <p className='text-justify'>{service?.serviceDetail}</p>
            </div>
         )}
      </div>
   );
};

export default ReadService;
