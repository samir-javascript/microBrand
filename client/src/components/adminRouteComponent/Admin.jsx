import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
const Admin = () => {
    const {userInfo} = useSelector(state => state.auth)
  return (
    userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace={true} />
  )
}

export default Admin