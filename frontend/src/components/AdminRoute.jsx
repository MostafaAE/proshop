import { Outlet, Navigate } from 'react-router-dom';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';
import Loader from './Loader';

function AdminRoute() {
  const { data, isLoading } = useGetUserProfileQuery();

  if (isLoading) return <Loader />;

  const userInfo = data?.data?.user;

  return userInfo && userInfo.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} />
  );
}

export default AdminRoute;
