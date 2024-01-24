import { Outlet, Navigate } from 'react-router-dom';
import Loader from './Loader';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';

function PrivateRoute() {
  const { data, isLoading } = useGetUserProfileQuery();

  if (isLoading) return <Loader />;

  const userInfo = data?.data?.user;

  return userInfo ? <Outlet /> : <Navigate to={'/login'} />;
}

export default PrivateRoute;
