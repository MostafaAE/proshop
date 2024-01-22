import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';
import Loader from './Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

function AppLayout() {
  const { data, isLoading, error } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) dispatch(setCredentials(null));
    else if (!isLoading) dispatch(setCredentials({ ...data?.data?.user }));
  }, [data, dispatch, error, isLoading]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default AppLayout;
