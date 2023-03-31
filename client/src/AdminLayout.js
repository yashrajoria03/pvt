import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = (props) => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let navigate = useNavigate();

  if(!userInfo) navigate('/')
  else if(!userInfo.isAdmin) navigate('/')

  return (
    <div className='bg-[#FAFAFA]'>
        <Outlet />
    </div>
  )
}

export default AdminLayout