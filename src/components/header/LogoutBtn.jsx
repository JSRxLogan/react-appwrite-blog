import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/slices'
import authservice from '../../appwrite/auth'

function LogoutBtn() {
   
    const dispatch = useDispatch()

    const handleLogout = () => {

        authservice.logOut()
         .then(()=> dispatch(logOut()))
         .catch((error)=> {
            throw error;
         })
    }

  return (
     <button 
     onClick={handleLogout}
     >
        Logout
        </button>
  )
}

export default LogoutBtn
