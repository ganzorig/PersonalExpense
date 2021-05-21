import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Category from './pages/Category';
import Transactions from './pages/Transactions';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/category" exact component={Category} />
        <Route path="/transactions" exact component={Transactions} />
        {!localStorage.getItem('token') && <Redirect to="/login" />}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
