import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '', 
    password: ''
  })

  useEffect(() => {
    message(error);
    clearError(); 
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userID)
    } catch (e) {}
  };

  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h1 className='light-blue-text text-accent-3'>Shorten the link</h1>
        <div className="card grey darken-3">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>

          <div className="input-field">
            <input 
              placeholder="Enter email" 
              id="email" 
              type="text" 
              name='email'
              className='input'
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <input 
              placeholder="Enter password" 
              id="password" 
              type="password" 
              name='password'
              className='input'
              value={form.password}
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>

          </div>
        </div>
        <div className="card-action">
          <button 
            className='btn light-blue accent-3' 
            style={{marginRight: 10}}
            onClick={loginHandler}
            disabled={loading}
          >
            Login
          </button>   
          <button 
            className='btn grey darken-2'
            onClick={registerHandler}
            disabled={loading}
          >
            Registration
            </button>
        </div>
      </div>
      </div>
    </div>
  )
}
