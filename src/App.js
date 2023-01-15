import React, { useCallback, useEffect, useState } from 'react';
import AdminApp from './AdminApp';
import { getUsers } from './AdminApp/constant';
import './App.css';

function App() {
  const [userData, setUserData] = useState({status: '', data: []})
   
  useEffect(() => {
    reloadHandler();
  }, [])

  const reloadHandler = useCallback(() => {
    getUsers(setUserData);
  },[])

  return (
    <div className="app-container">
      {userData['status'] === 'loading' ? <div>...Loading</div> : 
      userData['status'] === 'success' ? <AdminApp data={userData['data']} reloadHandler={reloadHandler}/> : 
      <p className='error'>Something Went Wrong!</p>}
    </div>
  );
}

export default App;
