import { useState } from "react";
const Home = () => {
    // let name = 'Badr-bh'
    const [name, setName] = useState('Badr-bh');
    const [age, setAge] = useState(21);
    // create some functions
    const handleClick = () => {
        setName('ollsoo');
        setAge(2);
    }
    

    return ( 
        <div className="home">
            <h2>HomePage</h2>
            <p>{ name } is { age } years old</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
     );
}
 
export default Home;