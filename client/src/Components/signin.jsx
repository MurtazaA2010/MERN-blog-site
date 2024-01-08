import { Link } from "react-router-dom/cjs/react-router-dom.min";
const SignUp = () => {
    return ( 
        <div className="sign-in">
            <h3>Sign In</h3>
            <form action="">
                <input type="email" placeholder="Enter you email" required/>
                <br />
                <input type="password" placeholder="Enter you Password" required />
                <br />
                <button>Sign In</button>
            </form>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>

     );
}
 
export default SignUp;
