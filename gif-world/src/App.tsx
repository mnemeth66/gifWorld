import './App.css';
import MatthewHome from "./matthew/components/home"
import TodoApp from "./matthew/components/Todo"
import Navbar from "./matthew/components/Navbar"
import SavedResults from "./matthew/components/savedResults"
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
            <SavedResults/>
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
