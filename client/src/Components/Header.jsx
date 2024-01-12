import { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Header = () => {
    useEffect (()=> {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        })
    }, [])
    return ( 
      
            <div className="Header">
                <header>
                    <h3><Link to="/">MERN BLOG APP</Link></h3>
                </header>
                <nav>
                    <Link className="signup" to="/signup">Sign Up</Link>
                    <Link to="/signin">Login</Link>
                </nav>
            </div>
       

     );
}
 
export default Header;
