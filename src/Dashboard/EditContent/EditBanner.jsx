import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditBanner = () => {
   const navigate = useNavigate();
   const { bannerId } = useParams();
   const [imgUrl, setImgUrl] = useState(null);
   const [banner, setBanner] = useState(null);
   const [toggleImg, setToggleImg] = useState(false);
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   // get selected banner by id
   const getBannerById = async () => {
      setLoading(true);
      try {
         const banner = await axios.get(
            `https://aecd-lab-api.onrender.com/api/hero/get_hero/${bannerId}`
         );
         if (banner.status === 200) {
            setBanner(banner.data);
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
      getBannerById();
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
         const researcher = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         if (researcher.status === 200) {
            setImgUrl(researcher.data.data.display_url);
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
   const handleEditBanner = (e) => {
      const newBannerData = { ...banner };
      newBannerData[e.target.name] = e.target.value;
      setBanner(newBannerData);
   };

   // update banner function
   const handleBannerUpdate = async (e) => {
      e.preventDefault();
      try {
         const bannerContent = await axios.patch(
            `https://aecd-lab-api.onrender.com/api/hero/update_hero/${bannerId}`,
            {
               heroImage: imgUrl ? imgUrl : banner.heroImage,
               heroHeader: banner.heroHeader,
               heroDetail: banner.heroDetail,
            }
         );
         if (bannerContent.status === 200) {
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'banner has been update',
            });
            setLoading(false);
            navigate('/dashboard/upload_banner', { replace: true });
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
                  update banner
               </h2>
               <p className='text-offWhite'>banner Id: {bannerId}</p>
            </div>
         </div>

         <div>
            <form onSubmit={handleBannerUpdate} className='space-y-4 py-6'>
               {/* banner image */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-2'>
                  <label htmlFor='projectImg' className='text-offWhite'>
                     Upload image
                  </label>
                  <div className='grid md:grid-cols-2 gap-2'>
                     <div>
                        {!toggleImg ? (
                           <input
                              type='text'
                              name='heroImage'
                              value={banner?.heroImage || ''}
                              onChange={handleEditBanner}
                              className='border border-offWhite w-full py-4 px-3 rounded-md bg-transparent text-offWhite'
                              placeholder='Img Url'
                              disabled={imgLoading}
                              required
                              readOnly
                           />
                        ) : (
                           <input
                              type='file'
                              name='heroImage'
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

               {/* banner header */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='heroHeader'>Upload banner title</label>
                  <input
                     type='text'
                     name='heroHeader'
                     value={banner?.heroHeader || ''}
                     onChange={handleEditBanner}
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
                     value={banner?.heroDetail || ''}
                     onChange={handleEditBanner}
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

export default EditBanner;
