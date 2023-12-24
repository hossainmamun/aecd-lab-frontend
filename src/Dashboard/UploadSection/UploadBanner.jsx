import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import BannerContent from '../ContentList/BannerContent.jsx';

const UploadBanner = () => {
   const [imgUrl, setImgUrl] = useState(null);
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const [heroHeader, setHeroHeader] = useState('');
   const [heroDetail, setHeroDetail] = useState('');

   // image upload to imgbb
   const handleImageUpload = async (e) => {
      e.preventDefault();
      const imgData = new FormData();
      imgData.set('key', 'f4500b78b5ac77a36171dbf122256836');
      imgData.append('image', e.target.files[0]);

      setImgLoading(true);
      setError(false);
      setSuccess(false);

      try {
         const productImage = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         if (productImage.status === 200) {
            setImgUrl(productImage.data.data.display_url);
            setImgLoading(false);
            setSuccess(true);

            Swal.fire({
               icon: 'success',
               title: 'Good Job',
               text: 'Image has been uploaded',
            });
         }
      } catch (error) {
         setImgLoading(false);
         setError(true);
         setSuccess(false);

         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   // banner form submition
   const handleBannerSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess(false);
      setError(false);

      try {
         const banner = await axios.post(
            'https://aecd-lab-api.onrender.com/api/hero/create_hero',
            {
               heroImage: imgUrl,
               heroHeader: heroHeader,
               heroDetail: heroDetail,
            }
         );
         if (banner.status === 201) {
            setSuccess(true);
            setLoading(false);
            setError(false);
            setHeroHeader('');
            setHeroDetail('');
            setImgUrl(null);

            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'Banner has been uploaded',
            });
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
      <div className='mt-16 space-y-10 w-full min-h-screen relative'>
         <div>
            <div className='flex justify-center capitalize font-extrabold text-2xl sm:text-3xl lg:text-4xl text-dark'>
               <h2>upload banner image and content</h2>
            </div>
            {/* ----- upload form section ------ */}
            <div>
               <form onSubmit={handleBannerSubmit} className='space-y-4 py-6'>
                  {/* banner image */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-1'>
                     <label htmlFor='heroImage'>Upload an image</label>
                     <input
                        type='file'
                        name='heroImage'
                        accept='.png, .jpg, .jpeg'
                        onChange={handleImageUpload}
                        className='border border-dark w-full py-4 px-3 rounded-md'
                     />
                     {imgLoading && (
                        <p className='text-red-600'>
                           Please wait image is uploading...
                        </p>
                     )}
                  </div>

                  {/* banner header */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor='heroHeader'>Upload banner title</label>
                     <input
                        type='text'
                        name='heroHeader'
                        onChange={(e) => setHeroHeader(e.target.value)}
                        value={heroHeader}
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        placeholder='banner title'
                        required
                        disabled={imgLoading}
                     />
                  </div>
                  {/* banner detail */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor='heroDetail'>Upload banner detail</label>
                     <textarea
                        name='heroDetail'
                        onChange={(e) => setHeroDetail(e.target.value)}
                        value={heroDetail}
                        cols='30'
                        rows='8'
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        placeholder='banner detail'
                        required
                        disabled={imgLoading}
                     />
                  </div>

                  {/* submit button */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <input
                        type='submit'
                        value={imgLoading || loading ? 'Wait...' : 'PUBLISH'}
                        className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                           imgLoading || loading
                              ? 'cursor-wait'
                              : 'cursor-pointer'
                        } hover:bg-transparent hover:text-dark duration-300`}
                        disabled={imgLoading || loading}
                     />
                  </div>
               </form>
            </div>
         </div>

         {/* load banner content */}
         <BannerContent />
      </div>
   );
};

export default UploadBanner;
