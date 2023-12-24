import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { GiKnightBanner } from 'react-icons/gi';
import { AiFillHome, AiOutlineTeam } from 'react-icons/ai';
import { MdOutlineHomeRepairService } from 'react-icons/md';
import { GiArchiveResearch } from 'react-icons/gi';
import { FaBloggerB } from 'react-icons/fa';

const Sidebar = () => {
   const [open, setOpen] = useState(false);
   const sidebarLink = [
      { title: 'dashboard', icon: <AiFillHome />, link: 'dashboard_home' },
      {
         title: 'upload banner content',
         icon: <GiKnightBanner />,
         link: 'upload_banner',
      },
      {
         title: 'upload servic',
         icon: <MdOutlineHomeRepairService />,
         link: 'upload_service',
      },

      {
         title: 'upload researcher',
         icon: <GiArchiveResearch />,
         link: 'upload_researcher',
      },
      {
         title: 'upload team',
         icon: <AiOutlineTeam />,
         link: 'upload_team_member',
      },
      { title: 'upload blog', icon: <FaBloggerB />, link: 'upload_blog' },
   ];
   return (
      <div className='fixed bg-dark h-full top-0 left-0 space-y-10 z-[10]'>
         <div className='flex justify-between items-center mt-5 px-5'>
            {open && (
               <h2 className='text-off-white text-lg font-semibold'>
                  <Link to='/'>A&WQRL</Link>
               </h2>
            )}

            <div onClick={() => setOpen(!open)}>
               <FiMenu className='text-2xl font-extrabold cursor-pointer text-off-white' />
            </div>
         </div>

         <ul>
            {sidebarLink.map((item, index) => (
               <li key={index}>
                  <Link
                     to={item?.link}
                     className={`${
                        open &&
                        'capitalize text-off-white py-4 pl-4 pr-8 border border-x-0 border-y-off-white block hover:bg-off-white hover:text-dark'
                     }`}>
                     <div
                        className={`${
                           open
                              ? 'flex justify-start items-center'
                              : 'flex justify-center items-center'
                        }`}>
                        <i
                           className={`${
                              open
                                 ? 'mr-4 text-2xl'
                                 : 'text-2xl text-off-white my-3'
                           }`}>
                           {item?.icon}
                        </i>
                        {open && <span>{item?.title}</span>}
                     </div>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Sidebar;
