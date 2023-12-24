import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
   return (
      <div className='grid space-x-16 h-full w-full overflow-x-hidden'>
         <Sidebar />
         <Outlet />
      </div>
   );
};

export default Dashboard;
