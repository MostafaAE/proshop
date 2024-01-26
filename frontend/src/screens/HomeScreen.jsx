import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useSearchParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

function HomeScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const search = searchParams.get('search') || '';
  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    page,
    search,
  });

  if (isLoading || isFetching) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <>
      {search && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      <ProductCarousel />
      <h1>Latest Products</h1>
      <Row>
        {data.products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={data.pages} page={page} keyword={search} />
    </>
  );
}

export default HomeScreen;
