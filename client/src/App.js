import './App.css';
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import Header from './Components/Header';
import Blog from './Components/Blog';
function App() {
  return (
   
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Blog />
          </Route>
        </Switch>
      </Router>

  );
}

export default App;
