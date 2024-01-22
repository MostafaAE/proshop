import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
  const { userInfo } = useSelector(state => state.auth);
  console.log(userInfo);
  return userInfo ? <Outlet /> : <Navigate to={'/login'} />;
}

export default PrivateRoute;
