import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const history = useHistory();
    console.log(history)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [proImg, setproImg] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.set('username', username);
        data.set('password', password);
        data.set('proImg', proImg[0]);
    
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }// You can handle the success here, or check the response data
           
            const responseData = await response.json();
            history.push('/');
            console.log('Success:', responseData);
            alert('Registration Succesful');
        } 
            catch (error) {
            console.error('Error:', error);
            alert('Registration err try again later')
        }
    };
    
    return ( 
        <div className="sign-up">
            <h3>Sign Up</h3>
            <form action="" onSubmit={handleSignUp} encType="multipart/form-data">
                <input 
                    type="file" 
                    required
                    onChange={(e) => setproImg(e.target.files)}
                />
                <input 
                    type="text" 
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e)=> {setUsername(e.target.value)}}
                    min={'4'}
                    max={"35"}
                />
                <br />
                <input 
                    type="password"
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                 />
                <br />
                <button>Sign Up</button>
            </form>
            <p>Already have an account? <Link to='/login'>Sign In</Link></p>

        </div>

     );
}
 
export default SignUp;
