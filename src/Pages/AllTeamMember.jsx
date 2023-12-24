import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { teamContext } from '../App.jsx';

const AllTeamMember = () => {
   const [team, setTeam] = useContext(teamContext);
   const [loading, setLoading] = useState(null);

   // get all team members
   const allTeamMembers = async () => {
      setLoading(true);
      try {
         const content = await axios.get(
            'https://aecd-lab-api.onrender.com/api/team/all_team_member'
         );
         if (content.status === 200) {
            setTeam(content.data);
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
      allTeamMembers();
   }, []);
   return (
      <div>
         <div className='section-horizontal-spacing section-vertical-spacing bg-off-white'>
            <div>
               {loading ? (
                  <div className='text-center'>
                     <h3 className='text-xl'>Please wait...</h3>
                  </div>
               ) : (
                  <div className='space-y-12'>
                     {/* services heading */}
                     <div className='text-center space-y-2'>
                        <h2 className='text-primary capitalize text-2xl sm:text-3xl md:text-5xl font-extrabold'>
                           meet our all team members
                        </h2>
                     </div>
                     {/* services card */}
                     <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-6 md:space-y-0'>
                        {team.map((member) => {
                           const {
                              _id,
                              teamMemberImg,
                              teamMemeberName,
                              teamMemberDesignation,
                              teamMemberDegree,
                           } = member;
                           return (
                              <div key={_id}>
                                 <div className='mx-3 rounded-md space-y-3 hover:shadow-weight-line duration-300 bg-white'>
                                    <img
                                       src={teamMemberImg}
                                       alt='team image'
                                       className='rounded-t-md md:h-60 w-full'
                                    />
                                    <div className='p-6 space-y-1 md:h-52 overflow-y-auto'>
                                       <h3 className='capitalize text-xl'>
                                          <span className='font-semibold'>
                                             Name:{' '}
                                          </span>
                                          {teamMemeberName}
                                       </h3>
                                       <p className='capitalize'>
                                          <span className='font-semibold'>
                                             Designation:{' '}
                                          </span>
                                          {teamMemberDesignation}
                                       </p>
                                       <p className='capitalize'>
                                          <span className='font-semibold'>
                                             Degree:{' '}
                                          </span>
                                          {teamMemberDegree}
                                       </p>
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
      </div>
   );
};

export default AllTeamMember;
