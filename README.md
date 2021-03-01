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
## ♣ Making a Custom Hook
- create a custom hook to be used in any component
##### EXAMPLE : create a custom hook to fetch datat
useFetch.js
```javascript
import { useEffect,useState } from "react";

const useFetch = (url) => { //Api url 
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url) //using the url parametre
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch data for that Resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null)
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message);
            })
    }, [url]);

    return { data, isLoading, error }; //return the useStates that will be used in the Home Component
}

export default useFetch;
```
Home.js
```javascript
import { useState, useEffect } from "react";
import BlogList from './BlogList';
import useFetch from "./useFetch.js";

const Home = () => {
    const {data:blogs, isLoading, error} = useFetch('http://localhost:8000/blogs'); //destructure the tree properties

    return (
        <div className="home">
            { error && <div> {error} </div> }
            { isLoading && <div>Loading</div> }
            { blogs && <BlogList blogs={blogs} title="All blogs" /> }
        </div>
     );
}
 
export default Home;
```
## ♣ React Router
-  see how to set it up so that we can have multiple 'pages' on our React websites.
##### EXAMPLE : use the Router, Route and Switch 

```javascript
import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //import Router, Route and Switch

function App() {
  return (
    <Router> // Router Component
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch> //Switch
            <Route path="/"> // Define the path Route
              <Home /> // Define the components that we want see inside this Route 
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

```
##### EXAMPLE : Exact Match | Router Links
```javascript
import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from "./Create";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/"> // exact match
              <Home />
            </Route>
            <Route path="/create"> //another path (Create page)
              <Create /> 
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

```
NavBar Component 
```javascript
import { Link } from 'react-router-dom'; //import Link

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Anime Blog</h1>
            <div className="links">
                <Link to="/">Home</Link> // use 'Link' in place of 'a' & 'to' in place of 'href' 
                <Link to="/create" >New Blog</Link> 
            </div>
        </nav>
     );
}
 
export default Navbar;
```
## ♣ the useEffect Clean-up 
-  we'll look at how to create a cleanup function in our useEffect hook, to stop a fetch request when it's not needed.
##### EXAMPLE : abort a fetch 

```javascript
import { useEffect,useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController(); // 1 : declare the abortController

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal }) // 2 : add a second parameter (signal) to fetch 
            .then(res => {
                if(!res.ok){
                    throw Error('Could not fetch data for that Resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError'){ // 3 : throw the AbortError
                    console.log("fetch aborted");
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            })
        }, 1000);
        
        return () => abortCont.abort(); // 4 : useEffect should return the abort function
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
```
## ♣ Route Parameters
- we'll talk about route parameters & how we can use them to create a blog details page / component.
##### EXAMPLE : pass the id 

app.js
```javascript
<Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/create">
      <Create /> 
    </Route>
    <Route path="/blogs/:id"> // add parameter (id)
      <BlogDetails /> 
    </Route>
</Switch>
```
BlogList.js (add Link)
```javascript
return ( 
        <div className="blog-list">
            <h2>{ title }</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={ blog.id }>
                    <Link to={`/blogs/${blog.id}`}> //add the Link Route
                        <h2>{ blog.title }</h2>
                        <p>Written By : { blog.author }</p>
                    </Link>
                </div>
            ))}
        </div>
     );
```
## ♣ Forms | Controlled inputs | Submit Event 
##### EXAMPLE : form for add a new blog | Controlled inputs 🧿
```javascript
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState(''); //title
    const [body, setBody] = useState(''); //body
    const [author, setAuthor] = useState('mario'); //author


    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form>
                <label>Blog Title: </label>
                <input type="text"
                  value={title} // 👈👈
                  onChange={(e) => setTitle(e.target.value)} // 👈👈
                  required/>
                <label>Blog Body: </label>
                <textarea
                  value={body} // 👈👈
                  onChange={(e) => setBody(e.target.value)} // 👈👈
                  required></textarea>
                <label>Blog Author: </label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>  // 👈👈
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <button>Add Blog</button>
            </form>
        </div>
     );
}
 
export default Create;
```
##### EXAMPLE : form for add a new blog | Submit events 🧿
```javascript
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => { // submit event
        e.preventDefault();
        
    }

    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}> // 👈👈
                <label>Blog Title: </label>
                <input type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  required/>
                <label>Blog Body: </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)} 
                  required></textarea>
                <label>Blog Author: </label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !loading && <button>Add Blog</button> }
                { loading && <button disabled>Adding Blog</button> }
            </form>
        </div>
     );
}
 
export default Create;
```
## ♣ Forms | Making a POST Request
##### EXAMPLE  
```javascript
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author }; // 1 : set the title,body and author value in blog
        setLoading(true);

        fetch('http://localhost:8000/blogs', { // 2 : make a post request
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(blog) // set the blog
        }).then(() => {
            console.log('new blog added');
            setLoading(false);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title: </label>
                <input type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  required/>
                <label>Blog Body: </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)} 
                  required></textarea>
                <label>Blog Author: </label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !loading && <button>Add Blog</button> }
                { loading && <button disabled>Adding Blog</button> }
            </form>
        </div>
     );
}
 
export default Create;
```