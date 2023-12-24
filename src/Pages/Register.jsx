import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/authContext.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
   const [isLoading, setIsLoading] = useState(null);
   const navigate = useNavigate();
   const { dispatch } = useContext(authContext);
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   const onSubmit = async (data) => {
      const { userName, phone, email, password } = data;
      setIsLoading(true);
      try {
         const register = await axios.post(
            'https://aecd-lab-api.onrender.com/api/user/signUp',
            {
               userName,
               phone,
               email,
               password,
               isAdmin: false,
            }
         );
         if (register.status === 201) {
            Swal.fire({
               title: `welcome ${register.data?.userName}`,
               text: 'SignUp successful',
               icon: 'success',
            });
            localStorage.setItem('user', JSON.stringify(register.data));
            dispatch({ type: 'REGISTER', payload: register.data });
            reset();
            setIsLoading(false);
            navigate('/', { replace: true });
         }
      } catch (error) {
         Swal.fire({
            title: 'Sorry!',
            text: error.message,
            icon: 'warning',
         });
         setIsLoading(false);
         console.log(error.message);
      }
   };

   return (
      <div>
         <div className='flex justify-center items-center my-32 mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56'>
            <div className='space-y-8 shadow-md px-8 py-14 border border-gray-200 rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12'>
               <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                  {/* user name */}
                  <div className='w-full'>
                     <input
                        type='text'
                        name='userName'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='User Name'
                        {...register('userName', {
                           required: true,
                           maxLength: 16,
                        })}
                     />
                     {errors.userName?.type === 'maxLength' && (
                        <p role='alert' className='text-red-600'>
                           Maximum 16 character is allowed
                        </p>
                     )}
                  </div>
                  {/* phone */}
                  <div className='w-full'>
                     <input
                        type='number'
                        name='phone'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='phone'
                        {...register('phone', {
                           required: true,
                           maxLength: 11,
                           minLength: 11,
                        })}
                     />
                     {errors.phone?.type === 'maxLength' && (
                        <p role='alert' className='text-red-600'>
                           phone must be 11 character
                        </p>
                     )}
                     {errors.phone?.type === 'maxLength' ||
                        (errors.phone?.type === 'minLength' && (
                           <p role='alert' className='text-red-600'>
                              phone must be 11 character
                           </p>
                        ))}
                  </div>
                  {/* email */}
                  <div className='w-full'>
                     <input
                        type='email'
                        name='email'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Email'
                        {...register('email', {
                           required: true,
                           pattern:
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        })}
                     />
                     {errors.email?.type === 'pattern' && (
                        <p role='alert' className='text-red-600'>
                           Write a valid email
                        </p>
                     )}
                  </div>
                  {/* password */}
                  <div className='w-full'>
                     <input
                        type='password'
                        name='password'
                        className='px-3 py-4 w-full rounded-md border border-gray-304'
                        placeholder='Password'
                        {...register('password', {
                           required: true,
                           maxLength: 16,
                           minLength: 6,
                        })}
                     />
                     {errors.password?.type === 'maxLength' && (
                        <p role='alert' className='text-red-600'>
                           maximum 16 character is allowed
                        </p>
                     )}
                     {errors.password?.type === 'minLength' && (
                        <p role='alert' className='text-red-600'>
                           minimum 6 character is allowed
                        </p>
                     )}
                  </div>

                  <div>
                     <input
                        type='submit'
                        className='py-4 w-full rounded-md bg-dark text-white font-semibold text-lg  cursor-pointer'
                        value={isLoading ? 'WAIT...' : 'REGISTER'}
                        disabled={isLoading}
                     />
                  </div>
               </form>

               <div className='flex justify-center items-center space-x-3'>
                  <p className='capitalize font-semibold'>
                     all ready have an account?
                  </p>
                  <Link to='/user/login' className='font-semibold text-dark'>
                     Login
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
