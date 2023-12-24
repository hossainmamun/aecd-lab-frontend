import Banner from "../Components/Body/Banner.jsx";
import Services from "../Components/Body/Services.jsx";
import Team from "../Components/Body/Team.jsx";
import TopResearcher from "../Components/Body/TopResearcher.jsx";
import Blog from '../Components/Body/Blogs.jsx'
import Testimonial from '../Components/Body/Testimonial.jsx'

const Home = () => {
    
    return (
        <div>
            <Banner />
            <Services />
            <TopResearcher />
            <Team />
            <Testimonial/>
            <Blog/>
        </div>
    );
};

export default Home;