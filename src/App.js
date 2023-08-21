import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen'
import { auth } from './firebase';
import { logout , login, selectUser } from './features/userSlice';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
   const unsubscribe =  auth.onAuthStateChanged((userAuth) => {
     if (userAuth) {
       console.log(userAuth);
       dispatch(login({
         uid: userAuth.uid,
         email:userAuth.email
       }))
      }
      else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      
      <Router>
        {!user ? (<LoginScreen />) : (
          <Routes>
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
