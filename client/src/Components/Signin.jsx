import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../UserContext';

const Signin= () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    const history = useHistory();

    const handleSignIn = async (e)=> {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
        })
        
        if(response.ok) {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
                setRedirect(true);
            })    
        } else {
            alert('passoword or username is wrong please try again or create a account first')
        }
    }
    
    if(redirect) {
        history.push('/')
    }
    return ( 
        <div className="sign-in">
            <h3>Sign In</h3>
            <form action="" onSubmit={handleSignIn}>
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
