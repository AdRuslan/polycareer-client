import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import './AuthPage.scss';

export default function AuthPage(props) {
  const [form, setForm] = useState({ email: '', password: '' });

  const { login } = useContext(AuthContext);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      await axios
        .post(
          'https://polycareer.herokuapp.com/api/auth/login',
          { ...form },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          login(response.data.token, response.data.userId);
          const history = props.history;
          history.push('/');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = async () => {
    try {
      await axios
        .post(
          'https://polycareer.herokuapp.com/api/auth/registration',
          { ...form },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(() => loginHandler());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <React.Fragment>
          <div className="container">
            <div className="auth-page">
              <Route path="/login">
                <h3>Авторизация</h3>
                <form
                  className="form from-login"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field pas-input col s12">
                      <input
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="password">Пароль</label>
                    </div>
                    <div className="row">
                      <button
                        className="waves-effect waves-light btn"
                        onClick={loginHandler}
                      >
                        Войти
                      </button>

                      <Link to="/registration" className="btn-outline btn-reg">
                        Нет аккаунта?
                      </Link>
                    </div>
                  </div>
                </form>
              </Route>

              <Route path="/registration">
                <h3>Регистрация</h3>
                <form
                  className="form from-login"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field pas-input col s12">
                      <input
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler}
                      />
                      <label htmlFor="password">Пароль</label>
                    </div>
                    <div className="row">
                      <button
                        className="waves-effect waves-light btn "
                        onClick={registerHandler}
                      >
                        Регистрация
                      </button>
                      <Link to="/login" className="btn-outline btn-reg">
                        Уже есть аккаунт?
                      </Link>
                    </div>
                  </div>
                </form>
              </Route>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
}
