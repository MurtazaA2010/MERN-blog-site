import { Link } from "react-router-dom/cjs/react-router-dom.min";
const SignUp = () => {
    return ( 
        <div className="sign-up">
            <h3>Sign Up</h3>
            <form action="">
                <input type="email" placeholder="Enter you email" required/>
                <br />
                <input type="password" placeholder="Enter you Password" required />
                <br />
                <button>Sign Up</button>
            </form>
            <p>Already have an account? <Link to='/login'>Sign In</Link></p>

        </div>

     );
}
 
export default SignUp;
