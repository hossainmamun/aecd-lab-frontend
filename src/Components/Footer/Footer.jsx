import { FaMobileScreen } from 'react-icons/fa6';
import { CgMail } from 'react-icons/cg';

const Footer = () => {
   return (
      <div className='section-horizontal-spacing section-vertical-spacing bg-primary pt-24 pb-4 space-y-16'>
         <div className='flex flex-col justify-center items-center space-y-5'>
            <div className='space-y-4 text-center'>
               <h2 className='text-3xl font-extrabold capitalize text-off-white'>
                  We Understand The Importance <br /> Approaching Each Work!
               </h2>
               <div>
                  <p className='text-xl font-bold text-off-white capitalize'>
                     <span>address: </span>Secretariat Road, 4 Kazi
                     Nazrul Islam Ave, Dhaka 1000
                  </p>
               </div>
            </div>

            <div className='space-y-3'>
               <span className='text-2xl font-bold text-off-white flex items-center space-x-2'>
                  <FaMobileScreen />
                  <span>+88 01776-195575</span>
               </span>

               <span className='text-2xl font-bold text-off-white flex items-center space-x-2'>
                  <CgMail />
                  <span>aecdwarl@gmail.com</span>
               </span>
            </div>
         </div>
         

         <div>
            <p className='text-center text-white'>
               Copyright &copy;{new Date().getFullYear()} AWRL all rights reserved ||
               design & development{' '}
               <span className='focus-color'>&hearts; Mamun Hossain</span>
            </p>
         </div>
      </div>
   );
};

export default Footer;
