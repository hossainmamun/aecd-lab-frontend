import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditBlog = () => {
   const navigate = useNavigate();
   const { blogId } = useParams();
   const [imgUrl, setImgUrl] = useState(null);
   const [blog, setBlog] = useState(null);
   const [toggleImg, setToggleImg] = useState(false);
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   // get selected blog by id
   const getBlogById = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            `https://aecd-lab-api.onrender.com/api/blog/single_blog/${blogId}`
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
         setLoading(false);
      }
   };

   useEffect(() => {
      getBlogById();
   }, []);

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
         const image = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         if (image.status === 200) {
            setImgUrl(image.data.data.display_url);
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

   // edit banner function
   const handleEditBlog = (e) => {
      const newBlogContent = { ...blog };
      newBlogContent[e.target.name] = e.target.value;
      setBlog(newBlogContent);
   };

   // update banner function
   const handleBlogUpdate = async (e) => {
      e.preventDefault();
      try {
         const content = await axios.patch(
            `https://aecd-lab-api.onrender.com/api/blog/updateg_blog/${blogId}`,
            {
               blogImg: imgUrl ? imgUrl : blog.blogImg,
               blogTitle: blog.blogTitle,
               blogDetail: blog.blogDetail,
               publicationDate: blog.publicationDate,
            }
         );
         if (content.status === 200) {
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'blog has been update',
            });
            setLoading(false);
            navigate('/dashboard/upload_blog', { replace: true });
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

   return (
      <div className='space-y-10 md:space-y-28 pb-14'>
         <div className='mt-16 space-y-10 w-full'>
            <div className='text-center space-y-4'>
               <h2 className='capitalize font-extrabold text-2xl sm:text-2xl lg:text-3xl text-primary'>
                  update blog
               </h2>
               <p className='text-offWhite'>blog Id: {blogId}</p>
            </div>
         </div>

         <div>
            <form onSubmit={handleBlogUpdate} className='space-y-4 py-6'>
               {/* blog image */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-2'>
                  <label htmlFor='blogImg' className='text-offWhite'>
                     Upload image
                  </label>
                  <div className='grid md:grid-cols-2 gap-2'>
                     <div>
                        {!toggleImg ? (
                           <input
                              type='text'
                              name='blogImg'
                              value={blog?.blogImg || ''}
                              onChange={handleEditBlog}
                              className='border border-offWhite w-full py-4 px-3 rounded-md bg-transparent text-offWhite'
                              placeholder='Img Url'
                              disabled={imgLoading}
                              required
                              readOnly
                           />
                        ) : (
                           <input
                              type='file'
                              name='blogImg'
                              accept='.png, .jpg, .jpeg'
                              onChange={handleImgUpload}
                              className='border border-offWhite w-full py-4 px-3 rounded-md bg-transparent text-offWhite'
                              disabled={imgLoading}
                              required
                           />
                        )}
                     </div>
                     <div>
                        <input
                           type='button'
                           onClick={() => setToggleImg(!toggleImg)}
                           className='w-full border border-dark rounded-md bg-dark text-off-white capitalize font-bold py-4 hover:bg-primary hover:text-off-white duration-300 cursor-pointer'
                           value={
                              !toggleImg
                                 ? 'upload new image'
                                 : 'existing image url'
                           }
                        />
                     </div>
                  </div>

                  {imgLoading && (
                     <p className='text-red-600'>
                        Please wait image is uploading...
                     </p>
                  )}
               </div>

               {/* blog title */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='blogTitle'>Upload banner title</label>
                  <input
                     type='text'
                     name='blogTitle'
                     value={blog?.blogTitle || ''}
                     onChange={handleEditBlog}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='banner title'
                     required
                     disabled={imgLoading}
                  />
               </div>
               {/* blog detail */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='blogDetail'>Upload banner detail</label>
                  <textarea
                     name='blogDetail'
                     value={blog?.blogDetail || ''}
                     onChange={handleEditBlog}
                     cols='30'
                     rows='8'
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='banner detail'
                     required
                     disabled={imgLoading}
                  />
               </div>
               {/* publication date */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='publicationDate'>Publication date</label>
                  <input
                     type='datetime-local'
                     name='publicationDate'
                     onChange={handleEditBlog}
                     value={blog?.publicationDate || ''}
                     disabled={imgLoading}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                  />
               </div>

               {/* submit button */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <input
                     type='submit'
                     value={imgLoading || loading ? 'Wait...' : 'UPDATE'}
                     className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                        imgLoading || loading ? 'cursor-wait' : 'cursor-pointer'
                     } hover:bg-transparent hover:text-dark duration-300`}
                     disabled={imgLoading || loading}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditBlog;
