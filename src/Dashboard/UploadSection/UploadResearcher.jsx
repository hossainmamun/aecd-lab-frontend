import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ResearcherContent from '../ContentList/ResearcherContent.jsx';

const UploadResearcher = () => {
   const [imgUrl, setImgUrl] = useState(null);
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [success, setSuccess] = useState(null);
   const [researcherName, setResearcherName] = useState('');
   const [designation, setDesignation] = useState('');
   const [degree, setDegree] = useState('');
   const [expertise, setExpertise] = useState('');

   // upload image to imgbb
   const handleImgUpload = async (e) => {
      e.preventDefault();
      const imgData = new FormData();
      imgData.set('key', 'f4500b78b5ac77a36171dbf122256836');
      imgData.append('image', e.target.files[0]);

      setImgLoading(true);
      setSuccess(false);

      try {
         const researcherImg = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         console.log(researcherImg);
         if (researcherImg.status === 200) {
            setImgUrl(researcherImg.data.data.display_url);
            setImgLoading(false);
            setSuccess(true);

            Swal.fire({
               icon: 'success',
               title: 'Good Job',
               text: 'Image has been uploaded',
            });
         }
      } catch (error) {
         setSuccess(false);
         setImgLoading(false);
         console.log(error);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   // researcher content upload
   const handleResearcherSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess(false);

      try {
         const researcherContent = await axios.post(
            'https://aecd-lab-api.onrender.com/api/researcher/create_researcher',
            {
               researcherImg: imgUrl,
               researcherName: researcherName,
               designation: designation,
               degree: degree,
               expertise: expertise,
            }
         );
         if (researcherContent.status === 201) {
            setLoading(false);
            setSuccess(true);
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'researcher has been uploaded',
            });
            setResearcherName('');
            setDesignation('');
            setDegree('');
            setExpertise('');
         }
      } catch (error) {
         setLoading(false);
         setSuccess(false);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   return (
      <div className='space-y-10 md:space-y-28'>
         <div className='mt-16 space-y-10 w-full'>
            <div className='flex justify-center capitalize font-extrabold text-2xl sm:text-3xl lg:text-4xl text-dark'>
               <h2>upload top researcher profile</h2>
            </div>
            {/* ----- upload form section ------ */}
            <div>
               <form
                  onSubmit={handleResearcherSubmit}
                  className='space-y-4 py-6'>
                  {/* researcher image */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-1'>
                     <label htmlFor=''>Upload image</label>
                     <input
                        type='file'
                        name='researcherImg'
                        onChange={handleImgUpload}
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        disabled={imgLoading}
                        accept='image/png, image/jpeg, image/jpg'
                        required
                     />

                     {imgLoading && (
                        <p className='text-red-600'>
                           Please wait image is uploading...
                        </p>
                     )}
                  </div>

                  {/* researcher name */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor=''>Researcher name</label>
                     <input
                        type='text'
                        name='researcherName'
                        onChange={(e) => setResearcherName(e.target.value)}
                        value={researcherName}
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        placeholder='Enter name'
                        disabled={imgLoading}
                        required
                     />
                  </div>

                  {/* researcher designation */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor=''>Researcher designation</label>
                     <input
                        type='text'
                        name='designation'
                        onChange={(e) => setDesignation(e.target.value)}
                        value={designation}
                        className='border border-dark w-full py-4 px-3 rounded-md'
                        placeholder='Enter designation'
                        disabled={imgLoading}
                        required
                     />
                  </div>

                  {/* researcher degree */}
                  <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                     <label htmlFor=''>Researcher degree</label>
                     <textarea
                        name='degree'
                        onChange={(e) => setDegree(e.target.value)}
                        value={degree}
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
                     <label htmlFor=''>Researcher expertise field</label>
                     <textarea
                        name='expertise'
                        onChange={(e) => setExpertise(e.target.value)}
                        value={expertise}
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
         {/* load all researcher content */}
         <ResearcherContent />
      </div>
   );
};

export default UploadResearcher;
