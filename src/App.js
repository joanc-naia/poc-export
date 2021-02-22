import logo from './logo.svg';
import './App.css';
import ChartExample from './AgCharts/sample';
import Electroeval from './AgCharts/electroeval';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chart">
          <ChartExample />
        </Route>
        <Route path="/">
          <Electroeval />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
