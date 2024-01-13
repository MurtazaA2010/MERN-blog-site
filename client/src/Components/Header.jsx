import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Header = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((userInfo) => {
        setUsername(userInfo.username);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        // Handle the error, e.g., redirect to login page or show an error message
      });
  }, []);

const logout = () => {
    fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
    })
    setUsername(null)
}
  
return (
    <div className="Header">
      <header>
        <h3>
          <Link to="/">MERN BLOG APP</Link>
        </h3>
      </header>
      <nav>
        {username ? (
          <>
            <Link className="signup" to="/create">
            Create New Post
            </Link>
            <a onClick={logout}> Logout({username})</a>
          </>
          
        ) : (
          <>
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
            <Link to="/signin">Login</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
