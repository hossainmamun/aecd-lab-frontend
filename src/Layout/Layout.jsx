import { useLocation } from 'react-router-dom';
import Nabvar from '../Components/Headers/Nabvar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

const Layout = ({ children }) => {
   const location = useLocation();
   return (
      <div className='min-h-screen'>
         {location.pathname.includes('dashboard') || <Nabvar />}
         <main>{children}</main>
         <div className='sticky top-[100vh]'>
            {location.pathname.includes('dashboard') || <Footer />}
         </div>
      </div>
   );
};

export default Layout;
