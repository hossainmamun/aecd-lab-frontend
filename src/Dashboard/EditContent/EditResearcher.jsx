import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditResearcher = () => {
   const { researcherId } = useParams();
   const navigate = useNavigate();
   const [imgUrl, setImgUrl] = useState(null);
   const [researcher, setResearcher] = useState(null);
   const [toggleImg, setToggleImg] = useState(false);
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   // get selected banner by id
   const getResearcherById = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            `https://aecd-lab-api.onrender.com/api/researcher/single_researcher/${researcherId}`
         );
         if (content.status === 200) {
            setResearcher(content.data);
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
      getResearcherById();
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
   const handleEditResearcher = (e) => {
      const newResearcherData = { ...researcher };
      newResearcherData[e.target.name] = e.target.value;
      setResearcher(newResearcherData);
   };

   // update banner function
   const handleResearchUpdate = async (e) => {
      e.preventDefault();
      try {
         const researcherContent = await axios.patch(
            `https://aecd-lab-api.onrender.com/api/researcher/update_researcher/${researcherId}`,
            {
               researcherImg: imgUrl ? imgUrl : researcher.researcherImg,
               researcherName: researcher.researcherName,
               designation: researcher.designation,
               degree: researcher.degree,
               expertise: researcher.expertise,
            }
         );
         if (researcherContent.status === 200) {
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'researcher member has been update',
            });
            setLoading(false);
            navigate('/dashboard/upload_researcher', { replace: true });
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
                  update researcher member
               </h2>
               <p className='text-offWhite'>member Id: {researcherId}</p>
            </div>
         </div>

         <div>
            <form onSubmit={handleResearchUpdate} className='space-y-4 py-6'>
               {/* researcher image */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-2'>
                  <label htmlFor='researcherImg' className='text-offWhite'>
                     Upload image
                  </label>
                  <div className='grid md:grid-cols-2 gap-2'>
                     <div>
                        {!toggleImg ? (
                           <input
                              type='text'
                              name='researcherImg'
                              value={researcher?.researcherImg || ''}
                              onChange={handleEditResearcher}
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

               {/* member name */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='researcherName'>Member name</label>
                  <input
                     type='text'
                     name='researcherName'
                     value={researcher?.researcherName || ''}
                     onChange={handleEditResearcher}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter name'
                     disabled={imgLoading}
                     required
                  />
               </div>

               {/* member designation */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='designation'>Member designation</label>
                  <input
                     type='text'
                     name='designation'
                     value={researcher?.designation || ''}
                     onChange={handleEditResearcher}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter designation'
                     disabled={imgLoading}
                     required
                  />
               </div>

               {/* member degree */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='degree'>Member degree</label>
                  <textarea
                     name='degree'
                     value={researcher?.degree || ''}
                     onChange={handleEditResearcher}
                     cols='30'
                     rows='4'
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter degree'
                     disabled={imgLoading}
                     required
                  />
               </div>

               {/* researcher expertise field */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='expertise'>Researcher expertise field</label>
                  <textarea
                     name='expertise'
                     value={researcher?.expertise || ''}
                     onChange={handleEditResearcher}
                     cols='30'
                     rows='8'
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter expertise field'
                     disabled={imgLoading}
                     required
                  />
               </div>

               {/* submit button */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <input
                     type='submit'
                     value={imgLoading ? 'Wait...' : 'UPDATE'}
                     className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                        imgLoading ? 'cursor-wait' : 'cursor-pointer'
                     } hover:bg-transparent hover:text-dark duration-300`}
                     disabled={imgLoading}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditResearcher;
