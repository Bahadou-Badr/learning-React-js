# Info - Notes
## ♣ useState Hook 
- useState Hook : the useState Hook gives us a way to make a reactive value and also provides us with a way to change that value whene ever we want. 
##### EXAMPLE : Change the name whene click the button 'Click Me'
 
```javascript
ìmport { useState } from 'react'; //import the useState Hook
const Home = () => {
    const [name, setName] = useState('Badr-bh'); 

    const handleClick = () => {
            setName('Bad-Prod'); //use setName to change the name value
    }

    return ( 
            <div className="home">
                <h2>HomePage</h2>
                <p>{ name }</p> <!-- 👈 the name will be change -->
                <button onClick={handleClick}>Click Me</button>
            </div>
    );
}
export default Home;
```
## ♣ Outputting Lists using map method
- we'll see how to output lists of data in our component templates. We'll do this using the JavaScript map method.
##### EXAMPLE : output list of data (blogs)
```javascript
import { useState } from "react";
const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'Web development', body: 'lorem ipsum ....', author: 'badr-bh', id: 1},
        {title: 'Mobile development', body: 'lorem ipsum ....', author: 'prod-bad', id: 2},
        {title: 'Software development', body: 'lorem ipsum ....', author: 'akira-bh', id: 3}
    ]); // create an object's array [list of blogs]
  
    return ( 
        <div className="home">
            {blogs.map((blog) => (      //apply the map method to blogs array
                <div className="blog-preview" key={ blog.id }>
                    <h2>{ blog.title }</h2>
                    <p>Written By : { blog.author }</p>
                </div>
            ))}
        </div>
     );
}
 
export default Home;
```
*Don't forget the key attribute ,it allow to control each div*
## ♣ Props
- Props :  is a way to pass data from parent components into child components.
##### EXAMPLE : pass the data from the Home Component (parent componenet) to BlogList Component (Child Component)
Home component (parent) 👇
```javascript
import { useState } from "react";
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState([
        {title: 'Web development', body: 'lorem ipsum ....', author: 'badr-bh', id: 1},
        {title: 'Mobile development', body: 'lorem ipsum ....', author: 'prod-bad', id: 2},
        {title: 'Software development', body: 'lorem ipsum ....', author: 'akira-bh', id: 3}
    ]); //the data that we want pass 
  
    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All blogs"/>  <!-- props -->
        </div>
     );
}
 
export default Home;
```
BlogList Component (Child) 👇
```javascript
const BlogList = (props) => {
    const blogs = props.blogs; //get the parent data
    const title = props.title;

    return ( 
        <div className="blog-list">
            <h2>{ title }</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={ blog.id }>
                    <h2>{ blog.title }</h2>
                    <p>Written By : { blog.author }</p>
                </div>
            ))}
        </div>
     );
}
 
export default BlogList;
```
##### EXAMPLE 2 : using filter method | pass just the data that contain author = badr-bh

```javascript
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
            <BlogList blogs={blogs} title="All blogs" />
            <BlogList blogs={ blogs.filter(blog => blog.author === 'badr-bh') } title="Badr Blogs" /> <!-- use the filter methodg -->
        </div>
     );
}
 
export default Home;
```
## ♣ useEffect Hook | useEffect Dependencies 
- how we can control when the useEffect function fires - by using a dependency array.

##### EXAMPLE : run the useEffect whene the name value change
```javascript
import { useState, useEffect } from "react"; //import useEffect

const Home = () => {

    const [name, setName] = useState('mario');

    //use useEffect Hook
    useEffect(() => {
        console.log("run the UseEffect - the name is change")
    }, []); //add dependencies | re-render the function whene the name value change
  
    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />
            <button onClick={() => setName('Ayix')}>change the name</button> 
            <p>{ name }</p>
        </div>
     );
}
 
export default Home;
```
## ♣ Fetching Data with useEffect 

- we'll see how to make a fetch request for data using the useEffect hook.
##### EXAMPLE : Use fetch method inside the useEffect 
```javascript
import { useState, useEffect } from "react";
import BlogList from './BlogList';

const Home = () => {

    const [blogs, setBlogs] = useState(null); 

    useEffect(() => {
        fetch('http://localhost:8000/blogs') //fetch method
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);
  
    return ( 
        <div className="home">
            { blogs && <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} /> } 
        </div>
     );
}
 
export default Home;
```