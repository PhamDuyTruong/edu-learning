import React from 'react';
import DashBoard from '../../components/DashBoard/DashBoard';


const Home = ({children}) => {
  return (
     <>
        <DashBoard />
        {children}
        
     </>
  )
}

export default Home