//imports
import './App.css';
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Header from './Components/Header';
import Blog from './Components/Blog';;
import SignUp from './Components/SignUp';
import Signin from './Components/Signin';


function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Blog />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
        </Switch>
      </Router>

  );
}

export default App;
