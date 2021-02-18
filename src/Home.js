const Home = () => {
    // create some functions
    const handleClick = (e) => {
        console.log('Hello OttaKooo', e);
    }
    
    const handleClickAgain = (name, e) => {
        console.log('Hello ' + name, e.target);
    }

    return ( 
        <div className="home">
            <h2>HomePage</h2>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={(e) => handleClickAgain('mario', e)}>Click Me again</button>
        </div>
     );
}
 
export default Home;