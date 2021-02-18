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

