import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome To ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
