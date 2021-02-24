import { useState, useEffect } from "react";
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch data for that Resource');
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setIsLoading(false);
                setError(null)
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message);
            })
    }, []);
  
    return ( 
        <div className="home">
            { error && <div> {error} </div> }
            { isLoading && <div>Loading</div> }
            { blogs && <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} /> }
        </div>
     );
}
 
export default Home;