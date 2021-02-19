import { useState, useEffect } from "react";
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'Web development', body: 'lorem ipsum ....', author: 'badr-bh', id: 1},
        {title: 'Mobile development', body: 'lorem ipsum ....', author: 'prod-bad', id: 2},
        {title: 'Spring Boot', body: 'lorem ipsum ....', author: 'akira-bh', id: 4}
    ]);

    const [name, setName] = useState('mario');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    useEffect(() => {
        console.log("run the UseEffect - the name is change")
    }, [name]);
  
    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />
            <button onClick={() => setName('Ayix')}>change the name</button>
            <p>{ name }</p>
        </div>
     );
}
 
export default Home;