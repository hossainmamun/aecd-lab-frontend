import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import TeamContent from '../ContentList/TeamContent.jsx';

const UploadTeam = () => {
   const [imgUrl, setImgUrl] = useState(null);
   const [imgLoading, setImgLoading] = useState(null);
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const [teamMemeberName, setTeamMemeberName] = useState('');
   const [teamMemberDesignation, setTeamMemberDesignation] = useState('');
   const [teamMemberDegree, setTeamMemberDegree] = useState('');

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
         const bannerImg = await axios.post(
            'https://api.imgbb.com/1/upload',
            imgData
         );
         if (bannerImg.status === 200) {
            setImgUrl(bannerImg.data.data.display_url);
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

   // upload team member
   const handleTeamMemberSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(false);
      setSuccess(false);
      try {
         const team = await axios.post(
            'https://aecd-lab-api.onrender.com/api/team/create_team',
            {
               teamMemberImg: imgUrl,
               teamMemeberName,
               teamMemberDesignation,
               teamMemberDegree,
            }
         );
         if (team.status === 201) {
            setLoading(false);
            setSuccess(true);
            setError(false);
            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'Researcher has been uploaded',
            });
            setTeamMemeberName('');
            setTeamMemberDesignation('');
            setTeamMemberDegree('');
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
            <h2>upload team member detail</h2>
         </div>
         {/* ----- upload form section ------ */}
         <div>
            <form onSubmit={handleTeamMemberSubmit} className='space-y-4 py-6'>
               {/* member image */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto space-y-1'>
                  <label htmlFor=''>Upload image</label>
                  <input
                     type='file'
                     name='teamMemberImg'
                     onChange={handleImgUpload}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     disabled={imgLoading}
                     required
                  />

                  {imgLoading && (
                     <p className='text-red-600'>
                        Please wait image is uploading...
                     </p>
                  )}
               </div>

               {/* member name */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Member name</label>
                  <input
                     type='text'
                     name='teamMemeberName'
                     onChange={(e) => setTeamMemeberName(e.target.value)}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter name'
                     disabled={imgLoading}
                     required
                  />
               </div>

               {/* member designation */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Member designation</label>
                  <input
                     type='text'
                     name='teamMemberDesignation'
                     onChange={(e) => setTeamMemberDesignation(e.target.value)}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter designation'
                     disabled={imgLoading}
                     required
                  />
               </div>

               {/* member degree */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor=''>Member degree</label>
                  <textarea
                     name='teamMemberDegree'
                     onChange={(e) => setTeamMemberDegree(e.target.value)}
                     cols='30'
                     rows='4'
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter degree'
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
                        imgLoading || loading ? 'cursor-wait' : 'cursor-pointer'
                     } hover:bg-transparent hover:text-dark duration-300`}
                     disabled={imgLoading || loading}
                  />
               </div>
            </form>
         </div>

         {/* load team content */}
         <TeamContent />
      </div>
   );
};

export default UploadTeam;
