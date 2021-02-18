import { useState } from "react";
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'Web development', body: 'lorem ipsum ....', author: 'badr-bh', id: 1},
        {title: 'Mobile development', body: 'lorem ipsum ....', author: 'prod-bad', id: 2},
        {title: 'Software development', body: 'lorem ipsum ....', author: 'badr-bh', id: 3},
        {title: 'Spring Boot', body: 'lorem ipsum ....', author: 'akira-bh', id: 4}
    ]);
  
    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All blogs"/>
            <BlogList blogs={blogs.filter((blog) => blog.author === 'badr-bh')} title="Badr Blogs"/>
        </div>
     );
}
 
export default Home;