import { useContext, useEffect, useState } from 'react';
import { blogContext } from '../App.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { SlArrowRight } from 'react-icons/sl';

const AllBlogs = () => {
   const [blog, setBlog] = useContext(blogContext);
   const [loading, setLoading] = useState(null);

   // get all blogs
   const allBlogs = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/blog/all_blogs'
         );
         if (content.status === 200) {
            setBlog(content.data);
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
      allBlogs();
   }, []);
   return (
      <div className='section-horizontal-spacing section-vertical-spacing bg-off-white'>
         <div>
            {loading ? (
               <div className='text-center'>
                  <h3 className='text-xl'>Please wait...</h3>
               </div>
            ) : (
               <div className='space-y-16'>
                  {/* services heading */}
                  <div className='text-center space-y-2'>
                     <h2 className='text-primary capitalize text-2xl sm:text-3xl md:text-5xl font-extrabold'>
                        read our all blogs
                     </h2>
                  </div>
                  {/* services card */}
                  <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-6 md:space-y-0'>
                     {blog.map((member) => {
                        const {
                           _id,
                           blogImg,
                           blogTitle,
                           blogDetail,
                           publicationDate,
                        } = member;
                        return (
                           <div key={_id}>
                              <div className='mx-3 rounded-md space-y-3 hover:shadow-weight-line duration-300 bg-white'>
                                 <img
                                    src={blogImg}
                                    alt='team image'
                                    className='rounded-t-md md:h-64 w-full'
                                 />
                                 <div className='p-6 space-y-3'>
                                    <div className='h-60 overflow-y-auto space-y-2'>
                                       <h3 className='capitalize text-xl font-bold'>
                                          {blogTitle}
                                       </h3>
                                       <p className='capitalize'>
                                          {blogDetail.slice(0, 290)}...
                                       </p>
                                       <p className='capitalize'>
                                          <span className='font-semibold'>
                                             published:
                                          </span>
                                          {publicationDate}
                                       </p>
                                    </div>

                                    <div>
                                       <Link
                                          to={`/blog_detail/${_id}`}
                                          className='inline-block bg-off-white p-3 rounded-md'>
                                          <button className='capitalize font-semibold flex justify-center items-center space-x-1'>
                                             <span>read more</span>
                                             <SlArrowRight />
                                          </button>
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default AllBlogs;
