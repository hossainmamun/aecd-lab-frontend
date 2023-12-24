import { useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/authContext.jsx';
import { MdArrowDropDown } from 'react-icons/md';

const Nabvar = () => {
   const [open, setOpen] = useState(false);
   const [userOpen, setUserOpen] = useState(false);
   const { user, dispatch } = useContext(authContext);
   const logout = () => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
   };

   const navigationLink = [
      { linkTitle: 'Home', link: '/home' },
      { linkTitle: 'Team', link: '/all_team_members' },
      { linkTitle: 'Blogs', link: '/all_blogs' },
      // { linkTitle: 'Dashboard', link: '/dashboard' },
   ];

   const accountLink = [
      { linkTitle: 'login', link: '/user/login' },
      { linkTitle: 'sign up', link: '/user/register' },
   ];

   return (
      <section className='section-horizontal-spacing py-6 md:py-0 bg-white border border-b border-off-white z-10'>
         <nav className='md:flex justify-start md:justify-between items-cente relative'>
            {/* site logo */}
            <div className='flex items-center'>
               <Link to='/'>
                  <span className='text-primary font-bold teko-font text-2xl md:text-3xl block'>
                     A&WQRL
                  </span>
               </Link>
            </div>

            {/* toogle button */}
            <div
               onClick={() => setOpen(!open)}
               className='md:hidden absolute right-0 top-1'>
               {!open ? (
                  <FiMenu className='text-2xl font-extrabold cursor-pointer' />
               ) : (
                  <AiOutlineClose className='text-2xl font-extrabold cursor-pointer' />
               )}
            </div>

            {/* navbar link list */}
            <ul
               className={`${
                  open
                     ? 'md:flex md:justify-between items-center md:space-x-2 md:bg-transparent bg-primary mt-8'
                     : 'hidden md:flex md:justify-between items-center md:space-x-2 md:bg-transparent bg-primary'
               }`}>
               {navigationLink.map((navItems, index) => (
                  <li key={index}>
                     <Link
                        to={navItems?.link}
                        className='text-center text-base py-4 px-4 md:py-8 md:px-4 block md:text-dark text-off-white hover:shadow-custom-shadow transition-all duration-200 md:hover:bg-primary md:hover:text-off-white'>
                        {navItems?.linkTitle}
                     </Link>
                  </li>
               ))}

               {!user ? (
                  <ul
                     className={`${
                        open
                           ? 'md:flex md:justify-between items-center md:space-x-1'
                           : 'hidden md:flex md:justify-between items-center md:space-x-1'
                     }`}>
                     {accountLink.map((accountItem, index) => (
                        <li key={index} className='text-center'>
                           <Link
                              to={accountItem?.link}
                              className={`text-base capitalize py-4 md:py-2 md:px-6 block text-off-white bg-primary hover:bg-smooth hover:text-primary md:border md:hover:border-primary md:rounded-md`}>
                              {accountItem?.linkTitle}
                           </Link>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <div className='border-t md:border-0'>
                     <div
                        onClick={() => setUserOpen(!userOpen)}
                        className='flex justify-start items-center cursor-pointer  border border-primary px-4 py-1 rounded-sm'>
                        <button className='no-underline capitalize text-base font-semibold text-off-white md:text-primary'>
                           {user?.userName}
                        </button>
                        <MdArrowDropDown className='text-2xl text-off-white md:text-primary' />
                     </div>

                     {userOpen && (
                        <div className='shadow-md bg-primary rounded-sm md:absolute static z-10'>
                           <div>
                              {user.isAdmin === true && (
                                 <Link
                                    to='/dashboard'
                                    className='no-underline text-base text-white font-semibold block px-4 py-2 hover:bg-off-white hover:text-primary'>
                                    Dashboard
                                 </Link>
                              )}
                           </div>

                           <button
                              onClick={() => logout()}
                              className='text-base text-white font-semibold w-full text-start hover:bg-off-white hover:text-primary px-4 py-2'>
                              Logout
                           </button>
                        </div>
                     )}
                  </div>
               )}
            </ul>
         </nav>
      </section>
   );
};

export default Nabvar;
