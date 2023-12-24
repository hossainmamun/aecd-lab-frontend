import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import BlogContent from '../ContentList/BlogContent.jsx';

const UploadBlog = () => {
   const [imgUrl, setImgUrl] = useState(null);
   const [blogTitle, setBlogTitle] = useState('');
   const [blogDetail, setBlogDetail] = useState('');
   const [publicationDate, setPublicationDate] = useState('');
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   // upload image to imgbb
   const handleImgUpload = async (e) => {
      e.preventDefault();
      const imgData = new FormData();
      imgData.set('key', 'f4500b78b5ac77a36171dbf122256836');
      imgData.append('image', e.target.files[0]);

      setImgLoading(true);
      setError(false);
      setSuccess(false);

      try {
         const blogImage = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         if (blogImage.status === 200) {
            setImgUrl(blogImage.data.data.display_url);
            setImgLoading(false);
            setSuccess(true);

            Swal.fire({
               icon: 'success',
               title: 'Good Job',
               text: 'Image has been uploaded',
            });
         }
      } catch (error) {
         setError(true);
         setSuccess(false);
         setImgLoading(false);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   // researcher content upload
   const handleBlogSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(false);
      setSuccess(false);

      try {
         const blogContent = await axios.post(
            'https://aecd-lab-api.onrender.com/api/blog/create_blog',
            {
               blogImg: imgUrl,
               blogTitle: blogTitle,
               blogDetail: blogDetail,
               publicationDate: publicationDate,
            }
         );
         if (blogContent.status === 201) {
            setLoading(false);
            setSuccess(true);
            setError(false);
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'team member has been uploaded',
            });
            setBlogTitle('');
            setPublicationDate('');
            setBlogDetail('');
         }
      } catch (error) {
         setLoading(false);
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
      <div className='mt-16 space-y-10 w-full min-h-screen'>
         <div className='flex justify-center capitalize font-extrabold text-2xl sm:text-3xl lg:text-4xl text-dark'>
            <h2>upload blog content</h2>
         </div>
         {/* ----- upload form section ------ */}
         <div>
            <form onSubmit={handleBlogSubmit} className='space-y-4 py-6'>
               {/* blog image */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-1'>
                  <label htmlFor=''>Upload an image</label>
                  <input
                     type='file'
                     name='blogImg'
                     onChange={handleImgUpload}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     disabled={imgLoading}
                  />

                  {imgLoading && (
                     <p className='text-red-600'>
                        Please wait image is uploading...
                     </p>
                  )}
               </div>

               {/* blog title */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Blog title</label>
                  <input
                     type='text'
                     name='blogTitle'
                     onChange={(e) => setBlogTitle(e.target.value)}
                     value={blogTitle}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter blog title'
                     disabled={imgLoading}
                  />
               </div>
               {/* publication date */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Publication date</label>
                  <input
                     type='datetime-local'
                     name='publicationDate'
                     onChange={(e) => setPublicationDate(e.target.value)}
                     value={publicationDate}
                     disabled={imgLoading}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                  />
               </div>

               {/* blog detail */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Blog detail</label>
                  <textarea
                     name='blogDetail'
                     onChange={(e) => setBlogDetail(e.target.value)}
                     value={blogDetail}
                     cols='30'
                     rows='8'
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter blog detail'
                     disabled={imgLoading}
                  />
               </div>

               {/* submit button */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <input
                     type='submit'
                     value={imgLoading || loading ? 'Wait...' : 'PUBLISH'}
                     className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                        imgLoading || loading ? 'cursor-wait' : 'cursor-pointer'
                     } hover:bg-transparent hover:text-dark duration-300`}
                     disabled={imgLoading || loading}
                  />
               </div>
            </form>
         </div>

         {/* load blog content */}
         <BlogContent />
      </div>
   );
};

export default UploadBlog;
