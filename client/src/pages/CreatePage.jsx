import React, { useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
  const history = useNavigate();
  const auth = useContext(AuthContext);
  const { request } = useHttp()
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();  
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className='row'>
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
      <div className="input-field">
            <input 
              placeholder="Paste the link" 
              id="link" 
              type="text" 
              value={link}
              onChange={e => setLink(e.target.value)}
              onKeyDown={pressHandler}
            />
            <label htmlFor="link">Enter the link</label>
          </div>  
      </div>
    </div>
  )
}
