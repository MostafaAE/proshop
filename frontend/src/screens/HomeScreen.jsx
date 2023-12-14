import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';

function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
