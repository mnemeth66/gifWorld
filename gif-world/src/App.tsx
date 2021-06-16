import './App.css';
import MatthewHome from "./matthew/components/home"
import TodoApp from "./matthew/components/Todo"
import Navbar from "./matthew/components/Navbar"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route path="/todo">
            <TodoApp/>
          </Route>
          <Route path="/saved">
            <h1>To be implemented!</h1>
          </Route>
          <Route path="/">
            <MatthewHome/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App
