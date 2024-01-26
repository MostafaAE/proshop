import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

function HomeScreen() {
  const { page = 1 } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ page });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {data.products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={data.pages} page={page} />
    </>
  );
}

export default HomeScreen;
