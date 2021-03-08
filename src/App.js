import logo from './logo.svg';
import './App.css';
import Electroeval from './AgCharts/electroeval';
import ElectroevalGraph from './AgCharts/electroevalgraph';

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
        <Route path="/chart"><ElectroevalGraph /></Route>
        <Route path="/"><Electroeval /></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
