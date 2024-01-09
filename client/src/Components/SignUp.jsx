import { useState } from "react";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3001/request', {
                method: 'POST',
                body: JSON.stringify({ username, pass }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // You can handle the success here, or check the response data
            const responseData = await response.json();
            console.log('Success:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
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
