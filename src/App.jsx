import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Home from './Pages/Home.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import DashboardHome from './Dashboard/DashboardHome.jsx';
import UploadBanner from './Dashboard/UploadSection/UploadBanner.jsx';
import UploadService from './Dashboard/UploadSection/UploadService.jsx';
import UploadResearcher from './Dashboard/UploadSection/UploadResearcher.jsx';
import UploadTeam from './Dashboard/UploadSection/UploadTeam.jsx';
import UploadBlog from './Dashboard/UploadSection/UploadBlog.jsx';
import { createContext, useState } from 'react';
import EditBanner from './Dashboard/EditContent/EditBanner.jsx';
import EditTeam from './Dashboard/EditContent/EditTeam.jsx';
import EditService from './Dashboard/EditContent/EditService.jsx';
import EditResearcher from './Dashboard/EditContent/EditResearcher.jsx';
import EditBlog from './Dashboard/EditContent/EditBlog.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import UserReview from './Pages/UserReview.jsx';
import BlogDetail from './Pages/BlogDetail.jsx';
import AllService from './Pages/AllService.jsx';
import ReadService from './Pages/ReadService.jsx';
import ResearcherDetail from './Pages/ResearcherDetail.jsx';
import AllTeamMember from './Pages/AllTeamMember.jsx';
import AllBlogs from './Pages/AllBlogs.jsx';

export const servicesContext = createContext();
export const teamContext = createContext();
export const blogContext = createContext();
export const researcherContext = createContext();

function App() {
   const [services, setServices] = useState([]);
   const [team, setTeam] = useState([]);
   const [blog, setBlog] = useState([]);
   const [researcher, setResearcher] = useState([]);
   return (
      <>
         <servicesContext.Provider value={[services, setServices]}>
            <teamContext.Provider value={[team, setTeam]}>
               <blogContext.Provider value={[blog, setBlog]}>
                  <researcherContext.Provider
                     value={[researcher, setResearcher]}>
                     <BrowserRouter>
                        <Layout>
                           <Routes>
                              <Route path='/' element={<Home />} />
                              <Route path='home' element={<Home />} />
                              <Route path='user/login' element={<Login />} />
                              <Route
                                 path='user/register'
                                 element={<Register />}
                              />
                              <Route
                                 path='user_review'
                                 element={<UserReview />}
                              />
                              <Route
                                 path='blog_detail/:blogId'
                                 element={<BlogDetail />}
                              />
                              <Route
                                 path='all_services'
                                 element={<AllService />}
                              />
                              <Route
                                 path='service/:serviceId'
                                 element={<ReadService />}
                              />
                              <Route
                                 path='researcher/:researcherId'
                                 element={<ResearcherDetail />}
                              />
                              <Route
                                 path='all_team_members'
                                 element={<AllTeamMember />}
                              />
                              <Route path='all_blogs' element={<AllBlogs/>} />

                              {/* --------------- dashboard route ------------ */}
                              <Route path='dashboard' element={<Dashboard />}>
                                 <Route index element={<DashboardHome />} />
                                 <Route
                                    path='dashboard_home'
                                    element={<DashboardHome />}
                                 />
                                 <Route
                                    path='upload_banner'
                                    element={<UploadBanner />}
                                 />
                                 <Route
                                    path='upload_service'
                                    element={<UploadService />}
                                 />

                                 <Route
                                    path='upload_researcher'
                                    element={<UploadResearcher />}
                                 />
                                 <Route
                                    path='upload_team_member'
                                    element={<UploadTeam />}
                                 />
                                 <Route
                                    path='upload_blog'
                                    element={<UploadBlog />}
                                 />
                                 <Route
                                    path='edit_banner/:bannerId'
                                    element={<EditBanner />}
                                 />
                                 <Route
                                    path='edit_team/:teamId'
                                    element={<EditTeam />}
                                 />
                                 <Route
                                    path='edit_service/:serviceId'
                                    element={<EditService />}
                                 />
                                 <Route
                                    path='edit_researcher/:researcherId'
                                    element={<EditResearcher />}
                                 />
                                 <Route
                                    path='edit_blog/:blogId'
                                    element={<EditBlog />}
                                 />
                              </Route>
                           </Routes>
                        </Layout>
                     </BrowserRouter>
                  </researcherContext.Provider>
               </blogContext.Provider>
            </teamContext.Provider>
         </servicesContext.Provider>
      </>
   );
}

export default App;
