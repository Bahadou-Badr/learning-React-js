import { useState, useEffect } from "react";
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState(null);

    const [name, setName] = useState('mario');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);
  
    return ( 
        <div className="home">
            {blogs && <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />}
        </div>
     );
}
 
export default Home;