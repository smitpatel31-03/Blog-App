
import { Outlet } from 'react-router';             
import {Header} from '../component/index.js';                
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authServices from './services/auth';            
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices.getCurruntAdmin()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));                     
        } else {
          dispatch(logout());
        }
      })
      .catch(() => {
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return null;                            // or a loading spinner

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Header />
      <main className="pt-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
