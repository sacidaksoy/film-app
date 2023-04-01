import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/slices';
import './login.css'
import Navbar from '../../components/Navbar/Navbar';
import { validateForm } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Cridentials = {
  username: 'test@test.com',
  password: 'test1234'
}

function Login() {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dispatch = useDispatch();
  const [forms, setForms] = useState(auth);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  // forms handler
  const changeHandler = e => {
    let { name, value } = e.target;

    setForms({
      ...forms,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: '',
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const validatedForm = validateForm('signUp', errors, forms);

    if (validatedForm.error) {
      setErrors(validatedForm.errors);
    } else {
      dispatch(authActions.setAuthCridentials(forms));
      dispatch(authActions.setToken(true));
      navigate('/');
    }
  }

  return (
    <>
      <div className='login__body'>
        <div className="login">
          <h1 className="login__title">Sign In</h1>
          <form onSubmit={submitHandler}>
            <div className="login__group">
              <input
                className="login__group__input"
                type="text"
                required
                autoFocus
                name='email'
                value={forms.email}
                onChange={changeHandler}
              />
              <label className="login__group__label">Email</label>
            </div>
            <div>
              <small style={{ color: 'red' }}>
                <span>{errors.email}</span>
              </small>
            </div>
            <div className="login__group">
              <input className="login__group__input"
                type="password"
                required
                name='password'
                minLength={6}
                value={forms.password}
                onChange={changeHandler}
              />
              <label className="login__group__label">Password</label>
            </div>
            <div>
              <small style={{ color: 'red' }}>
                <span>{errors.password}</span>
              </small>
            </div>
            <button
              className="login__sign-in"
              type="submit"
            >
              Sign In</button>
            <div className="login__secondary-cta"><a className="login__secondary-cta__text" href="#">Remember me</a>
              <a className="login__secondary-cta__text login__secondary-cta__text--need-help" href="#">Need help?</a>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}

export default Login