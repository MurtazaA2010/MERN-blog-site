import { useState } from "react";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSignUp = (e)=> {
        e.preventDefault();
        
    }
    return ( 
        <div className="sign-up">
            <h3>Sign Up</h3>
            <form action="" onSubmit={handleSignUp}>
                <input 
                    type="text" 
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e)=> {setUsername(e.target.value)}}
                />
                <br />
                <input 
                    type="password"
                    placeholder="Password" 
                    required
                    value={pass}
                    onChange={(e)=> setPass(e.target.value)}
                 />
                <br />
                <button>Sign Up</button>
            </form>
            <p>Already have an account? <Link to='/login'>Sign In</Link></p>

        </div>

     );
}
 
export default SignUp;
