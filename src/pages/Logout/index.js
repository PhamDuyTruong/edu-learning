import React, {useEffect} from 'react';
import {useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Logout} from '../../actions/authAction'

const LogOut = () => {
   const dispatch = useDispatch();
   useEffect(() =>{
      dispatch(Logout());
   }, []);
  return (
    <Redirect to="/"></Redirect>
  )
};

export default LogOut;
