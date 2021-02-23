import logo from './logo.svg';
import './App.css';
import ChartExample from './AgCharts/sample';
import Electroeval from './AgCharts/electroeval';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

function App() {
  return (
    <HashRouter basename='/'>
      <Switch>
        <Route path="/chart"><ChartExample /></Route>
        <Route path="/"><Electroeval /></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
