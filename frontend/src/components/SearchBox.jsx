import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

  const [keyword, setKeyword] = useState(search || '');

  const submitHandler = e => {
    e.preventDefault();
    if (keyword) {
      setSearchParams({
        search: keyword.trim(),
      });
      setKeyword('');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        required
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
