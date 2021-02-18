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

