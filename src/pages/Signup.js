import { useState } from 'react';
import axios from 'axios';
import { message, Card } from 'antd';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
  });

  function handleChange(e) {
    state[e.target.name] = e.target.value;
    setState({ ...state });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/user/signup', state)
      .then((response) => {
        message.success('Successfully registered');
        window.location.href('/login');
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  return (
    <div className="center-box">
      <Card style={{ width: 320 }}>
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3">Sign up</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Full name"
              name="fullName"
              onChange={handleChange}
            />
            <label for="floatingInput">Full name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Last name"
              name="username"
              onChange={handleChange}
            />
            <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
            Sign Up
          </button>
          <div className="text-center">
            <Link to="login">Login</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
