import { useState } from 'react';
import axios from 'axios';
import { message, Card } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Login({ history }) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  function handleChange(e) {
    state[e.target.name] = e.target.value;
    setState({ ...state });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/user/login', state)
      .then((response) => {
        message.success('Successfully logged in');
        localStorage.setItem('token', response.data);
        if (localStorage.getItem('token')) {
          setTimeout(() => {
            history.push('/transactions');
          }, 800);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  return (
    <div className="center-box">
      <Card style={{ width: 320 }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3">Sign in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              name="username"
              required
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              required
              className="form-control"
              id="floatingPassword"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary mb-3 " type="submit">
            Sign in
          </button>
          <div className="text-center">
            <Link to="signup">Signup</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default withRouter(Login);
