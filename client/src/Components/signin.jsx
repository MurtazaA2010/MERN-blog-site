import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Signin= () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e)=> {
        e.preventDefault();

        await fetch('http://localhost:3001/signin', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            })
    }
    return ( 
        <div className="sign-in">
            <h3>Sign In</h3>
            <form action="" onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Username" 
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <br />
                <input
                 type="password" 
                 placeholder="Enter you Password" 
                 required
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                  />
                <br />
                <button>Sign In</button>
            </form>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>

     );
}
 
export default Signin;
