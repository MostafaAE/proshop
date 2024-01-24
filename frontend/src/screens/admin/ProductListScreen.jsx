import { Button, Table, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

function ProductListScreen() {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  async function deleteHandler(productId) {
    if (window.confirm('Are you sure you want to delete this product?'))
      try {
        await deleteProduct(productId);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }

  async function createProductHandler() {
    if (window.confirm('Are you sure you want to create a new product?'))
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  }

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      <>
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isCreating && <Loader />}
        {isDeleting && <Loader />}
      </>
    </>
  );
}

export default ProductListScreen;
