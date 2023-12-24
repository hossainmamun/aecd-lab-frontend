import { useContext, useState } from 'react';
import { authContext } from '../Context/authContext.jsx';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserReview = () => {
   const navigate = useNavigate();
   const { user } = useContext(authContext);
   const [reviewerName, setReviwerName] = useState('');
   const [reviewerIdentity, setReviewerIdentity] = useState('');
   const [comment, setComment] = useState('');
   const [loading, setLoading] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const handleReviewSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const content = await axios.post(
            'https://aecd-lab-api.onrender.com/api/testimonial/create_testimonial',
            {
               reviewerName: user ? user.userName : reviewerName,
               identity: reviewerIdentity,
               comments: comment,
            }
         );
         if (content.status === 201) {
            setSuccess(true);
            setLoading(false);
            setError(false);
            setReviewerIdentity('');
            setComment('');

            Swal.fire({
               icon: 'success',
               title: 'Well done',
               text: 'Review add successfully',
            });
            navigate('/', { replace: true });
         }
      } catch (error) {
         setError(true);
         setSuccess(false);
         setLoading(false);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
         });
      }
   };

   return (
      <div className='section-horizontal-spacing section-vertical-spacing'>
         {/* form section */}
         <div className='space-y-6'>
            <h3 className='text-[#1f2127] text-4xl font-extrabold text-center'>
               write your valuable review
            </h3>
            <form onSubmit={handleReviewSubmit} className='space-y-4 py-6'>
               {/* reviewer name */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='reviewerName'>Your name</label>
                  <input
                     type='text'
                     name='reviewerName'
                     value={user?.userName || ''}
                     onChange={(e) => setReviwerName(e.target.value)}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter your name'
                  />
               </div>
               {/* reviewer job */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='identity'>Your Job</label>
                  <input
                     type='text'
                     name='identity'
                     value={reviewerIdentity}
                     onChange={(e) => setReviewerIdentity(e.target.value)}
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter your profession'
                  />
               </div>
               {/* reviewer comment */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <label htmlFor='comments'>Your comment</label>
                  <textarea
                     name='comments'
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     cols='30'
                     rows='8'
                     className='border border-dark w-full py-4 px-3 rounded-md'
                     placeholder='Enter your review'
                  />
               </div>

               {/* submit button */}
               <div className='w-10/12 sm:w-9/12 md:w-8/12 lg:w-5/12 m-auto'>
                  <input
                     type='submit'
                     value={loading ? 'Wait...' : 'PUBLISH'}
                     className={`bg-dark border border-dark rounded-md px-10 py-4 text-off-white ${
                        loading ? 'cursor-wait' : 'cursor-pointer'
                     } hover:bg-transparent hover:text-dark duration-300`}
                     disabled={loading}
                  />
               </div>
            </form>
         </div>
      </div>
   );
};

export default UserReview;
